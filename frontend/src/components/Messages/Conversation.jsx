import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const Conversation = ({conversations}) => {
    const [user,setUser]=useState([])
    const { token,userId,employeeId } = useSelector((state) => {
        return {
          token:state.auth.token,
          userId:state.auth.userId,
          token:state.employee.token,
          employeeId: state.employee.employeeId
        };
      });

const friendId=conversations.members.find(m=>m!==parseInt(userId)||parseInt(employeeId))
    // ! Problem if userId===EmployeeId
  const getUser=async()=>{
 

  if (userId) {
    try {
    const res = await axios.get(`http://localhost:5000/employees/${friendId}`)
  
   
  setUser(res.data.result)
  } catch (error) {
    console.log(error);
  
  }
  } 
  if(employeeId) {
    
    try {
      const res =await axios.get(`http://localhost:5000/users/${friendId}`)
    
      setUser(res.data.result)
  
    } catch (error) {
      console.log(error);
    
    }
  
  
  }
  
  }
  
  useEffect(() => {
    
    getUser()
  }, [conversations])
  
  return (
    <div className="flex flex-col space-y-1 mt-4 -mx-2 h-12 overflow-y-auto" >
    <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2" >
      <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
        {user?.firstname?.charAt(0).toUpperCase()}
      </div>
      <div className="ml-2 text-sm font-semibold">
        {user?.firstname}
        </div>
    </button>

  </div>
  )
}

export default Conversation