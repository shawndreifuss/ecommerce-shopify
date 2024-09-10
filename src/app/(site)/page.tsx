import BestSellers from '@/components/best-sellers'
import Hero from '@/components/hero'
import InspoGallery from '@/components/inspo-gallery'
import NewsletterSubscription from '@/components/newsletter'
import ShopByRoom from '@/components/shop-by-room'
import React from 'react'

const LayoutPage = async () => {

  return (
    <div>
        <Hero />
        <ShopByRoom />
        <BestSellers />
        <NewsletterSubscription />
        <InspoGallery />
 
    </div>
  )
}

export default LayoutPage