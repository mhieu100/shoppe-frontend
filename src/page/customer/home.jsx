import React from 'react'
import Sale from '../../components/client/sale'
import SpecialOffers from '../../components/client/special.offers'
import YearProduct from '../../components/client/year.product'
import BestSellers from '../../components/client/best.sellers'


const HomePage = () => {
  return (
    <div className="w-full mx-auto">
      <div className="max-w-container mx-auto px-4">
        <Sale />
        <BestSellers />
        <YearProduct />
        <SpecialOffers />
      </div>
    </div>
  )
}

export default HomePage