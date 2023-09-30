import React, { Suspense } from 'react'
import { Await, useLoaderData } from 'react-router'
import { Link } from 'react-router-dom'

const ProductsCategories = () => {
  const { result } = useLoaderData();

  return (
    <div>    
        <Suspense fallback={<p>Loading...</p>}>
    <Await resolve={result} errorElement={<p>Error loading products.</p>}>
      {result => (
        <div>
          {result?.map(product => (
            <div className="productContainer" key={product.id}>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <button onClick={()=>{
                // deleteProduct(product.id)
              }}>delete Products</button>
              <Link to={`/products/${product.id}`}>View Details</Link>
            </div>
          ))}
        </div>
      )}
    </Await>
  </Suspense></div>
  )
}

export default ProductsCategories