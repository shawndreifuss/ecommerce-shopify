import React from 'react'
import FilterSidebar from '@/components/filter-sidebar'
import ProductPagination from '@/components/product-pagination'
import { getProducts } from '@/lib/shopify'


const ProductsPage = async () => {

    const products = await getProducts({});

  return (
    <div><FilterSidebar products={products} />
    <div className="w-screen flex justify-center mb-6">
      <ProductPagination />
    </div></div>
  )
}

export default ProductsPage