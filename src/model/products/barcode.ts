import { brands, categories } from '@/utils/consts';
import { z } from 'zod'

export type Brand = typeof brands[number];

export type Category = typeof categories[number];


export interface BarcodeProduct {
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
  checkedBy?: string// Asume que checkedBy puede ser undefined o un string, no vacío
}


export const barcodeProductSchema = z.object({
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
  checkedBy: z.string().optional()
});

export const newProductFromTenantSchema = z.object({
  barcode: z.string().min(1, 'El código de barras es obligatorio'), // Rechaza valores vacíos
  name: z.string().min(1, 'El nombre es obligatorio'), // Rechaza valores vacíos
  brand: z.string().min(1, 'La marca es obligatoria'), // Rechaza valores vacíos
  measure: z.string().min(1, 'La medida es obligatoria'), // Rechaza valores vacíos
});

export type NewProduct = {
  barcode: string;
  name: string;
  brand: string;
  measure: string;
  tenantID: string[];
}

export type NewProductFromTenant = z.infer<typeof newProductFromTenantSchema>;
// Si quieres omitir el campo 'checked' en otro esquema

export const uploadBarcodeProductSchema = barcodeProductSchema.omit({ checked: true })
export type UploadBarcodeProduct = z.infer<typeof uploadBarcodeProductSchema>