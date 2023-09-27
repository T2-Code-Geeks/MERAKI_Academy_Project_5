import axios from 'axios';
import React, { Suspense } from 'react';
import { Await, Link, useLoaderData, useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams(); 
  const { result } = useLoaderData(id); 

  return (
    <>
      <h2>Product Details</h2>
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={result} errorElement={<p>Error loading product details.</p>}>
          {product => (
            <div className="productContainer">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <Link to="/products">Back to Products</Link>
            </div>
          )}
        </Await>
      </Suspense>
    </>
  );
};

export default ProductDetails;

export const productLoader = async (id) => {
console.log(id);
    try {
    const response = await axios.get(`http://localhost:5000/products/${id}`);
    const product = response.data.result;
    return { result: product };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
