import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { sleep } from "./lib/utils/common";
import { validateCookieSessionKey } from "./lib/utils/server";
import { cookies } from "next/headers";

function extractSlugs(urlPath: string): string[] {
  return urlPath.split("/").filter((slug) => slug.length > 0);
}

const slug = process.env.NODE_ENV === "development" ? "dev" : "prod";
// const siteUrl = `https://next${slug}.syntapse.co.uk`;
const siteUrl = "https://localhost:3000";

export default async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (request.nextUrl.pathname.includes("/_next")) {
    return response;
  }

  if (request.nextUrl.pathname.includes(".png")) {
    return response;
  }

  if (request.nextUrl.pathname.includes(".ico")) {
    return response;
  }

  if (request.nextUrl.pathname.startsWith("/test")) {
    return response;
  }

  console.log("middleware", request.url);

  const cookieStore = cookies();
  const key = cookieStore.get("SESSION_KEY");
  if (!validateCookieSessionKey(key)) {
    const url = new URL(request.url);
    console.log("user not logged in", `${url}`);
    // return NextResponse.redirect(`${siteUrl}/test`);
  }

  // superceded by route segment cache constants
  // response.headers.set(
  //   "Cache-Control",
  //   "public, max-age=10, stale-while-revalidate=1"
  // );

  // an example of setting headers on all routes
  // response.headers.set(
  //   "Custom-header",
  //   "custom header return for all routes" +
  //     extractSlugs(request.nextUrl.pathname)[1]
  // );

  // example of conditional headers
  if (request.nextUrl.pathname.startsWith("/cache/suspense")) {
    response.headers.set(
      "Suspense-header",
      "returned only for the cache/suspense route" +
        extractSlugs(request.nextUrl.pathname)[1]
    );
    return response;
  }

  return response;
}
