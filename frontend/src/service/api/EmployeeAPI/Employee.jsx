import axios from "axios";

//!============================ Employees Loader ... ==================================

export const EmployeesLoader = async () => {

    const result = await axios.get("https://geeks-app.onrender.com/employees").then(res => {
        return res.data.result
        
    })
   
    return {result}
    
  }

