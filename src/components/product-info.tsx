'use client';
import { useState } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Image, { StaticImageData } from "next/image";

// Import images
import BestSellerImage from '@/assets/images/best-seller-sofa.jpg'; 
import SideTableImage from '@/assets/images/side-table.jpg';
import HomeOfficeImage from '@/assets/images/home-office.jpg';

// Define TypeScript type for Product
type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  colors: string[]; // Hex color codes
  images: StaticImageData[]; // Using Next.js StaticImageData type for images
  reviews?: number;
};

// Product Data with fixed description
const product: Product = {
    id: 1,
    name: 'Wooden Dining Table',
    description: 'The Shaker inspired Rus Chair is simple, bold, and timeless — what else can we say? The Shakers really knew what they were doing when they put spindles on chairs, and sometimes you&#39;ve got to stick to the classics.',
    price: 799,
    colors: ['#B5651D', '#F5F5DC', '#6B4226', '#A0522D'], // Brown, Beige, Dark Brown, Saddle Brown
    images: [HomeOfficeImage, BestSellerImage, SideTableImage],
    reviews: 529,
  };
  
  

export function ProductInfo() {
  // State to manage the currently selected image
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  return (
    <div className="container mx-auto p-8 flex flex-col lg:flex-row gap-8 mt-40 h-full mb-16">
      {/* Left Section - Product Image */}
      <div className="lg:hidden ">
      <div>
          <h1 className="text-3xl font-semibold">{product.name}</h1>
          <p className="text-xl font-bold text-primary">${product.price}</p>
          <p className="text-sm text-gray-500">4.4 ★ ({product.reviews} Reviews)</p>
        </div>
      </div>
      <div className="flex-1">
        {/* Main large image */}
        <Image
          src={selectedImage}
          alt="Product Image"
          width={600}
          height={400}
          className="w-full h-96 object-cover rounded-lg"
        />
        <div className="flex gap-2 mt-4">
          {/* Thumbnail images with click handlers */}
          {product.images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`Product Thumbnail ${index + 1}`}
              width={100}
              height={100}
              className={`w-24 h-24 object-cover rounded-lg cursor-pointer ${
                selectedImage === image ? "border-2 border-red-500" : ""
              }`}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
        {/* Color Options Mobile */}
        <div className="sm:hidden block py-4">
          <h3 className="text-sm font-semibold">Color:</h3>
          <div className="flex gap-4 mt-2">
            {product.colors.map((color, index) => (
              <div
                key={index}
                className="w-8 h-8 rounded-full"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>


        {/* Shipping and Add to Cart Mobile */}
        <div className="sm:hidden block py-4">
          <p className="text-sm text-gray-600">
            Delivered by: <strong>Sep 10th - Oct 4th</strong>
          </p>
          <p className="text-sm text-gray-600">In stock and ready to ship</p>
          <div className="flex justify-start w-full gap-4">
            <Button className="mt-4 w-1/3 ">Add to Cart</Button>
            <Button className="mt-4 w-1/3 ">Buy Now</Button>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-4 lg:mt-10">
        <h1 className="font-bold bold text-gray-500">Description</h1>
        <div className="text-gray-500">{product.description}</div>
        </div>
      </div>

      {/* Right Section - Product Info */}
      <div className="flex-1 space-y-6 ">
        {/* Product Title and Price */}
        <div className="hidden sm:block">
        <h1 className="text-3xl font-semibold">{product.name}</h1>
          <p className="text-xl font-bold text-primary">${product.price}</p>
          <p className="text-sm text-gray-500">4.4 ★ ({product.reviews} Reviews)</p>
        </div>

        {/* Color Options */}
        <div className="hidden md:block lg:block">
          <h3 className="text-sm font-semibold">Color:</h3>
          <div className="flex gap-4 mt-2">
            {product.colors.map((color, index) => (
              <div
                key={index}
                className="w-8 h-8 rounded-full"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Shipping and Add to Cart */}
        <div className="hidden md:block ">
          <p className="text-sm text-gray-600 ">
            Delivered by: <strong>Sep 10th - Oct 4th</strong>
          </p>
          <p className="text-sm text-gray-600">In stock and ready to ship</p>
          <div className="flex justify-start w-full gap-4">
            <Button className="mt-4 w-1/3 ">Add to Cart</Button>
            <Button className="mt-4 w-1/3 ">Buy Now</Button>
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
