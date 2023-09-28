export const productsLoader = async () => {

    const result =  axios.get("http://localhost:5000/products")
    .then(res => {
      
        return res.data.result
    })
    return {result}
  }