import axios from "axios"

export const categoriesLoader = async () => {
    const result = axios.get("https://geeks-app.onrender.com/products/category")
        .then(res => {

            return res.data.result
        })
    return { result }
}