import React from "react";
import { Outlet } from "react-router";
import NavBar from "../../components/Admin/NavBarAdmin/NavBar";
import Footer from "../../components/Admin/FooterAdmin/Footer";
import SideBar from "../../components/Admin/SideBarAdmin/SideBar";
import "./AdminLayOut.css"
const AdminLayOut = () => {
    return (
        <div>
            <header className="z-10">
                <NavBar />
            </header>
            <main id="main" className=" bg-white dark:bg-gray-700  h-screen">
                {/* <SideBar id="sidebar"/> */}
                <Outlet  id="outlet"/>
            </main>
            {/* <Footer /> */}
        </div>
    );
};

export default AdminLayOut;
