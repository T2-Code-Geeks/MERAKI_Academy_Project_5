import axios from 'axios';
import React, { Suspense } from 'react';
import { Await, Link, useLoaderData } from 'react-router-dom';
import "./Products.css"
const Products = () => {
  const { result } = useLoaderData();
console.log(result);
  return (
    <>
      <h2>Products</h2>
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={result} errorElement={<p>Error loading products.</p>}>
          {result => (
            <div>
              {result?.map(product => (
                <div className="productContainer" key={product.id}>
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  <Link to={`/products/${product.id}`}>View Details</Link>
                </div>
              ))}
            </div>
          )}
        </Await>
      </Suspense>
    </>
  );
};

export default Products;

export const productsLoader = async () => {

  const result = await axios.get("http://localhost:5000/products").then(res => {
      return res.data.result
  })
  return {result}
}
