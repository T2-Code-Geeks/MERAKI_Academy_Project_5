import axios from "axios";


export const EmployeesLoader = async () => {

    const result = axios.get("/empolyees").then(res => {
        return res.data.result
    })
}