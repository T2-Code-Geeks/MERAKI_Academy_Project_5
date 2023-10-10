import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

const Main = () => {
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main>
        <section class="bg-white dark:bg-gray-900">
          <Outlet />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Main;
