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
import { set } from "date-fns";

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

  console.log('cart' , cart)

  return (
    <div>
      {/* Trigger Button to Open Modal */}
      <button onClick={() => {setIsOpen(!isOpen)}} className="relative w-full h-full flex align-center justify-center">
        <OpenCart quantity={cart?.totalQuantity} />
      </button>
      {/* Full-Screen Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 h-screen w-screen">
          {/* Modal Content */}
          <div className="relative bg-white w-full h-full max-h-full p-6 overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => {setIsOpen(!isOpen)}}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 z-50 cursor-pointer"
            >
              ✕
            </button>

            {/* Modal Header */}
            <h2 className="text-2xl font-semibold text-gray-900">Shopping Cart</h2>

            {!cart || cart.lines.length === 0 ? (
              <div className="flex w-screen h-screen flex-col items-center justify-center overflow-hidden absolute top-0 bottom-0 left-0 right-0 ">
                <ShoppingCartIcon className="h-16" />
                <p className="mt-6 text-center text-2xl font-bold">Your cart is empty.</p>
              </div>
            ) : (
              <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8 overflow-y-scroll">
                <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl space-y-6">
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
                        <div key={i} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                          <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                            <a href="#" className="shrink-0 md:order-1">
                              <Image
                                className="h-32 w-32 rounded-sm"
                                alt={item.merchandise.product.featuredImage.altText || item.merchandise.product.title}
                                src={item.merchandise.product.featuredImage.url}
                                width={1200}
                                height={1200}
                              />
                            </a>
                            <div className="flex items-center justify-between md:order-3 md:justify-end">
                              <div className="flex items-center">
                              <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
                                  <EditItemQuantityButton
                                    item={item}
                                    type="minus"
                                    optimisticUpdate={updateCartItem}
                                  />
                                  <p className="w-6 text-center">
                                    <span className="w-full text-sm">{item.quantity}</span>
                                  </p>
                                  <EditItemQuantityButton
                                    item={item}
                                    type="plus"
                                    optimisticUpdate={updateCartItem}
                                  />
                                </div>
                              </div>
                              <div className="text-end">
                              <Price
                                  className="flex justify-end space-y-2 text-right text-sm"
                                  amount={item.cost.totalAmount.amount}
                                  currencyCode={item.cost.totalAmount.currencyCode}
                                />
                              </div>
                            </div>
                            <div className="w-full flex-1 space-y-4 md:order-2">
                              <a
                                href={merchandiseUrl}
                                className="text-base font-medium text-gray-900 hover:underline"
                              >
                                {item.merchandise.product.title}
                              </a>
                              <div className="flex items-center gap-4">
                              <DeleteItemButton item={item} optimisticUpdate={updateCartItem} />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>

                {/* Order Summary */}
                <div className="mx-auto mt-6 max-w-4xl space-y-6 lg:w-full">
                  <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <p className="text-xl font-semibold text-gray-900">Order Summary</p>
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500">Total</dt>
                      <dd className="text-base font-bold">${cart?.cost?.totalAmount?.amount || '0.00'}</dd>
                    </dl>
                    <form action={redirectToCheckout}>
                    <Button
                      className="mt-4 w-full text-white py-3 rounded-md"
                    >
                      Proceed to Checkout
                    </Button>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


