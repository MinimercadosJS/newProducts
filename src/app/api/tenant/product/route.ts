import { NextRequest, NextResponse } from "next/server";
import { newProductFromTenantSchema } from "@/model/products/barcode";
import { uploadNewProduct } from "@/lib/mongo/products/new";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const tenant = request.headers.get("tenant_id");
    
    if (!body) return NextResponse.json("body not provided", { status: 400 })

    const validBody = newProductFromTenantSchema.safeParse(body);
    if (!validBody.success) return NextResponse.json(validBody.error.errors, { status: 400 })
    try {
        const res = await uploadNewProduct(body, tenant as string)
        return NextResponse.json(res)
    } catch (error: any) {
        return NextResponse.json(error.message, { status: 500 })
    }
}