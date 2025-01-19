import { brands } from '@/globalConsts';
import { z } from 'zod'



export const categories = ["canastaFamiliar", "higienePersonal", "mecato", "licor", "aseo", "bebidas", "mascotas", "otra"] as const;

export type Brand = typeof brands[number];

export type Category =  typeof categories[number];


export interface Product {
    barcode: string;
    name: string;
    measure: string;
    brand: Brand | string;
    searchString: string;
    description?: string;
    image: string;
    category: Category;
    tags: string[];
    checked?: boolean;
}

export const productSchema = z.object({
    barcode: z.string(),
    name: z.string(),
    measure: z.string(),
    brand: z.union([z.enum(brands), z.string()]),
    description: z.string().optional(),
    image: z.string(),
    category: z.enum(categories),
    tags: z.array(z.string()),
    checked: z.boolean()
})

export const uploadProductSchema = productSchema.omit({ checked: true })
export type UploadProduct = z.infer<typeof uploadProductSchema>