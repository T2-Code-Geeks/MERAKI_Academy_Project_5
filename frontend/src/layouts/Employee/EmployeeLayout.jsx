import React from 'react'
import Footer from '../../components/Footer/Footer'
import NavBarEmployee from '../../components/EmployeeComponant/NavBarEmployee'
import { Outlet } from 'react-router-dom'

const EmployeeLayout = () => {
  return (
    <div>
    <header>
      <NavBarEmployee />
    </header>
    <main>
          <Outlet />
    </main>
    <Footer />
  </div>
  )
}

export default EmployeeLayout