import { uploadBarcodeProduct } from "@/lib/mongo/products/barcode";
import { brands , categories} from "@/utils/consts";
import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod'

const CategorySchema = z.enum(categories);

const ProductSchema = z.object({
    barcode: z.string(),
    name: z.string(),
    measure: z.string(),
    brand: z.union([z.enum(brands), z.string()]),
    description: z.string().optional(),
    image: z.string(),
    category: CategorySchema,
});

export async function POST(request: NextRequest) {

    const body = await request.json()

    const validBody = ProductSchema.safeParse(body)

    if (!validBody.success) return NextResponse.json(validBody.error.formErrors, { status: 400 })

    const mongoresponse = await uploadBarcodeProduct(body)

    if (!mongoresponse || !mongoresponse.acknowledged) return NextResponse.json({ error: mongoresponse }, { status: 500 })

    return NextResponse.json(mongoresponse)
}