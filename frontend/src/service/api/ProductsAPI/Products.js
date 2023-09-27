import axios from "axios";


export const productsLoader = async () => {

    const result = axios.get("/products").then(res => {
        return res.data.result
    }).catch(err => {

    })
}