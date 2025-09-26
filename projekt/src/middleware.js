import { NextResponse } from "next/server";
export default async function middleware(request) {
		if (!request.cookies.has("swaphub_token") || !request.cookies.has("swaphub_userid")) {
		return NextResponse.redirect(new URL("/login", request.url))
	}
}
export const config = {
	matcher: ["/profile/:path*"]
};
