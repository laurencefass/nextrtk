import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

var count = 0;
setInterval(() => {
  count++;
}, 1000);

export async function GET(req: Request) {
  console.log("/api/counter/GET", count);
  const response = NextResponse.json({ count: count });
  return response;
}