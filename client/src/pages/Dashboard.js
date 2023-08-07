import React, { useEffect, useState } from 'react'
// import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import LOGO from '../Images/logo.png'
import AdminLogo from '../Images/Admin.png'
import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import WorkOutlineTwoToneIcon from '@mui/icons-material/WorkOutlineTwoTone';
import CategoryTwoToneIcon from '@mui/icons-material/CategoryTwoTone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios'

const Dashboard = () => {

  const [slide, setSlide] = useState(true)
  const [jobs, setJobs] = useState("")
  const [users, setUsers] = useState("")

  useEffect(() => {
    const fetchJobs = async () => {
      const jobs = await axios.get("http://localhost:3001/api/job/get")
      setJobs(jobs.data.count)
      const users = await axios.get("http://localhost:3001/api/user/users")
      setUsers(users.data.count)
    }
    fetchJobs()
}, [])

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
            {/* <Link to="/admin/category"><div><CategoryTwoToneIcon className='dashboard-icon'/> <span style={{display: slide ? 'block' : 'none'}}>Category</span></div></Link> */}
        </div>

        <div className='dashboard-main'>
            <h1 style={{padding:'2% 24%'}}>Dashboard</h1>

            <div className='sub-dashboard-main'>
                <div className='dashboard-panel'>
                    <WorkOutlineTwoToneIcon className='dashboard-panel-icon'/>
                    <h3>{jobs}</h3>
                    <span>Jobs</span>
                </div>
                <div className='dashboard-panel'>
                    <PeopleAltTwoToneIcon className='dashboard-panel-icon'/>
                    <h3>{users}</h3>
                    <span>Users</span>
                </div>
                <div className='dashboard-panel'>
                    <CategoryTwoToneIcon className='dashboard-panel-icon'/>
                    <h3>3</h3>
                    <span>Jobs Categories</span>
                </div>

                <div className='dashboard-panel'>
                    <LocationOnIcon className='dashboard-panel-icon'/>
                    <h3>8</h3>
                    <span>Job Locations</span>
                </div>
            </div>

        </div>
      </div>
    </div>
  )
}

export default Dashboard
