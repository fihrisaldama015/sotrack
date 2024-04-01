import { NextResponse } from "next/server";
import { BASE_URL } from "./app/utils/constants";
import { cookies } from "next/headers";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const accessToken = request.cookies.get("accessToken")?.value;
  // if (!accessToken) {
  //   console.log("🚀 ~ middleware ~ accessToken: Not Available");

  //   try {
  //     console.log("🚀 ~ middleware ~ accessToken: Try");

  //     const res = await fetch(`${BASE_URL}/refreshToken`, {
  //       method: "GET",
  //       credentials: "include",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Credentials": true,
  //       },
  //     });
  //     const responseData = await res.json();
  //     console.log("🚀 ~ middleware ~ responseData:", responseData);

  //     const response = NextResponse.next();
  //     response.cookies.set({
  //       name: "accessToken",
  //       value: responseData?.data?.accessToken,
  //       path: "/",
  //       httpOnly: true,
  //       maxAge: 60 * 15,
  //     });

  //     return response;
  //   } catch (e) {
  //     console.log("🚀 ~ middleware ~ e:", e);

  //     return NextResponse.redirect(new URL("/login", request.url));
  //   }
  // }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/dashboard/:path*",
};
