'use client';

import clsx from 'clsx';
import { addItem } from '@/components/cart/actions';
import { useProduct } from '@/components/product/product-context';
import { Product, ProductVariant } from '@/types/shopify';
import { useFormState } from 'react-dom';
import { useCart } from './cart-context';
import { Button } from '../ui/button';
import Link from 'next/link';

function SubmitButton({
  availableForSale,
  selectedVariantId, 
  productHandle
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
  productHandle: string | null
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

  console.log(selectedVariantId);
  if (!selectedVariantId) {
    return (
      <Link href={`/product/${productHandle}`}>
        <Button
        
        type="button"
        className="inline-flex items-center rounded-lg  px-5 py-2.5 "
      >
        <svg
          className="-ms-2 me-2 h-5 w-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
          />
        </svg>
        Add to cart
      </Button>
      </Link>
    );
  }

  return (
    <Button
    type='submit'
    className="inline-flex items-center rounded-lg  px-5 py-2.5 "
  >
    <svg
      className="-ms-2 me-2 h-5 w-5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
      />
    </svg>
    Add to cart
  </Button>
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
  const productHandle = product.handle


  return (
    <form
      action={async () => {
        addCartItem(finalVariant, product);
        await actionWithVariant();
      }}
    >
      <SubmitButton availableForSale={availableForSale} selectedVariantId={selectedVariantId} productHandle={productHandle}/>
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
