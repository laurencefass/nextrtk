/* Core */
import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { encrypt } from "@/lib/utils/server";
import { authenticateCookie, validateCookie } from "@/lib/utils/auth";

export const dynamic = "force-dynamic";

// validate a session key
export async function GET(req: Request) {
  const user = validateCookie();
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

export async function POST(req: Request, res: NextResponse) {
  const { type, credentials } = await req.json();

  try {
    authenticateCookie(type, credentials?.username, credentials?.password);
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
