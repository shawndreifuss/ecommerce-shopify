import AddOnBundle from "@/components/add-on-bundle";
import { ProductInfo } from "@/components/product-info";
import ReviewsSection from "@/components/reviews-section";
import WhyBuySection from "@/components/why-buy-section";
import { YouMightAlsoLike } from "@/components/you-might-also-like";
import React from "react";

const ProductPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <ProductInfo />
      <YouMightAlsoLike />
      <AddOnBundle />
      <ReviewsSection />
      <WhyBuySection />
      </div>
  );
};

export default ProductPage;
