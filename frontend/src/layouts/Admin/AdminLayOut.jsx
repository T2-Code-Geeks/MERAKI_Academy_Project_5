import React from "react";
import { Outlet } from "react-router";
import NavBar from "../../components/Admin/NavBarAdmin/NavBar";
import Footer from "../../components/Admin/FooterAdmin/Footer";
import SideBar from "../../components/Admin/SideBarAdmin/SideBar";
import "./AdminLayOut.css"
const AdminLayOut = () => {
    return (
        <div>
            <header>
                <NavBar />
            </header>
            <main id="main">
                <SideBar id="sidebar"/>
                <Outlet  id="outlet"/>
            </main>
            <Footer />
        </div>
    );
};

export default AdminLayOut;
