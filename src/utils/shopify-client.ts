
import { createStorefrontApiClient } from '@shopify/storefront-api-client';

export const shopifyClient = createStorefrontApiClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!,
  apiVersion: '2024-07',
  publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_PUBLIC_ACCESS_TOKEN!,
});
