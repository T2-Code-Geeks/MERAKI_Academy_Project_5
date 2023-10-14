import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileEmployee.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProfileById,
  setEmployee,
  setcategory,
} from "../../../service/redux/reducers/employeeSlice";
import { Avatar, Typography, Button } from "@material-tailwind/react";
import {
  MapPinIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
//!===================================== Profile Employee ... =======================================================

const ProfileEmployee = () => {
  const { employee, employeeId,category } = useSelector((state) => {
    return {
      employee: state.employee.employee,
      employeeId: state.employee.employeeId,
      category: state.employee.category,
    };
  });
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [description, setDescription] = useState("");
  const [work_hours, setWork_hours] = useState("");
  const [country, setCountry] = useState("");
  const [img, setImg] = useState("");
  const [age, setAge] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [updateBox, setUpdateBox] = useState(false);
  const imageInputRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //!========================================================

  useEffect(() => {
    profile();
    Category();
  }, []);
  //!=========================================================

  const Category = async () => {
    try {
      const result = await axios.get(
        `http://localhost:5000/employees/categoryes/all`
      );

      if (result.data) {
        dispatch(setcategory(result.data.result));
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error);
      }
      console.log(error);
    }
  };
  //!========================================================

  const profile = async () => {
    try {
      const result = await axios.get(
        `http://localhost:5000/employees/${employeeId}`
      );
      if (result.data) {
        dispatch(setEmployee(result.data.result));
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error);
      }
      console.log(error);
    }
  };

  //!========================================================
  const clickInput = () => {
    imageInputRef.current.click();
  };

  const addPicture = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "profilePicture");
    data.append("cloud_name", "dbkfrtdjm");
    fetch("https://api.cloudinary.com/v1_1/dbkfrtdjm/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then(async (data) => {
        setImg(data.url);
      })
      .catch((err) => console.log(err));
  };

  //!=========================================================
  const updateProfile = async () => {
    try {
      const result = await axios.put(
        `http://localhost:5000/employees/${employeeId}`,
        {
          firstName: firstname,
          lastName: lastname,
          description,
          work_hours,
          country,
          category_id: selectedCategory,
          img,
          age,
        }
      );
      if (result.data) {
        dispatch(
          updateProfileById({
            id: employee.id,
            firstname: firstname || employee.firstname,
            lastname: lastname || employee.lastname,
            description: description || employee.description,
            work_hours: work_hours || employee.work_hours,
            country: country || employee.country,
            category_id: selectedCategory || employee.category_id,
            img: img || employee.img,
            age: age || employee.age,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  //!========================================================

  return (
    <>
      <section className="relative block h-[50vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full  bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
      </section>
      <section className="relative bg-blue-gray-50/50 py-16 px-4">
        <div className="container mx-auto">
          <div className="relative mb-6 -mt-64 flex w-full min-w-0 flex-col break-words rounded-3xl bg-white shadow-xl shadow-gray-500/5">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="flex w-full justify-center px-4 lg:order-2 lg:w-3/12">
                  <div className="relative">
                    <div className="-mt-20 w-70">
                      <input
                        type="file"
                        ref={imageInputRef}
                        hidden
                        onChange={(event) => {
                          addPicture(event.target.files[0]);
                        }}
                      />
                      <Avatar
                        src={employee.img}
                        onClick={clickInput}
                        alt="Profile picture"
                        variant="circular"
                        className="h-full w-full shadow-xl"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-10 flex w-full justify-center px-4 lg:order-3 lg:mt-0 lg:w-4/12 lg:justify-end lg:self-center">
                  <a href="#update">
                    <Button
                      className="bg-blue-400 mt-5"
                      onClick={() => {
                        setUpdateBox(true);
                      }}
                    >
                      Update
                    </Button>
                  </a>
                </div>
                <div className="w-full px-4 lg:order-1 lg:w-4/12">
                  <div className="flex justify-center py-4 pt-8 lg:pt-4"></div>
                </div>
              </div>
              <div className="my-8 text-center">
                <Typography variant="h2" color="blue-gray" className="mb-2">
                  {employee.firstname} {employee.lastname}
                </Typography>
                <div className="mb-10 flex items-center justify-center gap-2">
                  <MapPinIcon className="-mt-px h-4 w-4 text-blue-gray-700" />
                  <Typography className="font-medium text-blue-gray-700">
                    {employee.country}
                  </Typography>
                </div>
                <div className="mb-5 flex items-center justify-center gap-2">
                  <Typography className="font-medium text-blue-gray-700">
                    open to work in : {employee.work_hours}
                  </Typography>
                </div>
                <div className="mb-2 flex items-center justify-center gap-2">
                  <Typography className="font-medium text-blue-gray-700">
                    My age : {employee.age} years
                  </Typography>
                </div>
                <div className="mb-2 flex items-center justify-center gap-2">
                  <BuildingLibraryIcon className="-mt-px h-4 w-4 text-blue-gray-700" />
                  <Typography className="font-medium text-blue-gray-700">
                    Member Of Geeks App
                  </Typography>
                </div>
                <div className="mb-2 flex items-center justify-center gap-2">
                  <BuildingLibraryIcon className="-mt-px h-4 w-4 text-blue-gray-700" />
                  <Typography className="font-medium text-blue-gray-700">
                    {category_id}
                  </Typography>
                </div>
              </div>

              <div className="mb-10 border-t border-blue-gray-50 py-6 text-center">
                <div className="mt-2 flex flex-wrap justify-center">
                  <div className="flex w-full flex-col items-center px-4 lg:w-9/12">
                    <Typography className="mb-8 font-normal text-blue-gray-500">
                      {employee.description}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="update"></div>
        {updateBox && (
          <form>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label className="text-gray-700 dark:text-gray-500" for="username">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </div>

              <div>
                <label className="text-gray-700 dark:text-gray-500" for="LastName">
                  Last Name
                </label>
                <input
                  id="LastName"
                  type="email"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>
              <div>
                <label
                  className="text-gray-700 dark:text-gray-500"
                  for="Discription"
                >
                  Discription
                </label>
                <input
                  id="Discription"
                  type="email"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
              <div>
                <label className="text-gray-700 dark:text-gray-500" for="Age">
                  Age
                </label>
                <input
                  id="Age"
                  type="number"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                />
              </div>
              <div>
                <label className="text-gray-700 dark:text-gray-500" for="Country">
                  Country
                </label>
                <input
                  id="Country"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  onChange={(e) => {
                    setCountry(e.target.value);
                  }}
                />
              </div>

              <div>
                <label
                  className="text-gray-700 dark:text-gray-500"
                  for="WorksHours"
                >
                  Works Hours
                </label>
                <input
                  id="WorksHours"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  onChange={(e) => {
                    setWork_hours(e.target.value);
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="text-gray-700 dark:text-gray-500"
                >
                  Crafts Category
                </label>
                <select
                  id="category"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  value={selectedCategory}
                >
                  <option value="">Select a category</option>
                  {category.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                className="px-8 py-4  leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                onClick={() => {
                  navigate("/");
                }}
              >
                Back To Home
              </button>
              <button
                className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                onClick={() => {
                  updateProfile();
                  setUpdateBox(false);
                }}
              >
                Save
              </button>
            </div>
          </form>
        )}
      </section>
    </>
  );
};

//!============================================= Export function ... ===================================================

export default ProfileEmployee;
