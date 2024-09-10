// pages/api/products.ts
import { shopifyClient } from '@/utils/shopify-client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getProductsQuery } from '@/lib/shopify/queries/product';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await shopifyClient.request(getProductsQuery, {
      variables: {
        sortKey: 'TITLE',
        reverse: false,
        query: '',
      },
    });

    if (response.data) {
      res.status(200).json(response.data);
    } else {
      res.status(500).json({ error: 'No data returned from Shopify' });
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(401).json({ error: 'Unauthorized: Invalid token or domain' });
  }
}
