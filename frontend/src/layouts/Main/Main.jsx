import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import RegisterEmployee from "../../components/Register/RegisterEmployee";
const Main = () => {
  return (
    <div>
      <header>
        <NavBar />
        <RegisterEmployee />
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Main;
