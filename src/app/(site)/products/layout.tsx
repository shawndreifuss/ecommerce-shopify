import React from 'react';
import FilterSidebar from '@/components/filter-sidebar'; // Import the FilterSidebar component
import ProductPagination from '@/components/product-pagination';



const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
       <FilterSidebar />
      {children}
      <div className="w-screen flex justify-center mb-6"><ProductPagination /></div>
      
    </>
  );
};

export default SiteLayout;