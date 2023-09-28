import axios from "axios";
import React, { Suspense } from "react";
import { Await, Link, useLoaderData, useParams } from "react-router-dom";

const EmployeeDetails = () => {
  const { id } = useParams();
  const { result } = useLoaderData(id);

  return (
    <>
      <h2>Employee Details</h2>
      <Suspense fallback={<p>Loading...</p>}>
        <Await
          resolve={result}
          errorElement={<p>Error loading Employee details.</p>}
        >
          {(Employee) => (
            <div className="productContainer">
              <h2>{Employee.name}</h2>
              <p>{Employee.description}</p>
              <Link to="/employees">Back to Employess</Link>
            </div>
          )}
        </Await>
      </Suspense>
    </>
  );
};

export default EmployeeDetails;

export const EmployeeLoader = async ({params}) => {

  const result = axios
    .get(`http://localhost:5000/employees/${params.id}`)
    .then((res) => {
      return res.data.result;
    });
  return { result };
};