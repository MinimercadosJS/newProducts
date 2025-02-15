import { Category } from "@/model/products/barcode";
import { FruverCategory } from "@/model/products/fruver";

const tags = [
  "lonchera",
  "comida rápida",
  "parrilla",
  "piscina",
  "farmacia",
  "deportes",
  "accesorios de celular",
  "fiesta",
  "temporada escolar",
  "navidad",
  "halloween",
  "regalos y detalles",
  "cuidado de prendas",
  "+ 18"
];
const brands = [
  "Alpina",
  "Colanta",
  "Pepsi",
  "Coca Cola",
  "Bavaria",
  "Postobon",
  "Nestlé",
  "Doria",
  "Quala",
  "Mondelez",
  "Unilever",
  "Johnson & Johnson",
  "Procter & Gamble",
  "Bimbo",
  "Grupo Familia",
  "Ramo",
  "Frito lay",
  "Quaker",
  "Mama Inés",
  "Colombina",
  "Natipan",
  "Marinela",
  "Super",
  "El Caribe",
  "Ron Viejo de Caldas",
  "Las Caseritas",
  "Casa Luker",
  "Corona",
  "Zenú",
  "Colgate-Palmolive",
  "Kellogg's",
  "Yupi",
  "Master Chips",
  "Maggi"
] as const;

const categories = ["alimentos básicos", "cuidado e higiene", "mecato", "licor", "aseo", "bebidas", "cárnicos", "frutas y verduras", "mascotas", "otra"] as const;

const subcategories: { [K in Category]: readonly string[]; } = {
  "alimentos básicos": [
    'parva',
    'arepas',
    'granos',
    'lácteos',
    'enlatados',
    'harinas y cereales',
    'aceites y untables',
    'condimentos',
    'café y chocolate',
    'pulverizados',
    'otros'
  ] as const,

  "cárnicos": [
    "carnes rojas",
    "carnes blancas",
    "embutidos",
    "procesados",
    "otros"
  ],
  "frutas y verduras": [
    'frutas',
    'verduras',
    'legumbres',
    'frutas secos',
    'refrigeradas',
    'otros'
  ],
  "cuidado e higiene": [
    'crema dental',
    'jabón',
    'shampoo y acondicionador',
    'desodorante',
    'toallas higiénicas',
    'cepillo de dientes',
    'papel higiénico',
    'afeitado y rasuradoras',
    'cuidado bucal', // Incluye enjuague bucal e hilo dental
    'cuidado del cabello', // Incluye gel, cera y lociones
    'otros'
  ] as const,

  "mecato": [
    'lonchera',
    'paquetes',
    'helados',
    'gomitas',
    'chocolates',
    'galletas',
    'snacks',
    'dulces',
    'ponqués', 
    'otros'
  ] as const,

  "licor": [
    'cerveza',
    'ron',
    'aguardiente',
    'vino',
    'whisky',
    'tequila',
    'vodka',
    'champaña',
    'otros'
  ] as const,

  "aseo": [
    'productos de limpieza', // Incluye jabones, lavaloza, cloro, detergente, desinfectantes, etc.
    'utensilios de limpieza', // Incluye trapeadores, escobas, recogedores, guantes, esponjas
    'ambientadores',
    'cuidado de ropa',
    'bolsas de basura',
    'otros'
  ] as const,

  "bebidas": [
    'gaseosas',
    'jugos',
    'energéticas',
    'hidratantes',
    'refrescos instantáneos',
    'lácteas',
    'otros'
  ] as const,

  "mascotas": [
    'juguetes',
    'alimento',
    'accesorios',
    'ropa',
    'higiene y cuidado',
    'otros'
  ] as const,

  "otra": [
    'tecnología',
    'papelería',
    'farmacia',
    'decoración',
    'iluminación',
    'herramientas',
    'desechables',
    'deportes',
    'repostería',
    'otros'
  ] as const
};

const fruverCategories = ["frutas", "verduras", "hortalizas", "aromáticas y especias", "legumbres", "frutos secos y semillas", "procesados y derivados", "otros"] as const;

const fruverTags: { [K in FruverCategory]?: readonly string[] } = {
  "frutas": [
    "tropicales",         
    "cítricas",          
    "de estación",       
    "exóticas",        
    "de hueso",           
    "de pepita",          
    "de bosque",          
  ],
  "verduras": [
    "de hoja verde",     
    "tubérculos",         
    "crucíferas",       
    "de fruto",          
    "de flor",            
    "bulbos",             
    "raíz comestible",     
  ],
  "hortalizas": [
    "frescas",          
    "cocidas o asadas",   
    "rellenables",         
  ],
  "aromáticas y especias": [
    "aromáticas frescas",  
    "especias secas",      
    "mezclas o infusiones" 
  ],
  "legumbres": [
    "secas",             
    "frescas",             
    "procesadas",          
  ],
  "frutos secos y semillas": [
    "frutos secos",        
    "semillas",            
    "aceites y derivados", 
  ],
  "procesados y derivados": [
    "jugos naturales",    
    "mermeladas",         
    "frutas deshidratadas",
    "pulpas congeladas"
  ],
  "otros": [
    ""
  ]
};

export { tags, brands, subcategories, categories, fruverCategories, fruverTags }