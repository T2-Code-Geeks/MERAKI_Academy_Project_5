import axios from "axios";
export const EmployeesLoader = async () => {

    const result = await axios.get("http://localhost:5000/employees").then(res => {
        return res.data.result
        
    })
   
    return {result}
    
  }

