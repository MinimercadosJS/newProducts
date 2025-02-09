'use server'
import { BarcodeProduct } from "@/model/products/barcode";
import { Collection, Db, MongoClient } from "mongodb";
import clientPromise from "../index";
import { revalidatePath } from "next/cache";
import { trimObject } from "@/utils/functions";

let client: MongoClient;
let db: Db;
let products: Collection<BarcodeProduct>;

export async function init() {
    if (db) return
    try {
        client = await clientPromise
        db = client.db("minimarkets")
        products = db.collection('products')
    } catch (error) {
        throw new Error('Failed to stablish connection to database')
    }
}
;
(async () => {
    await init()
})

export async function uploadBarcodeProduct(product: BarcodeProduct) {
    try {
        await init();
        const searchString = `${product.name} ${product.brand} ${product.measure} `.toLowerCase()
        const res = await products.insertOne(trimObject({ ...product, searchString, checked: false }));
        revalidatePath('/')
        return res
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export async function getAllBarcodeProducts(page: number) {
    const limit = 100
    try {
        await init();
        return await products.find({}).project({ _id: 0 }).sort({ category: 1, subcategory: 1, name:1, brand: 1, measure: 1 }).limit(limit).skip(page * limit).toArray()
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export async function filterProducts(searchParams: Partial<BarcodeProduct>) {
    try {
        await init();
        return await products.find({ $or: [searchParams, { tags: searchParams.subcategory }] }).project({ _id: 0 }).sort({ category: 1, subcategory: 1, name: 1, brand: 1, measure: 1 }).toArray()
    } catch (error: any) {
        throw new Error(error.message)
    }

}

export async function getProductsWithTag(tag: string) {
    try {
        await init();
        return products.find({ tags: { $in: [tag] } }).toArray()
    } catch (error: any) {
        throw new Error(error.message)
    }
}
export async function getNoImageProducts() {
    try {
        await init();
        const res = await products.find({ image: "no-image" }).toArray();
        return res
    } catch (error: any) {
        throw new Error(error.message)
    }
}
export async function getAllTags() {
    try {
        await init()
        const res = await products.distinct('tags')
        return res
    } catch (error: any) {
        throw new Error(error.message)
    }
}
export async function getNotCheckedProducts() {
    try {
        await init();
        const res = await products.find({ checked: false }).toArray();
        return res
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export async function nextProductToCheck(current: string) {
    try {
        await init()
        return await products.findOne({ $and: [{ barcode: { $ne: current } }, { image: "no-image" }] }, { projection: { _id: 0 } })

    } catch (error: any) {
        throw new Error(error.message)
    }
}

export async function getProductByBarcode(barcode: string) {
    try {
        await init()

        const result = await products.findOne({ barcode: barcode }, { projection: { _id: 0 } })
        return result
    } catch (error: any) {
        throw new Error(error)
    }
}

export async function editBarcodeProduct(updatedProduct: BarcodeProduct) {
    const { barcode } = updatedProduct

    try {
        await init()
        const result = await products.updateOne({ barcode: barcode }, { $set: trimObject({ ...updatedProduct }) })
        return result
    } catch (error: any) {
        throw new Error(error.message)
    }
}