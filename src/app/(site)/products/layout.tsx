import { ProductProvider } from "@/components/product/product-context";
import React from "react";

const AllProductsPage = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
    <ProductProvider >{children}</ProductProvider>
      
    </>
  );
};

export default AllProductsPage;
