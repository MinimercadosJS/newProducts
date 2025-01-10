'use client'
import { useFormContext } from 'react-hook-form';
import { categories, Product } from '@/model/products';
import { camelCaseToTitleCase } from '@/globalFunctions';

const CategorySelector = () => {
    const { register, getValues } = useFormContext<Product>()

    return (
        <>
            <label >
                <span className='text-sm font-semibold text-gray-600' >Categoría</span>
                <select required
                    {...register("category")}>
                    <option value="" ></option>
                    {Object.keys(categories).map((category) => (
                        <option key={category} value={category}>
                            {camelCaseToTitleCase(category)}
                        </option>
                    ))}
                </select>
            </label >

            <label >
                <span className='text-sm font-semibold text-gray-600' >Sub categoría</span>
                <select {...register("subcategory")} required>
                    <option value="" ></option>
                    {categories[getValues("category")].map((subcategory) => (
                        <option key={subcategory} value={subcategory}>
                            {camelCaseToTitleCase(subcategory)}
                        </option>
                    ))}
                </select>
            </label>

        </>
    );
};

export default CategorySelector