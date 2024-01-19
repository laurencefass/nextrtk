/* Core */
import { NextResponse } from "next/server";

export async function GET(req:Request) {
  console.log("GET identify-count");
  return NextResponse.json({ response: "GET identity-count" });
}

export async function POST(req: Request, res: Response) {
  const body = await req.json();
  const { amount = 1 } = body;
  console.log("TRACE: POST identify-count");

  // simulate IO latency
  await new Promise((r) => setTimeout(r, 500));

  return NextResponse.json({ data: amount });
  
}
