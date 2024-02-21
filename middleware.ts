import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { sleep } from "./lib/utils/common";

function extractSlugs(urlPath: string): string[] {
  return urlPath.split("/").filter((slug) => slug.length > 0);
}

function isAuthenticated(request: NextRequest) {
  console.log("process.env.SESSION_KEY", process.env.SESSION_KEY);
  let sessionKey = request.cookies.get("SESSION_KEY")?.value;
  console.log("isAuthenticated.sessionKey", sessionKey);
  if (sessionKey === process.env.SESSION_KEY) {
    return true;
  }
  return false;
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

  if (request.nextUrl.pathname.startsWith("/auth")) {
    return response;
  }

  console.log("middleware", request.url);

  if (!isAuthenticated(request)) {
    const url = new URL(request.url);
    console.log("authentication failed", `${siteUrl}/auth`);
    await sleep(2000);
    return NextResponse.redirect(`${siteUrl}/auth`);
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
