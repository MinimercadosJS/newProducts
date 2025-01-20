import { brands } from '@/globalConsts';
import { categories } from '@/model/products';
import * as Yup from 'yup';

export const productSchema = Yup.object().shape({
  barcode: Yup.string().required('Llena esta mierda'), // Mensaje personalizado
  name: Yup.string().required('El nombre es obligatorio'),
  measure: Yup.string().required('La medida es obligatoria'),
  brand: Yup.mixed()
    .oneOf(brands, 'Selecciona una marca válida') // Validación directa de los valores de brands
    .required('La marca es obligatoria'),
  description: Yup.string(), // Campo opcional
  image: Yup.string().required('La imagen es obligatoria'),
  category: Yup.mixed()
    .oneOf(categories, 'Selecciona una categoría válida') // Validación directa de los valores de categories
    .required('La categoría es obligatoria'),
  subcategory: Yup.string().required('La subcategoría es obligatoria'),
  tags: Yup.array()
    .of(Yup.string())
    .required('Debe incluir al menos un tag')
    .min(1, 'Debe incluir al menos un tag'),
});
