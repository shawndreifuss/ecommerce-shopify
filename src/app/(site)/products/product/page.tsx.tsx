'use client'

import { useState } from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";
import BestSellerImage from '@/assets/images/best-seller-sofa.jpg'; 
import SideTableImage from '@/assets/images/side-table.jpg';
import HomeOfficeImage from '@/assets/images/home-office.jpg';
import BedroomSet from '@/assets/images/shop-by-room/bedroom.jpg';

const product = {
    id: 2,
    name: 'Velvet Sofa',
    description: 'Luxurious velvet sofa, perfect for a modern or classic living room.',
    price: 1099,
    colors: ['#4B0082', '#708090', '#B03060', '#483D8B'], // Indigo, Slate Gray, Maroon, Dark Slate Blue
    images: [ SideTableImage, BestSellerImage, HomeOfficeImage], // Static images
    stock: 10, // Added stock value
    ssdCapacities: ["256GB", "512GB", "1TB"], // Sample data, you can remove if not needed
    reviews: {
      averageRating: 4.8,
      count: 345
    },
    longDescription: "This is a luxurious velvet sofa with high-quality materials and craftsmanship. Perfect for modern living rooms.",
    specifications: [
      { label: "Material", value: "Velvet" },
      { label: "Dimensions", value: "200cm x 90cm x 75cm" },
      { label: "Weight", value: "30kg" }
    ],
    warranty: "2 years manufacturer warranty."
}

const ProductPage = () => {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);

  const handleImageClick = (image:any) => {
    setSelectedImage(image);
  };

  const handleQuantityChange = (e:any) => {
    setQuantity(e.target.value);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Product Images */}
      <div className="flex flex-col gap-2">
        {/* Thumbnails */}
        <div className="flex lg:flex-col gap-2">
          {product.images.map((image, index) => (
            <div key={index} onClick={() => handleImageClick(image)} className="cursor-pointer">
              <Image
                src={image}
                alt={`Product Image ${index + 1}`}
                width={70}
                height={70}
                className={`border ${selectedImage === image ? "border-blue-500" : "border-gray-300"}`}
              />
            </div>
          ))}
        </div>

        {/* Main Image */}
        <div className="flex justify-center items-center">
          <Image
            src={selectedImage}
            alt="Selected Product Image"
            width={500}
            height={500}
            className="object-cover"
          />
        </div>
      </div>

      {/* Product Information */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-gray-500">{product.description}</p>

        {/* Pricing */}
        <div className="mt-4">
          <p className="text-3xl font-bold">${product.price}</p>
          <div className="flex items-center">
            <p className="text-yellow-500">★ {product.reviews.averageRating}</p>
            <p className="ml-2 text-sm text-gray-500">({product.reviews.count} reviews)</p>
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="mt-4">
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <Input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min={1}
            max={product.stock}
            id="quantity"
            className="mt-1 w-20"
          />
        </div>

        {/* Add to Cart and Favorites */}
        <div className="mt-6 flex gap-4">
          <Button className="w-full">
            Add to cart
          </Button>
          <Button variant="outline" className="w-full">
            Add to favorites
          </Button>
        </div>

        {/* Product Options */}
        <div className="mt-6">
          {/* Color Options */}
          <div className="mt-4">
            <p className="text-sm font-semibold">Colour</p>
            <div className="flex gap-2 mt-2">
              {product.colors.map((color, index) => (
                <button
                  key={index}
                  className="w-10 h-10 rounded-full border"
                  style={{ backgroundColor: color }}
                ></button>
              ))}
            </div>
          </div>

          {/* SSD Capacity (Render only if it exists) */}
          {product.ssdCapacities && (
            <div className="mt-4">
              <p className="text-sm font-semibold">SSD Capacity</p>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select SSD" />
                </SelectTrigger>
                <SelectContent>
                  {product.ssdCapacities.map((capacity, index) => (
                    <SelectItem key={index} value={capacity}>
                      {capacity}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Pickup Options */}
          <div className="mt-4">
            <p className="text-sm font-semibold">Pickup</p>
            <Tabs defaultValue="shipping">
              <TabsList>
                <TabsTrigger value="shipping">Shipping - $19</TabsTrigger>
                <TabsTrigger value="pickup">Pickup from Flowbox - $9</TabsTrigger>
              </TabsList>
              <TabsContent value="shipping">
                Arrives on November 17
              </TabsContent>
              <TabsContent value="pickup">
                Pick up from your nearest Flowbox store.
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Product Description, Specifications, and Warranty */}
      <div className="mt-10 lg:mt-0">
        <Accordion type="single" collapsible>
          <AccordionItem value="details">
            <AccordionTrigger>Product Details</AccordionTrigger>
            <AccordionContent>
              {product.longDescription}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="specifications">
            <AccordionTrigger>Specifications</AccordionTrigger>
            <AccordionContent>
              {/* List of Specifications */}
              {product.specifications.map((spec, index) => (
                <p key={index}>
                  <span className="font-semibold">{spec.label}: </span>{spec.value}
                </p>
              ))}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="warranty">
            <AccordionTrigger>Warranty</AccordionTrigger>
            <AccordionContent>
              {product.warranty}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default ProductPage;
