
import React from "react";
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AddOnBundle from "@/components/add-on-bundle";
import { ProductInfo } from "@/components/product/product-info";
import ReviewsSection from "@/components/reviews-section";
import WhyBuySection from "@/components/why-buy-section";
import { YouMightAlsoLike } from "@/components/you-might-also-like";

import { HIDDEN_PRODUCT_TAG } from '@/lib/constants';
import { getProduct, getProductRecommendations } from '@/lib/shopify';
import { ProductProvider } from "@/components/product/product-context";

export async function generateMetadata({
  params
}: {
  params: { handle: string };
}): Promise<Metadata> {
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable
      }
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt
            }
          ]
        }
      : null
  };
}

export default async function ProductPage({ params }: { params: { handle: string } }) {

  const product = await getProduct(params.handle);
  if (!product) return notFound();



  return (
    <ProductProvider>

    <div className="flex flex-col gap-4">
      <ProductInfo product={product} />
      <YouMightAlsoLike  />
      <AddOnBundle />
      <ReviewsSection />
      <WhyBuySection />
      </div>
    </ProductProvider>
  );
};

