import { useRouter } from 'next/router'

const Product = ({ data }) => {
  const router = useRouter()
  const { category, product } = router.query

  return (
    <>
      <p>
        Category: {category} Product: {product}
      </p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}

export async function getServerSideProps(context) {
  const { product } = context.query

  const res = await fetch(`https://dummyjson.com/products/${product}`)
  const data = await res.json()

  return {
    props: {
      data: data,
    },
  }
}

export default Product
