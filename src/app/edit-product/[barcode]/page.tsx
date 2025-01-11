import { getProductByBarcode } from '@/lib/mongo/products'
import React from 'react'
import { Product } from '@/model/products'
import EditProductForm from '@/components/product/editProduct/EditProductForm'

const updateProductByBarcode = async ({params}: {params:{barcode: string}}) => {

  const getProduct = await getProductByBarcode(params.barcode)
  if (!getProduct) {
    return <div>Product not found.</div>
  }

  const product = getProduct as Product
  
  return (
    
      <EditProductForm product={product}/>
    
  )
}

export default updateProductByBarcode