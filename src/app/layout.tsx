import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { getCart } from '@/lib/shopify';
import { ensureStartsWith } from '@/lib/utils';
import { cookies } from 'next/headers';
import { Toaster } from 'sonner';
import { WelcomeToast } from "@/components/welcome-toast";
import { CartProvider } from "@/components/cart/cart-context";

const inter = Inter({ subsets: ["greek"] });

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';
const twitterCreator = TWITTER_CREATOR ? ensureStartsWith(TWITTER_CREATOR, '@') : undefined;
const twitterSite = TWITTER_SITE ? ensureStartsWith(TWITTER_SITE, 'https://') : undefined;
export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  },
  ...(twitterCreator &&
    twitterSite && {
      twitter: {
        card: 'summary_large_image',
        creator: twitterCreator,
        site: twitterSite
      }
    })
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cartId = cookies().get('cartId')?.value;
  const cart = getCart(cartId);
  return (
    <html lang="en" suppressHydrationWarning>
      <script src="//code.tidio.co/dbvcf4vch8wwp2153gitsg2zttd6hfgg.js" async></script>
      <body className={inter.className}>
      <CartProvider cartPromise={cart}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster closeButton />
        </ThemeProvider>
        </CartProvider>
      </body>
    </html>
  );
}
