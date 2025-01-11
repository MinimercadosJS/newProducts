'use client'
import './edit-product-styles.css'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver  } from '@hookform/resolvers/zod'
import Input from './Input'
import BrandInput from './BrandInput'
import CategorySelector from './CategorySelector'
import ImageInput from './ImageInput'
// import { DevTool } from "@hookform/devtools";
import { useState } from 'react'
import { Product, productSchema } from '@/model/products'
import { editProduct } from '@/lib/mongo/products'

const EditProductForm = ({ product }: { product: Product }) => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'submitted' | 'failed'>('idle')
  const form = useForm({ resolver: zodResolver(productSchema), defaultValues: { ...product } })
  const { formState: { isValid, }, getValues, register, handleSubmit } = form

  const handleEditProduct = async () => {
  
    setFormStatus("submitting")
    const updatedProduct = getValues()
    const result = await editProduct(updatedProduct)
    if (!result) return setFormStatus("failed")
    setFormStatus("submitted")
    alert("Producto actualizado con éxito")
  }

  return (
    <form id='uploadProductForm' onSubmit={handleSubmit(handleEditProduct)}>
      <FormProvider {...form}>
        <Input name="name" label='Nombre' />
        <BrandInput />
        <ImageInput />
        <Input name="measure" label="Medida" />
        <Input name="description" label='Descripción' defaultValue=" " />
        <CategorySelector />
        {/* <DevTool {...form} /> */}
        <button type='submit' disabled={!isValid} className='submit-button'>
          {formStatus === "submitting" ? 'Cargando...' : 'Actualizar Producto'}
        </button>
      </FormProvider>
    </form>
  )
}

export default EditProductForm