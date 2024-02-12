import { NextRequest, NextResponse } from "next/server";

function extractSlugs(urlPath: string): string[] {
  return urlPath.split("/").filter((slug) => slug.length > 0);
}

function isAuthenticated(request: NextRequest) {
  console.log(request);
  return true;
}

export default function middleware(request: NextRequest) {
  // Call our authentication function to check the request

  if (request.nextUrl.pathname.startsWith("/cache")) {
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

    // Use NextResponse.next() to create a response based on the request
    const response = NextResponse.next();
    // Set cache-control headers on the response
    response.headers.set(
      "Cache-Control",
      "public, s-maxage=10, stale-while-revalidate"
    );

    response.headers.set(
      "My-Custom-Header",
      "This will be returned on the cache routes only: " +
        extractSlugs(request.nextUrl.pathname)[1]
    );

    // Return the modified response
    console.log("middleware", response);
    return response;
  }
}
