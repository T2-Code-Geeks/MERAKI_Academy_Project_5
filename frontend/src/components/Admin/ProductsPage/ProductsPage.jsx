import axios from 'axios';
import React, { Suspense, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Await, useLoaderData } from 'react-router';
import { Link } from 'react-router-dom';
import { addProduct ,deleteProductById, updateProductById} from '../../../service/redux/reducers/productSlice';

const ProductsPage = () => {
  const { result } = useLoaderData();
  const [addProducts, setAddProducts] = useState({})
const dispatch=useDispatch()

  const addNewProduct = async (e) => {
    e.preventDefault();
    try {
    
      const result = await axios.post(
        "http://localhost:5000/products/",addProducts)
      console.log(result);
      if (result.data.success) {
      
        dispatch(addProduct(result.data.result))
      }
    } catch (error) {
      if (!error.response.data.success) {
 console.log(error.response.data);
      }
    }
  };

  return (
    <>
      <h2>Products</h2>
      <form onSubmit={addNewProduct}>
        <br />
        <input
          type="text"
          placeholder="Product name "
          onChange={(e) => setAddProducts({...addProducts,name:e.target.value})}
        />
        <br />
        <textarea
          placeholder="description"
          onChange={(e) => setAddProducts({...addProducts,description:e.target.value})}
        ></textarea>
        <br />
        <input
          type="text"
          placeholder="Product name "
          onChange={(e) => setAddProducts({...addProducts,img:e.target.value})}
        />
        <br />
        <input
          type="number"
          placeholder="Product name "
          onChange={(e) => setAddProducts({...addProducts,inventory_id:e.target.value})}
        />
        <br />
        <input
          type="number"
          placeholder="Product name "
          onChange={(e) => setAddProducts({...addProducts,category_id:e.target.value})}
        />
        <br />
        <button>Add Products</button>
      </form>
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={result} errorElement={<p>Error loading products.</p>}>
          {result => (
            <div>
              {result?.map(product => (
                <div className="productContainer" key={product.id}>
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  <button onClick={()=>{
                    deleteProduct(product.id)
                  }}>delete Products</button>
                  <Link to={`/products/${product.id}`}>View Details</Link>
                </div>
              ))}
            </div>
          )}
        </Await>
      </Suspense>
    </>
  )
}

export default ProductsPage