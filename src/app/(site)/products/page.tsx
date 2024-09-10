import FilterSidebar from '@/components/filter-sidebar'
import ProductPagination from '@/components/product-pagination'
import React, { useEffect, useState } from 'react';
import { shopifyClient } from '@/utils/shopify-client'; // Shopify client setup
import { getProductsQuery } from '@/lib/shopify/queries/product'
import { ClientResponse, ResponseErrors } from '@shopify/graphql-client'; // Use Shopify's types

interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText?: string;
      };
    }>;
  };
}

interface ProductEdge {
  node: Product;
}

interface ProductData {
  products: {
    edges: ProductEdge[];
  };
}

const AllProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [errorMessages, setErrorMessages] = useState<string[]>([]); // For error handling

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch products using Shopify's ClientResponse type
        const response: ClientResponse<ProductData> = await shopifyClient.request(getProductsQuery, {
          variables: {
            sortKey: 'TITLE',
            reverse: false,  
            query: '',       
          },
        });

        if (response.data) {
          setProducts(response.data.products.edges.map(edge => edge.node));
        }

        // Handle errors
        if (response.errors) {
          // Check if errors is an array and map through it, else handle as a single object
          if (Array.isArray(response.errors)) {
            const errors = response.errors.map((err: ResponseErrors) => err.message);
            setErrorMessages(['Unknown error occurred']);
          } else {
            setErrorMessages([response.errors.message || 'Unknown error occurred']);
          }
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <FilterSidebar products={products}/>
      <div className="w-screen flex justify-center mb-6"><ProductPagination /></div>
      <div>
        <h1>Products</h1>
        {errorMessages.length > 0 && (
          <div>
            <h2>Errors:</h2>
            <ul>
              {errorMessages.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <p>
                Price: {product.priceRange.minVariantPrice.amount} {product.priceRange.minVariantPrice.currencyCode}
              </p>
              {product.images.edges.length > 0 && (
                <img
                  src={product.images.edges[0]?.node.url}
                  alt={product.images.edges[0]?.node.altText || 'Product Image'}
                  width="200"
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default AllProductsPage;
