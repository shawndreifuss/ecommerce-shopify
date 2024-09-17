'use client';
import { useState } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Product, ProductVariant } from "@/types/shopify";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";

// Import images
import SideTableImage from '@/assets/images/side-table.jpg';
import { AddToCart } from "../cart/add-to-cart";
import { VariantSelector } from "./variant-selector";
import Prose from "../prose";

// Define the color map (you can expand this with more colors)
const colorMap: { [key: string]: string } = {
  'Grey-Fabric': '#808080',
  'White-Fabric': '#FFFFFF',
  'Blue-Fabric': '#0000FF',
};

export function ProductInfo({ product }: { product: Product }) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]); // Default to the first variant
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  // Extract available color options from the product variants
  const colorOptions = product.options.find(option => option.name === 'Color')?.values || [];

  // Handle variant selection (color)
  const handleVariantChange = (color: string) => {
    const newVariant = product.variants.find(variant =>
      variant.selectedOptions.some(option => option.name === 'Color' && option.value === color)
    );
    if (newVariant) {
      setSelectedVariant(newVariant);
    }
  };


  console.log(product);
  return (
   
      <div className="container mx-auto p-8 flex flex-col lg:flex-row gap-8 mt-40 h-full mb-16">
        {/* Left Section - Product Image */}
        <div className="flex-1">
          {/* Main large image */}
          <Image
            src={selectedImage.url}
            alt={selectedImage.altText || 'Product Image'}
            width={1200}
            height={800}
            className="w-full h-96 object-cover rounded-lg"
          />
          <div className="flex gap-2 mt-4 w-full overflow-y-scroll">
            {/* Thumbnail images */}
            {product.images.map((image, index) => (
              <Image
                key={index}
                src={image.url}
                alt={`Product Thumbnail ${index + 1}`}
                width={100}
                height={100}
                className={`w-24 h-24 object-cover rounded-lg cursor-pointer ${selectedImage.url === image.url ? 'border-2 border-gray-500' : ''}`}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>

          {/* Color Options (Mobile) */}
          <div className="sm:hidden block py-4">
            <VariantSelector options={product.options} variants={product.variants} />
         </div>

          {/* Shipping and Add to Cart (Mobile) */}
          <div className="sm:hidden block py-4">
            <p className="text-sm text-gray-600">
              Delivered by: <strong>Sep 10th - Oct 4th</strong>
            </p>
            <p className="text-sm text-gray-600">In stock and ready to ship</p>
            <div className="flex justify-start w-full gap-4">
              <Button className="mt-4 w-1/3">Add to Cart</Button>
              <Button className="mt-4 w-1/3">Buy Now</Button>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-4 lg:mt-10">
            <h1 className="font-bold text-gray-500">Description</h1>
            {product.descriptionHtml ? (
        <Prose
          className="mb-6 text-sm leading-tight dark:text-white/[60%]"
          html={product.descriptionHtml}
        />
      ) : null}
          </div>
        </div>

        {/* Right Section - Product Info */}
        <div className="flex-1 space-y-6">
          {/* Product Title and Price */}
          <div className="hidden sm:block">
          <p className="text-4xl font-bold text-primary mb-8">$ {parseFloat(selectedVariant.price.amount).toFixed(2)}</p>
            <h1 className="text-3xl font-semibold">{product.title}</h1>
          </div>
   


          {/* Color Options (Desktop) */}
          <div className="hidden sm:block">
            <VariantSelector options={product.options} variants={product.variants} />
           
          </div>

        

          {/* Shipping and Add to Cart */}
          <div className="hidden md:block">
            <div className="flex justify-start w-full gap-4 pb-4">
            <AddToCart product={product} />
            </div>
          
          </div>

          {/* Related Product */}
          <Card className="mt-6">
            <CardHeader>
              <h3 className="text-md font-semibold">Make a bigger impact with</h3>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Image
                  src={SideTableImage}
                  alt="Related Product"
                  width={100}
                  height={100}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <p className="font-medium">Seno Oak 36" Round Dining Table</p>
                  <p className="text-red-500">$449</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Accordion for Description, Features, Specifications, Care */}
          <Accordion type="single" collapsible className="mt-8">
            <AccordionItem value="features">
              <AccordionTrigger>Features</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600 mt-4">Feature 1, Feature 2...</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="specifications">
              <AccordionTrigger>Specifications</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600 mt-4">Weight, Dimensions, Materials...</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="care">
              <AccordionTrigger>Care</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600 mt-4">Care instructions for maintaining the product...</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
  );
}
