import axios from "axios"

export const productsLoader = async () => { 
    const result = await axios.get("http://localhost:5000/products")
    .then(res => {
      
        return res.data.result
    })
    return {result}
  }

  export const categoriesLoader = async () => {


    const result =  axios.get("http://localhost:5000/products/category")
    .then(res => {
      
        return res.data.result
    })
    return {result}
  }

