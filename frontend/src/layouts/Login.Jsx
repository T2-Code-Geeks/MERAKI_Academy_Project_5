import React from 'react'
import UserLogin from '../../components/Login/UserLogin';
import EmployeeLogin from '../../components/Login/EmployeeLogin';

const Login = () => {
const [toggle, setToggle] = useState(false);

  return (<>
  <div>Toggle user or employee</div>
{toggle?<UserLogin/>:<EmployeeLogin/>}
  </>
    
  )
}

export default Login