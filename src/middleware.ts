import { NextRequest } from "next/server";
import { tenantsMiddleware } from "./middleware/tenants";

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    if (pathname === '/api/tenants') {
        return tenantsMiddleware(request);
    }
}

export const config = {
    matcher: '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
};