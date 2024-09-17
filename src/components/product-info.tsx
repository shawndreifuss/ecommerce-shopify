'use client';
import { useState } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Product, ProductVariant } from "@/types/shopify";

// Import images
import SideTableImage from '@/assets/images/side-table.jpg';

// Define the color map (you can expand this with more colors)
const colorMap: { [key: string]: string } = {
  'Grey-Fabric': '#808080',
  'White-Fabric': '#FFFFFF',
  'Blue-Fabric': '#0000FF',
};

export function ProductInfo({ product }: { product: Product }) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]); // Default to the first variant
  const [quantity, setQuantity] = useState<number>(1);

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

  // Select the corresponding image for the selected variant (fallback to the first image)
  const selectedImage = product.images.find(image => selectedVariant.title.includes(image.altText || '')) || product.images[0];

  return (
    <div className="container mx-auto p-8 flex flex-col lg:flex-row gap-8 mt-40 h-full mb-16">
      {/* Left Section - Product Image */}
      <div className="flex-1">
        {/* Main large image */}
        <Image
          src={selectedImage.url}
          alt={selectedImage.altText || 'Product Image'}
          width={600}
          height={400}
          className="w-full h-96 object-cover rounded-lg"
        />
        <div className="flex gap-2 mt-4">
          {/* Thumbnail images */}
          {product.images.map((image, index) => (
            <Image
              key={index}
              src={image.url}
              alt={`Product Thumbnail ${index + 1}`}
              width={100}
              height={100}
              className={`w-24 h-24 object-cover rounded-lg cursor-pointer ${selectedImage.url === image.url ? 'border-2 border-red-500' : ''}`}
              onClick={() => setSelectedVariant(selectedVariant)} // Assuming the variant stays the same for now
            />
          ))}
        </div>

        {/* Color Options (Mobile) */}
        <div className="sm:hidden block py-4">
          <h3 className="text-sm font-semibold">Color:</h3>
          <div className="flex gap-4 mt-2">
            {colorOptions.map((color, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-full cursor-pointer ${
                  selectedVariant.selectedOptions.some(option => option.value === color) ? 'border-2 border-red-500' : ''
                }`}
                style={{ backgroundColor: colorMap[color] }}
                onClick={() => handleVariantChange(color)}
              />
            ))}
          </div>
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
          <div className="text-gray-500" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
        </div>
      </div>

      {/* Right Section - Product Info */}
      <div className="flex-1 space-y-6">
        {/* Product Title and Price */}
        <div className="hidden sm:block">
          <h1 className="text-3xl font-semibold">{product.title}</h1>
          <p className="text-xl font-bold text-primary">${parseFloat(selectedVariant.price.amount).toFixed(2)}</p>
        </div>

        {/* Color Options */}
        <div className="hidden sm:block">
          <h3 className="text-sm font-semibold">Color:</h3>
          <div className="flex gap-4 mt-2">
            {colorOptions.map((color, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-full cursor-pointer ${
                  selectedVariant.selectedOptions.some(option => option.value === color) ? 'border-2 border-red-500' : ''
                }`}
                style={{ backgroundColor: colorMap[color] }}
                onClick={() => handleVariantChange(color)}
              />
            ))}
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="items-center space-x-2 mt-4 hidden md:block lg:block">
          <label htmlFor="quantity" className="text-sm font-medium text-gray-700">Quantity</label>
          <select
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border-gray-300 rounded-md"
          >
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>

        {/* Shipping and Add to Cart */}
        <div className="hidden md:block">
          <div className="flex justify-start w-full gap-4 pb-4">
            <Button className="mt-4 w-1/4">Add to Cart</Button>
            <Button className="mt-4 w-1/4">Buy Now</Button>
          </div>
          <p className="text-sm text-gray-600">Delivered by: <strong>Sep 10th - Oct 4th</strong></p>
          <p className="text-sm text-gray-600">In stock and ready to ship</p>
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
