import { z } from 'zod'

export const brands = [
    "Alpina",
    "Colanta",
    "Pepsi",
    "Coca Cola",
    "Bavaria",
    "Postobon",
    "Nestle",
    "Doria",
    "Quala",
    "Nutresa",
    "Mondelez",
    "Unilever",
    "Johnson & Johnson",
    "Procter & Gamble",
    "Bimbo",
    "Grupo Familia",
    "Ramo"
]as const;

export const categories = {
    canastaFamiliar: ['parva', 'arepas', 'granos', 'lácteos', 'enlatados', 'aceites', 'matequillas', 'condimentos', 'otros'] as const,
    higienePersonal: ['crema dental', 'jabón', 'shampoo', 'desodorante', 'talco', 'toallas higiénicas', 'cepillo de dientes', 'papel higiénico'] as const,
    mecato: ['paquetes', 'helados', 'gomitas', 'chocolates', 'galletas', 'snacks', 'dulces', 'otros'] as const,
    licor: ['cerveza', 'ron', 'aguardiente', 'vino', 'whisky', 'tequila', 'vodka', 'otros'] as const,
    aseo: ['jabón en polvo', 'lavaloza', 'limpiadores', 'esponjas', 'detergente', 'cloro', 'suavizante', 'otros'] as const,
    bebidas: ['gaseosas', 'jugos', 'agua', 'té', 'café', 'leche', 'bebidas energéticas', 'otros'] as const,
    mascotas: ['juguetes', 'alimento', 'accesorios', 'higiene', 'otros'] as const,
    otra: ['no aplica'] as const
};

export type Brand = typeof brands[number];

export type Category = keyof typeof categories;

export type SubCategory<C extends Category> = typeof categories[C][number];

export interface Product {
    barcode: string;
    name: string;
    measure: string;
    brand: Brand | string;
    description?: string;
    image: string;
    category: Category;
    subcategory: SubCategory<Category>;
    checked?: boolean;
}

const subcategories = Object.values(categories).flat()

export const productResolver = z.object({
    barcode: z.string(),
    name: z.string(),
    measure: z.string(),
    brand: z.union([z.enum(brands), z.string()]),
    description: z.string().optional(),
    image: z.string(),
    category: z.enum(Object.keys(categories) as [keyof typeof categories]),
    subcategory: z.string().refine(val => subcategories.includes(val as SubCategory<any>), {message: "invalid subcategory"}),
    checked: z.boolean()
})