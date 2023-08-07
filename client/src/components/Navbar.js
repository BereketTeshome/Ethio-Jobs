import React from 'react'
import LOGO from '../Images/logo.png'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const Navbar = () => {
  return (
    <div className='navbar'>
        <div>
            <Link to="/"><img src={LOGO} alt="logo" /></Link>         
        </div>
        <div className='navbar-links'>
            <ul>
                <li><Link to="/">HOME</Link></li>
                <li><Link to="/about">ABOUT</Link></li>
                <li><Link to="/contact">CONTACT</Link></li>
            </ul>
        </div>
        <div>
            <Link to="/login"><button  className='login-btn'>LOG IN / SIGN UP</button></Link>
            <Link to="/admin/dashboard"><button className='admin-btn'><AccountCircleIcon style={{position:'relative', top:'6px'}}/></button></Link>           
        </div>
        <ToastContainer />
    </div>
  )
}

export default Navbar
