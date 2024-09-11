"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  exampleProducts,
  bestSellersItems,
  roomCategories,
} from "@/dummy-data/nav-data"; // Importing categories data
import { Icons } from "@/components/ui/icons";
import Image from "next/image";
import { NavLinks2 } from "@/components/nav-links-2";



export const NavLinks = () => {

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Products Dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-screen shadow-lg mt-2 p-6 grid grid-cols-4 gap-8">
              {/* Products Categories */}
              {exampleProducts.map((category, index) => (
                <div key={index}>
                  <h3 className="font-bold text-muted-foreground  mb-2">
                    {category.title}
                  </h3>
                  <ul>
                    {category.items.map((category, idx) => (
                   <SmallListItem key={idx} href={`/products/${category}`} title={category} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/* Rooms Dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Rooms</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-screen shadow-lg  mt-2 p-6 grid grid-cols-5 gap-4">
              {/* Products Categories */}
              {roomCategories.map((category, index) => (
                <div key={index}>
                  <h3 className="font-bold text-muted-foreground mb-2">
                    {category.title}
                  </h3>
                  <ul>
                    {category.items.map((item, idx) => (
                       <SmallListItem key={idx} href={`/products/${item}`} title={item} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Best Sellers Dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Best Sellers</NavigationMenuTrigger>
          <NavigationMenuContent className="relative">
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] ">
              <li className="row-span-3">
              <NavigationMenuLink asChild>
  <a
    className="relative flex h-full w-full select-none flex-col justify-end rounded-md p-6 no-underline outline-none focus:shadow-md"
    href={bestSellersItems[0].href}
  >
   {bestSellersItems[0].img && (
      <Image
        src={bestSellersItems[0].img} 
        alt={bestSellersItems[0].title}
        layout="fill" 
        objectFit="cover" 
        objectPosition="center" 
        className="rounded-md "
      />
    )}
      <div className="absolute inset-0 bg-black opacity-30 transition-opacity duration-300 ease-in-out group-hover:opacity-50 rounded-md"></div>
      

    {/* Overlay content like the logo and title */}
    <div className="relative z-10">
      <Icons.logo className="h-6 w-6" />
      <div className="mb-2 mt-4 text-lg font-medium text-white">
        {bestSellersItems[0].title}
      </div>
    </div>
  </a>
</NavigationMenuLink>

              </li>
              <div>
                <ListItem href="/products/all" title="All Best Sellers" />
                <ListItem href="/products/living-room" title="Living Room" />
                <ListItem href="/products/bedroom" title="Bedroom" />
                <ListItem href="/products/dining-room" title="Dining Room" />
                <ListItem href="/products/home-office" title="Home Office" />
                <ListItem href="/products/decor" title="Decor" />
                <ListItem href="/products/outdoor" title="Outdoor" />
              </div>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

<NavLinks2 />
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-200 hover:text-black focus:bg-gray-200 focus:text-black",
            "text-gray-500",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium">{title}</div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const SmallListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none p-1 rounded-md leading-none no-underline outline-none transition-colors hover:bg-gray-200 hover:text-black focus:bg-gray-200 focus:text-black",
            "text-gray-500",
            className
          )}
          {...props}
        >
          <div className="text-sm font-small">{title}</div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
SmallListItem.displayName = "SmallListItem";
