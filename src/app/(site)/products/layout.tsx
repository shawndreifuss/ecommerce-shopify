import React from 'react';
import FilterSidebar from '@/components/filter-sidebar'; // Import the FilterSidebar component



const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
       <FilterSidebar />

      {children}
    </>
  );
};

export default SiteLayout;