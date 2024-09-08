"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { bundlesItems, getInspiredItems, sofaCollections } from "@/dummy-data/nav-data";
import Image from "next/image";

export function NavLinks2() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Bundles Dropdown */}
        <NavigationMenuItem className="flex flex-col relative">
          <NavigationMenuTrigger>Bundles</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[300px] lg:w-[400px] text-gray-500">
              {bundlesItems.map((item) => (
                <ListItem key={item.title} title={item.title} href={item.href} />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Get Inspired Dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Get Inspired</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[300px] lg:w-[400px] text-gray-500">
              {getInspiredItems.map((item) => (
                <ListItem key={item.title} title={item.title} href={item.href} />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Sofa Collections Dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Sofa Collections</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[300px] lg:w-[400px] text-gray-500">
              {sofaCollections.map((item) => (
                <ListItem key={item.title} title={item.title} href={item.href} />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Other Navigation Links */}
        <NavigationMenuItem>
          <Link href="/new-arrivals" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              New Arrivals
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/sale" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Sale
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
