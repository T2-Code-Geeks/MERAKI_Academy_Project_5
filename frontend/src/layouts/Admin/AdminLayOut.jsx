import React from 'react'
import { Outlet } from 'react-router';
import NavBar from '../../components/Admin/NavBarAdmin/NavBar';
import Footer from '../../components/Admin/FooterAdmin/Footer';

const AdminLayOut = () => {
  return   (
    <div>
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AdminLayOut