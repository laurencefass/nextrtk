/* Core */
import { NextResponse } from "next/server";
import { serialize } from "cookie";
import { cookies, headers } from "next/headers";
import { decrypt, encrypt, validateCookieSessionKey } from "@/lib/utils/server";

type Role = "admin" | "authenticated";

export const dynamic = "force-dynamic";

type User = {
  name: string;
  password: string;
  role: Role;
};

const users: Array<User> = [
  {
    name: "admin",
    password: "admin",
    role: "admin",
  },
];

function authorize(username: string, password: string): User | undefined {
  const user = users.find((user) => user.name === username);
  if (!user) throw "user not found";
  if (user.password !== password) throw "password is incorrect";
  return user;
}

function register(username: string, password: string) {
  const user = users.find((user) => user.name === username);
  if (user) throw "user already signed up";
  users.push({
    name: username,
    password: password,
    role: "authenticated",
  });
}

export async function GET(req: Request) {
  const headersList = headers();
  const cookieStore = cookies();

  const key = cookieStore.get("SESSION_KEY");
  if (validateCookieSessionKey(key)) {
    return NextResponse.json({
      status: 200,
      data: "authorized",
    });
  }

  // console.log("key", key);
  // if (key?.value) {
  //   const sessionKey: string = decrypt(key.value);
  //   if (key?.value && sessionKey === process.env.SESSION_KEY) {
  //     return NextResponse.json({
  //       status: 200,
  //       data: "authorized",
  //     });
  //   }
  // }

  return NextResponse.json({
    status: 401,
    data: "unauthorized",
  });
}

export async function POST(req: Request, res: NextResponse) {
  const cookieStore = cookies();
  const headersList = headers();

  const { type, credentials } = await req.json();
  console.log(type, credentials);

  try {
    switch (type) {
      case "login":
        const authorized = authorize(
          credentials.username,
          credentials.password
        );
        // authorize will throw errors so no need to check result
        const eSessionKey: string = encrypt(process.env.SESSION_KEY as string);
        console.log("session key", process.env.SESSION_KEY);
        console.log("encrypted session key", eSessionKey);
        cookies().set("SESSION_KEY", eSessionKey);
        break;
      case "register":
        cookies().delete("SESSION_KEY");
        register(credentials.username, credentials.password);
        break;
      case "logout":
        cookies().delete("SESSION_KEY");
        break;
      default:
        throw "unrecognised auth command";
    }
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({
      status: 401,
      data: "unauthorized",
      reason: error,
    });
  }
  return NextResponse.json({
    status: 200,
    data: "success",
  });
}
