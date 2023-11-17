import React, { useEffect, useState } from 'react'
import LOGO from '../Images/logo.png'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';

const Navbar = () => {
    
    const token = localStorage.getItem("token")
    const isAdmin = localStorage.getItem("isAdmin")
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const navigate = useNavigate()

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

    const handleLogOut = () =>{
      localStorage.clear()
      window.location.reload()
      navigate("/")
      setTimeout(()=> {
        toast.success(`Logged out!`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }, 1)
    }
    
  return (
    <div className='navbar'>
        <div>
            <Link to="/"><img src={LOGO} alt="logo" /></Link>         
        </div>
        <div className='navbar-links'>
            <ul>
                <li><Link to="/">{windowWidth < 750 ? <HomeIcon /> : <>HOME</>}</Link></li>
                <li><Link to="/about">{windowWidth < 750 ? <InfoIcon /> : <>ABOUT</>}</Link></li>
                <li><Link to="/contact">{windowWidth < 750 ? <PhoneEnabledIcon /> : <>CONTACT</>}</Link></li>
            </ul>
        </div>
        <div>
            
            {isAdmin === "true" &&<Link to="/admin/dashboard"><button className='admin-btn'><AccountCircleIcon style={{position:'relative', top:'6px'}}/></button></Link>}
            {token ? <button className='logout-btn' onClick={()=> handleLogOut()}><LogoutIcon style={{position:'relative', top:'2px', left:'3px'}}/></button> : <Link to="/login"><button  className='login-btn'>LOG IN / SIGN UP</button></Link>}
            
        </div>
        <ToastContainer />
    </div>
  )
}

export default Navbar
