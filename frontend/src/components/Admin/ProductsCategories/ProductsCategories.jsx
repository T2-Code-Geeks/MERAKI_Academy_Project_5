import React, { Suspense,useState } from 'react'
import { Await, useLoaderData } from 'react-router'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addCategory ,deleteProductById, updateProductById} from '../../../service/redux/reducers/productSlice';

const ProductsCategories = () => {
  const { result } = useLoaderData();
  const dispatch=useDispatch()
  const [addCategoryState, setAddCategoryState] = useState({})

  const addNewCategory = async (e) => {
    e.preventDefault();
    try {
    
      const result = await axios.post(
        "http://localhost:5000/products/category",addCategoryState)
      console.log(result);
      if (result.data.success) {
      
        dispatch(addCategory(result.data.result))
      }
    } catch (error) {
      if (!error.response.data.success) {
 console.log(error.response.data);
      }
    }
  };
  return (
    <div>  
            <form onSubmit={addNewCategory}>
        <br />
        <input
          type="text"
          placeholder="Product name "
          onChange={(e) => setAddCategoryState({...addCategoryState,name:e.target.value})}
        />
        <br />
        <input
          type="text"
          placeholder="Product name "
          onChange={(e) => setAddCategoryState({...addCategoryState,description:e.target.value})}
        />
        <br />
        <button>Add category</button>
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