import { NextRequest, NextResponse } from "next/server";

function extractSlugs(urlPath: string): string[] {
  return urlPath.split("/").filter((slug) => slug.length > 0);
}

function isAuthenticated(request: NextRequest) {
  // console.log(request);
  return true;
}

export default function middleware(request: NextRequest) {
  const response = NextResponse.next();

  response.headers.set(
    "Custom-header",
    "custom header return for all routes" +
      extractSlugs(request.nextUrl.pathname)[1]
  );

  // Call our authentication function to check the request
  if (!isAuthenticated(request)) {
    // Respond with JSON indicating an error message
    return new Response(
      JSON.stringify({ success: false, message: "authentication failed" }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  if (request.nextUrl.pathname.startsWith("/cache/suspense")) {
    // superceded by cache segment constants in page
    // response.headers.set(
    //   "Cache-Control",
    //   "public, max-age=10, stale-while-revalidate=1"
    // );
    response.headers.set(
      "Suspense-header",
      "returned only for the cache/suspense route" +
        extractSlugs(request.nextUrl.pathname)[1]
    );
    return response;
  }

  if (request.nextUrl.pathname.startsWith("/cache/counter")) {
    // superceded by cache segment constants in page
    // response.headers.set(
    //   "Cache-Control",
    //   "public, max-age=5, stale-while-revalidate=1"
    // );
    response.headers.set(
      "Counter-header",
      "returned only for the cache/counter route" +
        extractSlugs(request.nextUrl.pathname)[1]
    );
  }

  return response;
}
