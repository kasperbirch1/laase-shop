import React from 'react'

import { centsToPrice } from '@lib/helpers'

const ProductPrice = ({ price, comparePrice }) => {
  return (
    <div className="price">
      {!!comparePrice && (
        <span className="price--discount">
          {Math.ceil(((comparePrice - price) / comparePrice) * 100)}% Rabat
        </span>
      )}

      <span className="price--current">{`${centsToPrice(price)} kr.`}</span>
    </div>
  )
}

export default ProductPrice
