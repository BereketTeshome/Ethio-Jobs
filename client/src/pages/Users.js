import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import LOGO from '../Images/logo.png'
import AdminLogo from '../Images/Admin.png'
import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import WorkOutlineTwoToneIcon from '@mui/icons-material/WorkOutlineTwoTone';
import Grid from '../components/DataGrid';
import MenuIcon from '@mui/icons-material/Menu';
import { ToastContainer } from 'react-toastify';

const Users = () => {
  const [slide, setSlide] = useState(false)
  return (
    <div>
      <div className='navbar' style={{background:'#011E3D'}}>
        <Link to="/"><img src={LOGO} alt="logo" /></Link>          
      </div>

      <div className='dashboard'>
        <div className='dashboard-sidebar' style={{width: slide ? '300px' : '80px'}}>
        <button onClick={()=> setSlide(!slide)} className='menu-icon'><MenuIcon /></button>
            <img src={AdminLogo} alt="admin logo" style={{position:'relative', left: slide ? '0px' : '-33px'}}/>
            <Link to="/admin/dashboard"><div><DashboardTwoToneIcon className='dashboard-icon'/> <span style={{display: slide ? 'block' : 'none'}}>Dashboard</span></div></Link>
            <Link to="/admin/users"><div><PeopleAltTwoToneIcon className='dashboard-icon'/> <span style={{display: slide ? 'block' : 'none'}}>Users</span></div></Link>
            <Link to="/admin/jobs"><div><WorkOutlineTwoToneIcon className='dashboard-icon'/> <span style={{display: slide ? 'block' : 'none'}}>Jobs</span></div></Link>
        </div>

        <div className='dashboard-main'>
            <h1 style={{padding:'2% 24%'}}>Users</h1>
            <Link to={'/admin/users/create'}><button className='create-user-btn'>+ CREATE USER</button></Link>
           <div className='users-container'>
                <Grid />
           </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Users
