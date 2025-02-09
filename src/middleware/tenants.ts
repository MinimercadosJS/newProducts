import { NextRequest, NextResponse } from "next/server";

export function tenantsMiddleware ( request: NextRequest){
    const api_key = request.headers.get("api_key");

    if (!tenantAuth(api_key)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.next();

}