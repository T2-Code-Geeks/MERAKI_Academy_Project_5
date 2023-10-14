import React, { useState } from "react";
import EmployeeLogin from "../../components/Login/EmployeeLogin";
import UserLogin from "../../components/Login/UserLogin";

const LoginPage = () => {


    const [selectedAccountType, setSelectedAccountType] = useState('client');

    const handleAccountTypeChange = (type) => {
      setSelectedAccountType(type);
    };

  return (
    <section className="bg-white dark:bg-gray-900 ">
      <div className="flex justify-center min-h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-2/5"
          style={{
            backgroundImage:
              "url('https://www.deanbradshaw.com/assets/uploads/shoots/craftsmen/_shootThumbnailLarge/deanbradshaw-thecarpenter-1.jpg')",
          }}
        ></div>

        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
          <div className="w-full">
            <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
              Get your free account now.
            </h1>

            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Let’s get you all set up so you can verify your personal account
              and begin setting up your profile.
            </p>

            <div className="mt-6">
        <h1 className="text-gray-500 dark:text-gray-300">Select type of account</h1>
        <div className="mt-3 md:flex md:items-center md:-mx-2">
          <button
            onClick={() => handleAccountTypeChange('client')}
            className={`flex justify-center w-full px-6 py-3 text-white rounded-lg md:w-auto md:mx-2 focus:outline-none ${selectedAccountType === 'client' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="mx-2">
              Client
            </span>
          </button>

          <button
            onClick={() => handleAccountTypeChange('worker')}
            className={`flex justify-center w-full px-6 py-3 mt-4 rounded-lg md:mt-0 md:w-auto md:mx-2 focus:outline-none ${selectedAccountType === 'worker' ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-700'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="mx-2">
              Worker
            </span>
          </button>
        </div>
      </div>
      {selectedAccountType==="client"?<UserLogin/>:<EmployeeLogin/>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
