import React, { useEffect, useState } from 'react'
// import { Combobox } from '@headlessui/react'
import { getSanityClient } from '@lib/sanity'
import { allProducts } from 'data/queries'
import Link from 'next/link'

const Search = () => {
  const [products, setProducts] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    const fetchAllProducts = async () => {
      const product = await getSanityClient().fetch(allProducts)
      setProducts(product)
    }
    fetchAllProducts()
  }, [])

  return (
    <div className="relative ">
      <label htmlFor="search" className="sr-only">
        Søg efter produkt"
      </label>
      <input
        className="rounded-xl p-10 text-black"
        placeholder="Søg efter produkt"
        onChange={(e) => setQuery(e.target.value)}
      />
      {query !== '' && products && (
        <div className="absolute z-6 mt-5 grid gap-5 rounded-xl bg-white text-5 shadow">
          {products
            .filter((product) => {
              return product.title.toLowerCase().includes(query.toLowerCase())
            })
            .map((product, index) => (
              <Link
                key={index}
                href={`/laase/${
                  product.slug +
                  (product.surfaceOption ? `?variant=${activeVariant.id}` : '')
                }`}
                scroll={false}
              >
                <a className="cursor-pointer whitespace-nowrap p-10 text-10	text-gray hover:text-black md:text-20 ">
                  {product.title}
                </a>
              </Link>
            ))}
        </div>
      )}
    </div>
  )

  const filteredProducts =
    query === ''
      ? products
      : products.filter((product) => {
          return product.title.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <Combobox value={products} onChange={setProducts}>
      <Combobox.Input onChange={(event) => setQuery(event.target.value)} />
      <Combobox.Options>
        {filteredProducts.map((product) => (
          <Combobox.Option key={product} value={product.title}>
            {({ active, selected }) => (
              <li
                className={`${
                  active ? 'bg-blue-500 text-gray' : 'bg-white text-black'
                }`}
              >
                {selected && '🚀'}
                {product.title}
              </li>
            )}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  )
}

export default Search
