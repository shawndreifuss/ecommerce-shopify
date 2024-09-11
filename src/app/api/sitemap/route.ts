import { getCollections, getPages, getProducts } from '@/lib/shopify';
import { validateEnvironmentVariables } from '@/lib/utils';
import { NextResponse } from 'next/server';

type Route = {
  url: string;
  lastModified: string;
};

// Define the base URL for the sitemap
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';

// Ensure dynamic generation of the sitemap
export const dynamic = 'force-dynamic';

// Handle the GET request for generating the sitemap
export async function GET() {
  try {
    // Validate the environment variables
    validateEnvironmentVariables();

    // Static routes
    const staticRoutes: Route[] = [
      { url: `${baseUrl}/`, lastModified: new Date().toISOString() }, // Homepage
      { url: `${baseUrl}/about`, lastModified: new Date().toISOString() }, // Example static route
    ];

    // Fetch collections from Shopify and map them to the sitemap
    const collectionsPromise = getCollections().then((collections) =>
      collections.map((collection) => ({
        url: `${baseUrl}${collection.path}`, // Adjust based on your collection URL structure
        lastModified: collection.updatedAt,
      }))
    );

    // Fetch individual products and map them to /product/${product.handle}
    const productDetailPromise = getProducts({}).then((products) =>
      products.map((product) => ({
        url: `${baseUrl}/product/${product.handle}`,  // Maps individual product pages
        lastModified: product.updatedAt,
      }))
    );

    // Fetch all products as a list under /products
    const productListPromise = Promise.resolve([
      {
        url: `${baseUrl}/products`,  // A single route for the product listing page
        lastModified: new Date().toISOString(),
      },
    ]);

    // Fetch pages from Shopify and map them to the sitemap
    const pagesPromise = getPages().then((pages) =>
      pages.map((page) => ({
        url: `${baseUrl}/${page.handle}`, // Adjust based on your page URL structure
        lastModified: page.updatedAt,
      }))
    );

    // Await all promises (collections, individual products, product listing, and pages)
    const fetchedRoutes = (await Promise.all([
      collectionsPromise,
      productDetailPromise,
      productListPromise, // Adding product list as a single route
      pagesPromise,
    ])).flat();

    // Combine static and dynamic routes
    const allRoutes = [...staticRoutes, ...fetchedRoutes];

    // Convert the routes to XML format
    const sitemapXml = generateSitemapXml(allRoutes);

    // Return the XML response with the appropriate headers
    return new NextResponse(sitemapXml, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}

// Helper function to generate the sitemap XML structure
function generateSitemapXml(routes: Route[]) {
  const urls = routes
    .map(
      (route) => `
    <url>
      <loc>${route.url}</loc>
      <lastmod>${route.lastModified}</lastmod>
    </url>
  `
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls}
  </urlset>`;
}
