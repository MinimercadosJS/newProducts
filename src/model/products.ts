import { brands, categories } from '@/globalConsts';
import { z } from 'zod'




export type Brand = typeof brands[number];

export type Category = typeof categories[number];


export interface Product {
  barcode: string;
  name: string;
  measure: string;
  brand: Brand | string;
  searchString: string;
  description?: string;
  image: string;
  category: Category;
  subcategory: string;
  tags: string[];
  checked?: boolean;
}


export const productSchema = z.object({
  barcode: z.string().min(1, 'El código de barras es obligatorio'), // Rechaza valores vacíos
  name: z.string().min(1, 'El nombre es obligatorio'), // Rechaza valores vacíos
  measure: z.string().min(1, 'La medida es obligatoria'), // Rechaza valores vacíos
  brand: z.union([z.enum(brands), z.string().min(1, 'La marca es obligatoria')]), // Rechaza valores vacíos
  description: z.string().optional(),
  image: z.string().min(1, 'La imagen es obligatoria'), // Rechaza valores vacíos
  category: z.enum(categories), // Esto ya rechaza valores no válidos por el enum
  subcategory: z.string().min(1, 'La subcategoría es obligatoria'), // Rechaza valores vacíos
  tags: z.array(z.string().min(1, 'Cada tag debe ser no vacío')).optional(), // Rechaza array vacío
  checked: z.boolean(), // Asume que checked será verdadero o falso, no vacío
});

// Si quieres omitir el campo 'checked' en otro esquema

export const uploadProductSchema = productSchema.omit({ checked: true })
export type UploadProduct = z.infer<typeof uploadProductSchema>