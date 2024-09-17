'use client';

import clsx from 'clsx';
import { addItem, redirectToCheckout } from '@/components/cart/actions';
import { useProduct } from '@/components/product/product-context';
import { Product, ProductVariant } from '@/types/shopify';
import { useFormState } from 'react-dom';
import { useCart } from './cart-context';
import { Button } from '../ui/button';
import Link from 'next/link';

function SubmitButton({
  availableForSale,
  selectedVariantId, 
  productHandle,
  handleBuyNowClick
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
  productHandle: string | null;
  handleBuyNowClick: () => void;
}) {
  const buttonClasses =
    'relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white';
  const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60';

  if (!availableForSale) {
    return (
      <button disabled className={clsx(buttonClasses, disabledClasses)}>
        Out Of Stock
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <Link href={`/product/${productHandle}`} className="flex gap-4">
        <Button type="button" className="">
          Add to cart
        </Button>
      </Link>
    );
  }

  return (
    <div className="flex gap-4">
      <Button type="submit" className="inline-flex items-center rounded-lg px-5 py-2.5">
        Add to cart
      </Button>
    </div>
  );
}


export function AddToCart({ product }: { product: Product }) {
  const { variants, availableForSale } = product;
  const { addCartItem } = useCart();
  const { state } = useProduct();
  const [message, formAction] = useFormState(addItem, null);

  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every((option) => option.value === state[option.name.toLowerCase()])
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const actionWithVariant = formAction.bind(null, selectedVariantId);
  const finalVariant = variants.find((variant) => variant.id === selectedVariantId)!;
  const productHandle = product.handle;

  // Function to handle Buy Now: Adds item to cart and redirects to checkout
  const handleBuyNowClick = async () => {
    await addCartItem(finalVariant, product); // Add the item to the cart
    redirectToCheckout(); // Redirect to checkout after item is added
  };

  return (
    <form
      action={async () => {
        await addCartItem(finalVariant, product); // Add the item to the cart
        await actionWithVariant(); // Handle form submission if necessary
      }}
    >
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
        productHandle={productHandle}
        handleBuyNowClick={handleBuyNowClick} // Pass the Buy Now handler
      />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
