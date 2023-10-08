import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setComment,
  deletecomment,
  addNewComment,
} from "../../../service/redux/reducers/employeeSlice";
import { useParams, Link } from "react-router-dom";

  //!=================================== show detailes employee ... ====================================================
const EmployeeDetails = () => {
  const [comment, setcomment] = useState("");
  const [massege, setMassege] = useState("");
  const [employee, setEmployee] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userId, comments, token } = useSelector((state) => {
    return {
      userId: state.auth.userId,
      comments: state.employee.comments,
      token: state.employee.token,
    };
  });

  //!======================================================================

  useEffect(() => {
    allCommentsUser()
  }, [])

 //! ======================================== show comments =================================================

  const allCommentsUser = async () => {
    try {
      const results = await axios.get(`http://localhost:5000/employees/allcomment/${id}`)
      console.log(results)
      if (results) {
        dispatch(setComment(results.data.result))
      }
    } catch (error) {
      if (error.response.data.success) {
        setMassege(error.response.data.massege);
      }
    }
  };
 
 //! ======================================== add comment ====================================================

  const addFeadBackFromUser = async () => {
    const commentss = {
      employee_id: id,
      user_id: userId,
      comment,
    };
    try {
      const results = await axios.post(
        "http://localhost:5000/employees/feadback/user",
        commentss,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(results);
      if (results.data.success) {
        dispatch(addNewComment(results.data.result[0]));
      }
    } catch (error) {
      console.log(error);
      if (error) {
        setMassege(error.response);
      }
    }
  };

  //! ======================================== delete comment ====================================================
  
  const DeleteCommentUser = async (id) => {
    try {
      const result = await axios.delete(
        `http://localhost:5000/employees/comment/${id}`
      );
      dispatch(deletecomment(id));
    } catch (error) {
      if (error.response.data.success) {
        setMassege(error.response.data.massege);
      }
    }
  };

  //! ======================================================================

  useEffect(() => {
    getEmployeeDetails()
  }, []);

   //!======================================================================

  const getEmployeeDetails = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/employees/${id}`);
      if (result.data) {
        setEmployee(result.data.result);
      } else {
        setMassege("NOt found details");
      }
    } catch (error) {
      if (error.response.data.success) {
        setMassege(error.response.data.massege);
      }
    }
  };

  //!========================================================================

  return (
    <>
      <h2>Employee Details</h2>

      <div className="productContainer">
        <h2>{employee.firstname}</h2>
        <p>{employee.description}</p>
        <input
          type="text"
          placeholder="comment"
          onChange={(e) => {
            setcomment(e.target.value);
          }}
        />
        {<h2> {comments.length}: comments</h2>}
        {comments && comments.map((comment, id) => {
          return (
            <>
              <p>{comments[id].comment}</p>

              <button key={comments[id].id} onClick={() => { DeleteCommentUser(comments[id].id) }}>Delete Comment</button>
            </>
          )
        })}
        <button on onClick={(e) => addFeadBackFromUser()}>
          Addcomment
        </button>
        <p>{massege}</p>
        <Link to="/employees">Back to Employess</Link>
      </div>
    </>
  );
};

//! ======================================== export function  ====================================================

export default EmployeeDetails;
