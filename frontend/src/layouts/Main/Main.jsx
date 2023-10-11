import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

const Main = () => {
    const [isDarkMode, setIsDarkMode] = useState(true)
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main>
      <section className={`bg-${isDarkMode ? 'gray-700' : 'white'} dark:bg-gray-700`}>    
            <Outlet isDarkMode={isDarkMode}/>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Main;
