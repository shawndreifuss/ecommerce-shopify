import productFragment from '../fragments/product';

export const getProductQuery = /* GraphQL */ `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      ...product
    }
  }
  ${productFragment}
`;

export const getProductsQuery = /* GraphQL */ `
  query getProducts($sortKey: ProductSortKeys, $reverse: Boolean, $query: String) {
    products(sortKey: $sortKey, reverse: $reverse, query: $query, first: 100) {
      edges {
        node {
          ...product
        }
      }
    }
  }
  ${productFragment}
`;

export const getProductRecommendationsQuery = /* GraphQL */ `
  query getProductRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
      ...product
    }
  }
  ${productFragment}
`;

export const getYouMightAlsoLikeQuery = /* GraphQL */ `
  query getYouMightAlsoLike($tags: [String!], $collectionId: ID, $excludeProductId: ID!) {
    products(
      first: 10, 
      query: $query, 
      filters: { 
        productType: "similar", 
        tag: $tags, 
        collectionId: $collectionId,
      },
      first: 10,
      ) {
      edges {
        node {
          ...product
        }
      }
    }
  }
  ${productFragment}
`;