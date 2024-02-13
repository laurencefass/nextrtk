import { NextResponse } from "next/server";

var count = 0;
setInterval(() => {
  count++;
}, 1000);

export async function GET(req: Request) {
  return NextResponse.json({
    count: count,
  });
}
