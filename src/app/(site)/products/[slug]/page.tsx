import FilterSidebar from '@/components/filter-sidebar'
import ProductPagination from '@/components/product-pagination'
import React from 'react'

const AllProductsPage = () => {
  return (
    <>
    <FilterSidebar />
   <div className="w-screen flex justify-center mb-6"><ProductPagination /></div>
   
 </>
  )
}

export default AllProductsPage