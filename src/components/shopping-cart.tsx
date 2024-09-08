"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Sheet,  SheetClose,  SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ShoppingCart as Shopping, Trash2 } from "lucide-react"
import { exampleProducts, Product } from "@/dummy-data/shopping-cart"
import Image from "next/image"

export function ShoppingCart() {
  const [cartItems, setCartItems] = React.useState<Product[]>(exampleProducts)

  // Function to remove an item from the cart
  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  // Function to update quantity
  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: newQuantity } : item))
  }

  // Calculate total price
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <div>
      {/* Shopping Cart Button */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost">
            <Shopping className="w-6 h-6" />
            <span className="ml-2 text-sm">Cart ({cartItems.length})</span>
          </Button>
        </SheetTrigger>

        {/* Shopping Cart Sheet */}
        <SheetContent side="right" className="w-screen">
        <div className=" w-full h-screen">
          <div className="flex h-full w-full flex-col overflow-y-scroll -ml-4">
            <div className="flex-1 w-full overflow-y-auto px-4 py-6 sm:px-6">
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-medium text-gray-500" id="slide-over-title">Shopping cart</h2>
              </div>

              <div className="mt-8">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {cartItems.map(item => (
                    <li className="flex py-6" key={item.id}>
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <Image width={100} height={100} src={item.image} alt={item.name} className="h-full w-full object-cover object-center"/>
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-500">
                            <h3>
                              <a href="#">{item.name}</a>
                            </h3>
                            <p className="ml-4">${item.price.toFixed(2)}</p>
                          </div>
                          <div className="flex gap-3">
                            {item.tags?.map(tag => (
                              <div key={tag} className="mt-1 text-sm text-gray-400">{tag}</div>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <label htmlFor={`quantity-${item.id}`} className="text-gray-500">Qty</label>
                            <input 
                              type="number" 
                              id={`quantity-${item.id}`} 
                              min="1" 
                              value={item.quantity} 
                              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                              className="w-16 p-1 border border-gray-300 rounded-md"
                            />
                          </div>

                          <div className="flex">
                            <button onClick={() => removeItem(item.id)} type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6 mb-4">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${totalPrice.toFixed(2)}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
              <div className="mt-6">
                <a href="#" className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                  Checkout
                </a>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or
                  <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
