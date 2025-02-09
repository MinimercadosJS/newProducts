'use server'
import { Collection, Db, MongoClient } from "mongodb";
import clientPromise from "../index";
import { revalidatePath } from "next/cache";
import { FruverProduct } from "@/model/products/fruver";
let client: MongoClient;
let db: Db;
let fruver_products: Collection<FruverProduct>;

export async function init() {
    if (db) return
    try {
        client = await clientPromise
        db = client.db("minimarkets")
        fruver_products = db.collection('fruver_products')
    } catch (error) {
        throw new Error('Failed to stablish connection to database')
    }
}
;

(async () => {
    await init()
})

export async function uploadFruverProduct(product: FruverProduct) {
    try {
        await init();
        const res = await fruver_products.insertOne({ ...product, checked: false });
        revalidatePath('/')
        return res.acknowledged && res.insertedId.toString()
    } catch (error: any) {
        throw new Error(error.message)
    }
}
