"use client";

import { ShoppingCartIcon } from "lucide-react";
import Price from '@/components/price';
import { DEFAULT_OPTION } from '@/lib/constants';
import { createUrl } from '@/lib/utils';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { createCartAndSetCookie, redirectToCheckout } from './actions';
import { useCart } from './cart-context';
import { DeleteItemButton } from './delete-item-button';
import OpenCart from './open-cart';
import { EditItemQuantityButton } from "./edit-item-quantity-button";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from 'next/link';

type MerchandiseSearchParams = {
  [key: string]: string;
};

export function ShoppingCart() {
  const { cart, updateCartItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(cart?.totalQuantity);

  useEffect(() => {
    if (!cart) {
      createCartAndSetCookie();
    }
  }, [cart]);

  useEffect(() => {
    if (
      cart?.totalQuantity &&
      cart?.totalQuantity !== quantityRef.current &&
      cart?.totalQuantity > 0
    ) {
      if (!isOpen) {
        setIsOpen(true);
      }
      quantityRef.current = cart?.totalQuantity;
    }
  }, [isOpen, cart?.totalQuantity, quantityRef]);

  return (
    <Sheet>
      <SheetTrigger>
        <button className="relative w-full h-full flex align-center justify-center">
          <OpenCart quantity={cart?.totalQuantity} />
        </button>
      </SheetTrigger>

      {/* Full-Screen Modal */}
      <SheetContent className="w-screen max-w-md p-6 bg-white shadow-lg transition-transform transform ease-in-out duration-500 sm:duration-700">
        {/* Modal Header */}
        <SheetHeader className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-900">Shopping Cart</h2>

        </SheetHeader>

        {!cart || cart.lines.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center">
            <ShoppingCartIcon className="h-16" />
            <p className="mt-6 text-2xl font-bold">Your cart is empty.</p>
          </div>
        ) : (
          <div className="space-y-6 overflow-y-auto">
            {cart.lines
              .sort((a, b) => a.merchandise.product.title.localeCompare(b.merchandise.product.title))
              .map((item, i) => {
                const merchandiseSearchParams = {} as MerchandiseSearchParams;
                item.merchandise.selectedOptions.forEach(({ name, value }) => {
                  if (value !== DEFAULT_OPTION) {
                    merchandiseSearchParams[name.toLowerCase()] = value;
                  }
                });
                const merchandiseUrl = createUrl(
                  `/product/${item.merchandise.product.handle}`,
                  new URLSearchParams(merchandiseSearchParams)
                );

                return (
                  <div key={i} className="flex py-6 border-b border-gray-200">
                    <div className="h-24 w-24 flex-shrink-0 rounded-md border border-gray-200 overflow-hidden">
                      <SheetClose asChild>
                        <Link href={`/product/${item.merchandise.product.handle}`}>
                          <Image
                            className="h-full w-full object-cover object-center"
                            alt={item.merchandise.product.featuredImage.altText || item.merchandise.product.title}
                            src={item.merchandise.product.featuredImage.url}
                            width={1200}
                            height={1200}
                          />
                        </Link>
                      </SheetClose>
                    </div>
                    <div className="ml-4 flex flex-col flex-1">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3 className="line-clamp-1">
                          <SheetClose asChild>
                            <Link href={`/product/${item.merchandise.product.handle}`}>
                              {item.merchandise.product.title}
                            </Link>
                          </SheetClose>
                        </h3>
                        <p className="ml-4">
                          <Price amount={item.cost.totalAmount.amount} currencyCode={item.cost.totalAmount.currencyCode} />
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.merchandise.selectedOptions.map(option => option.value).join(', ')}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center">
                          <EditItemQuantityButton item={item} type="minus" optimisticUpdate={updateCartItem} />
                          <p className="w-8 text-center">{item.quantity}</p>
                          <EditItemQuantityButton item={item} type="plus" optimisticUpdate={updateCartItem} />
                        </div>
                        <DeleteItemButton item={item} optimisticUpdate={updateCartItem} />
                      </div>
                    </div>
                  </div>
                );
              })}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between text-lg font-semibold text-gray-900">
                <span>Total</span>
                <span>${cart?.cost?.totalAmount?.amount || '0.00'}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Shipping and taxes calculated at checkout.</p>
              <form action={redirectToCheckout}>
                <Button className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-md shadow-md hover:bg-indigo-700">
                  Proceed to Checkout
                </Button>
              </form>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
