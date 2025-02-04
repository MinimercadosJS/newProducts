'use server'
import { Product } from "@/model/products";
import { Collection, Db, MongoClient } from "mongodb";
import clientPromise from ".";
import { revalidatePath } from "next/cache";
import { trimObject } from "@/globalFunctions";

let client: MongoClient;
let db: Db;
let products: Collection<Product>;

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

export async function uploadProduct(product: Product) {
    try {
        await init();
        const searchString = `${product.name} ${product.measure} - ${product.brand}`.toLowerCase()
        const res = await products.insertOne(trimObject({ ...product, searchString, checked: false }));
        revalidatePath('/')
        return res
    } catch (error: any) {
        throw new Error(error.message)
    }
}
export async function getAllProducts(page: number) {
    const limit = 100
    try {
        await init();
        return await products.find({}).project({ _id: 0 }).sort({ category: 1, subcategory: 1, brand: 1, measure: 1 }).limit(limit).skip(page * limit).toArray()
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export async function filterProducts(searchParams: Partial<Product>) {
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

export async function editProduct(updatedProduct: Product) {
    const { barcode } = updatedProduct

    try {
        await init()
        const result = await products.updateOne({ barcode: barcode }, { $set: trimObject({ ...updatedProduct }) })
        return result
    } catch (error: any) {
        throw new Error(error.message)
    }
}