import { NewProductFromTenant } from "@/model/products/barcode";
import { Collection, Db, MongoClient } from "mongodb";
import clientPromise from "..";

let client: MongoClient;
let db: Db;
let new_products: Collection<NewProductFromTenant>;

export async function init() {
    if (db) return
    try {
        client = await clientPromise
        db = client.db("minimarkets")
        new_products = db.collection('new_products')
    } catch (error) {
        throw new Error('Failed to stablish connection to database')
    }
}
;
(async () => {
    await init()
})

export async function uploadNewProduct(product: NewProductFromTenant, tenantID: string) {
    try {
        await init();
        
        const res = await new_products.updateOne({barcode: product.barcode},{ $push: {tenants:tenantID}, $setOnInsert: product }, {upsert: true});
        return res
    } catch (error: any) {
        throw new Error(error.message)

    }
}