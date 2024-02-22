/* Core */
import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { encrypt } from "@/lib/utils/server";
import {
  authorizeUser,
  getUserFromToken,
  getUserFromCookie,
  registerUser,
} from "@/lib/utils/users";

export const dynamic = "force-dynamic";

function validate() {
  const user = getUserFromCookie("SESSION_KEY");
  if (user) {
    return NextResponse.json({
      status: 200,
      data: "authorized",
    });
  }
  return NextResponse.json({
    status: 401,
    data: "unauthorized",
  });
}

// validate a session key
export async function GET(req: Request) {
  return validate();
}

function authenticate(type: string, username: string, password: string) {
  console.log("authenticate TBD");
}

export async function POST(req: Request, res: NextResponse) {
  const { type, credentials } = await req.json();

  let user;
  console.log(type, credentials);

  try {
    switch (type) {
      case "login":
        user = authorizeUser(credentials.username, credentials.password);
        if (user) {
          // authorize will throw errors so no need to check result
          user.token = encrypt(user.name + Date.now().toString());
          console.log("logging in user", user.name, user.token);
          cookies().set({
            name: "SESSION_KEY",
            value: user.token as string,
            sameSite: true,
            httpOnly: true,
          });
        }
        break;
      case "register":
        cookies().delete("SESSION_KEY");
        registerUser(credentials.username, credentials.password);
        break;
      case "logout":
        user = getUserFromCookie("SESSION_KEY");
        if (user) {
          console.log("logging out user", user.name, user.token);
          cookies().delete("SESSION_KEY");
        }
        break;
      default:
        throw "unrecognised auth command";
    }
  } catch (error) {
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
