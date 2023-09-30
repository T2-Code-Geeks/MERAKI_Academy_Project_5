import axios from 'axios';
import React, { Suspense } from 'react';
import { Await, Link, useLoaderData } from 'react-router-dom';
import "./Employee.css"
const Employees = () => {
  const { result } = useLoaderData();
  return (
    <>
      <h2>Employees</h2>
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={result} errorElement={<p>Error loading Employee ...</p>}>
          {result => (
            <div>
              {result?.map(Employee => (
                  <div className="productContainer" key={ Employee.id }>
                  <h2>{Employee.firstname+" "+Employee.lastname}</h2>
                  <p>{Employee.description}</p>
                  <Link to={`/employees/${Employee.id}`}>View Details</Link>
                </div>
              ))}
            </div>
          )}
        </Await>
      </Suspense>
    </>
  );
};

export default Employees;

export const EmployeesLoader = async () => {

  const result = await axios.get("http://localhost:5000/employees").then(res => {
      return res.data.result
  })
  return {result}
}