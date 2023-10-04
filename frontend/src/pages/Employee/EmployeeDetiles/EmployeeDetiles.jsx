import axios from "axios";
import React, { Suspense, useState } from "react";
import { useDispatch ,useSelector} from "react-redux";
import { Await, Link, useLoaderData, useParams } from "react-router-dom";
import {
  setComment,
  addComment,
} from "../../../service/redux/reducers/employeeSlice";
const EmployeeDetails = () => {
  const [comment, setcomment] = useState("");
  const { id } = useParams();
  const { result } = useLoaderData(id);
  const dispatch = useDispatch;
  const[massege,setMassege]=useState("")

  const { userId, employeeId ,comments } = useSelector((state) => {
    return {
      userId:state.auth.userId,
      employeeId: state.employee.employeeId,
      comments:state.employee.comments
    };
  });
  
  const getFeadBackFromUser = async () => {
    try {
      const comment = {
        employee_id:employeeId,
        user_id:userId,
        comment,
      };
      const results = await axios.post(
        "http://localhost:5000/employees/feadback/user",
        comment
      );
      if (results.data) {
        dispatch(setComment({ comment: comment }));
      }
    } catch (error) {
      if (!error.response.data.success) {
        setMassege(error.response.data.message);
      }
    }

    return (
      <>
        <h2>Employee Details</h2>
        <Suspense fallback={<p>Loading...</p>}>
          <Await>
            resolve={result}
            errorElement={<p>Error loading Employee details.</p>}
            {(Employee) => (
              <div className="productContainer">
                <h2>{Employee.name}</h2>
                <p>{Employee.description}</p>
                <input
                  type="text"
                  placeholder="comment"
                  onChange={(e) => {
                    setcomment(e.target.value);
                  }}
                />
                {comments&& comments.map((comment)=>{
                 return(
                  <>
                  <p>{comment}</p>
                  <button onClick={(e)=>{}}>Delete Comment</button>
                  
                  </>
                 )


                })}
                <button on onClick={(e) => {getFeadBackFromUser({employeeId,userId,comment})}}>Addcomment</button>
                <p>{massege}</p>
                <Link to="/employees">Back to Employess</Link>
              </div>
            )}
          </Await>
        </Suspense>
      </>
    );
  };
};
export default EmployeeDetails;

export const EmployeeLoader = async ({ params }) => {
  const result = axios
    .get(`http://localhost:5000/employees/${params.id}`)
    .then((res) => {
      return res.data.result;
    });
  return { result };
};
