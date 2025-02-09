import { fruverCategories } from "@/utils/consts";
import { z } from "zod";

export type FruverCategory = typeof fruverCategories[number];

export interface FruverProduct {
    id: string;
    name: string;
    image: string;
    category: FruverCategory;
    subcategory?: string;
    tags?: string[];
    checked?: boolean;
}

const fruverProductSchema = z.object({
    id: z.string(),
    image: z.string().min(1, 'La imagen es obligatoria'), // Rechaza valores vacíos
    name: z.string().min(1, 'El nombre es obligatorio'), // Rechaza valores vacíos
    tags: z.array(z.string().min(1, 'Cada tag debe ser no vacío')).optional(), // Rechaza array vacío
});

export { fruverProductSchema }