import { ProductInfo } from "@/components/product-info";
import { YouMightAlsoLike } from "@/components/you-might-also-like";
import React from "react";
import { products } from "@/dummy-data/example-products";

const ProductPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <ProductInfo />
      <YouMightAlsoLike />
      </div>
  );
};

export default ProductPage;
