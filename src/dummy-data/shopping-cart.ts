import Cart1 from "@/assets/images/cart/cart-1.jpg"
import Cart2 from "@/assets/images/cart/cart-2.jpg"
import Cart3 from "@/assets/images/cart/cart-3.jpg"
import Cart4 from "@/assets/images/cart/cart-4.jpg"
import Cart5 from "@/assets/images/cart/cart-5.jpg"


export interface Product {
    id: number
    name: string
    price: number
    quantity: number
    image: any
    tags?: string[] | undefined
    color?: string
}

export const exampleProducts = [
    { 
      id: 1, 
      name: "Modern Sofa", 
      price: 799.99, 
      quantity: 1, 
      image: Cart1, 
      tags: ['Comfortable', 'Spacious', ], 
      color: 'Blue' 
    },
    { 
      id: 2, 
      name: "Leather Recliner", 
      price: 999.99, 
      quantity: 1, 
      image: Cart2, 
      tags: ['Luxurious', 'Ergonomic', ], 
      color: 'Brown' 
    },
    { 
      id: 3, 
      name: "Wooden Coffee Table", 
      price: 299.99, 
      quantity: 1, 
      image: Cart3, 
      tags: ['Minimalist', 'Eco-friendly',], 
      color: 'Natural Wood' 
    },
    
  ];
