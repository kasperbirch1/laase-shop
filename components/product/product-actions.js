import React, { useState } from 'react'

import {
  ProductCounter,
  ProductAdd,
  ProductWaitlist,
} from '@components/product'

const ProductActions = ({ activeVariant, klaviyoAccountID }) => {
  // set default quantity
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="product--actions">
      {activeVariant?.inStock ? (
        <>
          <ProductCounter
            id={activeVariant.id}
            max={10}
            onUpdate={setQuantity}
          />
          <ProductAdd
            productID={activeVariant.id}
            quantity={quantity}
            className="btn is-primary is-large is-block"
          >
            Tilføj til kurv
          </ProductAdd>
        </>
      ) : (
        <>
          {klaviyoAccountID ? (
            <ProductWaitlist
              variant={activeVariant.id}
              klaviyo={klaviyoAccountID}
            />
          ) : (
            <div className="btn is-large is-disabled is-block">Udsolgt</div>
          )}
        </>
      )}
    </div>
  )
}

export default ProductActions
