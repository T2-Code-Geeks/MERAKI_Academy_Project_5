import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileEmployee";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
    updateProfileById,
    setEmployee,
} from "../../../service/redux/reducers/employeeSlice";
//!===================================== Profile Employee ... =======================================================

const ProfileEmployee = () => {
    const { employee, employeeId } = useSelector((state) => {
        return {
            employee: state.employee.employee,
            employeeId: state.employee.employeeId,
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
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //!========================================================

    useEffect(() => {
        profile();
    }, []);

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
                    category_id,
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
                        category_id: category_id || employee.category_id,
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
        <main className="profile-page">
            <section className="relative block h-500-px">
                <div
                    className="absolute top-0 w-full h-full bg-center bg-cover"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
                    }}
                >
                    <span
                        id="blackOverlay"
                        className="w-full h-full absolute opacity-50 bg-black"
                    ></span>
                </div>
                <div
                    className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
                    style={{ transform: "translateZ(0px)" }}
                >
                    <svg
                        className="absolute bottom-0 overflow-hidden"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                        version="1.1"
                        viewBox="0 0 2560 100"
                        x="0"
                        y="0"
                    >
                        <polygon
                            className="text-blueGray-200 fill-current"
                            points="2560 0 2560 100 0 100"
                        ></polygon>
                    </svg>
                </div>
            </section>
            <section className="relative py-16 bg-blueGray-200">
                <div className="container mx-auto px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                        <div className="px-6">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                    <div className="relative">
                                        <img
                                            alt="..."
                                            src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
                                            className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                                        />
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                    <div className="py-6 px-3 mt-32 sm:mt-0">
                                        <button
                                            className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                        >
                                            Connect
                                        </button>
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                        <div className="mr-4 p-3 text-center">
                                            <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                                22
                                            </span>
                                            <span className="text-sm text-blueGray-400">
                                                Friends
                                            </span>
                                        </div>
                                        <div className="mr-4 p-3 text-center">
                                            <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                                10
                                            </span>
                                            <span className="text-sm text-blueGray-400">
                                                Photos
                                            </span>
                                        </div>
                                        <div className="lg:mr-4 p-3 text-center">
                                            <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                                89
                                            </span>
                                            <span className="text-sm text-blueGray-400">
                                                Comments
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mt-12">
                                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                    Jenna Stones
                                </h3>
                                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                    Los Angeles, California
                                </div>
                                <div className="mb-2 text-blueGray-600 mt-10">
                                    <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                                    Solution Manager - Creative Tim Officer
                                </div>
                                <div className="mb-2 text-blueGray-600">
                                    <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                                    University of Computer Science
                                </div>
                            </div>
                            <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full lg:w-9/12 px-4">
                                        <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                            An artist of considerable range,
                                            Jenna the name taken by
                                            Melbourne-raised, Brooklyn-based
                                            Nick Murphy writes, performs and
                                            records all of his own music, giving
                                            it a warm, intimate feel with a
                                            solid groove structure. An artist of
                                            considerable range.
                                        </p>
                                        <a
                                            href="#pablo"
                                            className="font-normal text-pink-500"
                                        >
                                            Show more
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="relative bg-blueGray-200 pt-8 pb-6 mt-8">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-wrap items-center md:justify-between justify-center">
                            <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                                <div className="text-sm text-blueGray-500 font-semibold py-1">
                                    Made with{" "}
                                    <a
                                        href="https://www.creative-tim.com/product/notus-js"
                                        className="text-blueGray-500 hover:text-gray-800"
                                        target="_blank"
                                    >
                                        Notus JS
                                    </a>{" "}
                                    by{" "}
                                    <a
                                        href="https://www.creative-tim.com"
                                        className="text-blueGray-500 hover:text-blueGray-800"
                                        target="_blank"
                                    >
                                        Creative Tim
                                    </a>
                                    .
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </section>
        </main>
    );
};

//!============================================= Export function ... ===================================================

export default ProfileEmployee;

{
    /* <>
{employee && (
  <div>
    <p>Employee Profile</p>
    <p>Employee Name : {employee.firstname}</p>
    <p>Last Name : {employee.lastname}</p>
    <p>country: {employee.country}</p>
    First Name:
    <input
      type="text"
      placeholder={employee.firstname}
      onChange={(e) => {
        setFirstName(e.target.value);
      }}
    />
    Last Name :
    <input
      type="text"
      placeholder={employee.lastname}
      onChange={(e) => {
        setLastName(e.target.value);
      }}
    />
    Country :
    <input
      type="text"
      placeholder={employee.country}
      onChange={(e) => {
        setCountry(e.target.value);
      }}
    />
    <button
      onClick={() => {
        updateProfile()
      }}
    >
      {" "}
      Update Profile
    </button>
    <button
      onClick={(e) => {
        navigate("/");
      }}
    >
      {" "}
      Back to main{" "}
    </button>
  </div>
)}
</> */
}
