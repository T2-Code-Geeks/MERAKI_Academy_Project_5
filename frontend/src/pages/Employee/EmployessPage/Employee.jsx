import React, { Suspense } from "react";
import { Await,useLoaderData ,useNavigate} from "react-router-dom";
import "./Employee.css";
//!==================================== Employess packge ==========================================

const Employees = () => {
  //!=================================================

  const { result } = useLoaderData();
  console.log(result);
  const navigate = useNavigate();

  //!=================================================
  return (
    <>
    <div class="text-center pb-12">
            <h2 class="text-base font-bold text-indigo-600">
                We have the best Services In our App
            </h2>
            <h1 class="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-white">
                Check our awesome craftmen ...            
            </h1>
       
      <Suspense fallback={<p>Loading...</p>}>
        <Await
          resolve={result}
          errorElement={<p>Error loading Employee ...</p>}
>      
          {(result) => (
            <>
                {result?.map((Employee) => (
                  <div class="w-full bg-gray-800 lg:flex" >
                    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12 lg:flex">
                      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6"  key={Employee.id}>
                        <div class="w-full bg-gray-900 rounded-lg sahdow-lg p-12 flex flex-col justify-center items-center">
                          <div class="mb-8">
                            <img
                              class="object-center object-cover rounded-full h-36 w-36"
                              src={Employee.img}
                              alt="photo"
                            />
                          </div>
                          <div class="text-center">
                            <p class="text-xl text-white font-bold mb-2">
                              {Employee.firstname + " " + Employee.lastname}
                            </p>
                            <p class="text-base text-gray-400 font-normal">
                              {Employee.description}
                            </p>
                            <button
                              class="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                              onClick={() => {
                                navigate(`/employees/${Employee.id}`)
                              }}>
                              More Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                ))}
            </>
          )}
        </Await>
      </Suspense>
      </div>
    </>
  );
};
//!====================================== export function ==========================================
export default Employees;

{
  /* <div className="productContainer" key={Employee.id}>
                  <h2></h2>
                  <p></p>
                  <Link to={`/employees/${Employee.id}`}>View Details</Link>
                </div> */
}
