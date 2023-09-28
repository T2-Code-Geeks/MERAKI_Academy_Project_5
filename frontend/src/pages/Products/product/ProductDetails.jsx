import axios from "axios";
import React, { Suspense } from "react";
import { Await, Link, useLoaderData, useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const { result } = useLoaderData();
  console.log("result",result);
  return (
    <>
      <h2>Product Details</h2>
      <Suspense fallback={<p>Loading...</p>}>
        <Await
          resolve={result}
          errorElement={<p>Error loading product details.</p>}
        >
          {result => (
            <div className="productContainer">
              <h2>{result.name}</h2>
              <p>{result.description}</p>
              <Link to="/products">Back to Products</Link>
            </div>
          )}
        </Await>
      </Suspense>
    </>
  );
};

export default ProductDetails;

export const productLoader = async ({params}) => {

  const result = axios
    .get(`http://localhost:5000/products/${params.id}`)
    .then((res) => {
      console.log("res",res.data.result);
      return res.data.result;
    });
  return { result };
};
