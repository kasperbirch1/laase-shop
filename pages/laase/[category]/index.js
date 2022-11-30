import Link from 'next/link'
import { useRouter } from 'next/router'

const Category = ({ data }) => {
  const router = useRouter()
  const { category } = router.query

  return (
    <>
      <p>Category: {category}</p>
      {data.products.map((product) => (
        <Link key={product.id} href={`/laase/${category}/${product.id}`}>
          <a>{product.title}</a>
        </Link>
      ))}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}

export async function getServerSideProps(context) {
  const { category } = context.query

  const res = await fetch(`https://dummyjson.com/products/category/${category}`)
  const data = await res.json()

  return {
    props: {
      data: data,
    },
  }
}

export default Category
