'use server'
import { Product } from "@/model/products";
import { Collection, Db, MongoClient } from "mongodb";
import clientPromise from ".";
import { revalidatePath } from "next/cache";

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
        const res = await products.insertOne({ ...product, searchString, checked: false });
        revalidatePath('/')
        return res
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export async function getNoImageProducts() {
    try {
        await init();
        const res = await products.find({ image: "" }).toArray();
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

    return await products.findOne({ $and: [{ measure: { $not: { $type: "string" } }, barcode: { $ne: current } }] })
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
        const result = await products.updateOne({ barcode: barcode }, { $set: updatedProduct })
        return result
    } catch (error: any) {
        throw new Error(error.message)
    }
}