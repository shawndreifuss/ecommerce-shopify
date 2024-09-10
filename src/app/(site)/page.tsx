'use client'
import { useEffect, useState } from 'react';
import { shopifyClient } from '@/utils/shopify-client'; // Shopify client setup
import { getProductsQuery } from '@/lib/shopify/queries/product'

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

interface ClientResponse<T> {
  data?: T;
  errors?: any[];
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response: ClientResponse<ProductData> = await shopifyClient.request(getProductsQuery, {
          variables: {
            sortKey: 'TITLE',
            reverse: false,  
            query: '',       
          },
        });

        if (response.data) {
          setProducts(response.data.products.edges.map(edge => edge.node));
        } else {
          console.error('No data returned from Shopify');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
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
  );
};

export default ProductsPage;
