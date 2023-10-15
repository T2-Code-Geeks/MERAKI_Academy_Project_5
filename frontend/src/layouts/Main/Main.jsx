import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

const Main = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <header>
        <NavBar style={{ flex: "0 0 auto" }} />
      </header>
      <main style={{ flex: "1 0 auto" }} >
      <section className={`bg-${isDarkMode ? 'gray-700' : 'white'} dark:bg-gray-700`}>    
            <Outlet isDarkMode={isDarkMode}/>
        </section>
      </main>
      <footer style={{ flex: "0 0 auto" }}>
      <Footer />
      </footer>
    </div>
  );
};

export default Main;
