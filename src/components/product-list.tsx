
import React from "react";
import  ProductCard  from "@/components/product-card";
import { Product } from "@/types/shopify";


export const ProductList = ({products}: {products: Product[]}) => {

  
    return (
      <div className="w-full">
        {/* Product Grid */}
        <div className="flex flex-wrap gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
  
        
      </div>
    );
  };
