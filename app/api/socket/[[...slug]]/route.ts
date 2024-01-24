/* Core */

import { request } from "http";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic' // defaults to auto

// README
// Currently no solution for socket.io initialisation in the app directory
// https://stackoverflow.com/questions/76167964/implementing-socket-io-on-nextjs-13-with-app-directory

export async function GET( 
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  console.log("GET socket", params);
  
  const query = req.nextUrl.searchParams.get("that");

  return Response.json({ 
    response: "GET socket", 
    params: params,
    query: query,
    ip: req.headers.get('X-Forwarded-For')
  });
}
