import { TenantMetadata } from "@/model/tenants/metadata";
import { Collection, Db, MongoClient } from "mongodb";
import clientPromise from "..";

let client: MongoClient;
let db: Db;
let products: Collection<TenantMetadata>;

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

export async function getTenantMetadata(tenantId: string) {
    try {
        await init();
        const res = await products.findOne({tenantId});
        return res
    } catch (error: any) {
        throw new Error(error)
    }
}