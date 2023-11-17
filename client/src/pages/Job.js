import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import {useLocation, useNavigate} from 'react-router-dom'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HomeIcon from '@mui/icons-material/Home';
import axios from 'axios'
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
const Job = () => {
  const location = useLocation().pathname.split("/")[2]
  const [job, setJob] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`https://ethio-jobs.vercel.app/api/job/get/${location}`)
      setJob([res.data.job])
      console.log(res.data.job);
    }
    fetchData()
  }, [])
  

  return (
    <div >
    <Navbar />
      <div className='job-container'>
        {job.map((item) => {
          const {_id, title, description, salary, jobType, jobDuration, location, category} = item
          return(
            <div className="job" key={_id}>
              <div style={{display:'flex', justifyContent:'space-between'}}><h2>{title}</h2><button className='goBack' onClick={() => navigate(-1)}> <ReplyAllIcon className='go-back-icon'/></button></div>
              <span>{category}</span>
              <p style={{color:'#2996F0', fontSize:"0.8rem", marginBottom:'10px'}}>Type: <HomeIcon fontSize='very small' style={{position:'relative', top:'2px', color:'#2996F0' }}/> {jobType}</p>
              <p style={{color:'#2996F0', fontSize:"0.8rem", marginBottom:'10px'}}>Duration: <AccessTimeIcon fontSize='very small' style={{position:'relative', top:'2px', color:'#2996F0' }}/> {jobDuration}</p>
              <p style={{color:'#2996F0', fontSize:"0.8rem", marginBottom:'10px'}}>Location: <LocationOnIcon fontSize='very small' style={{position:'relative', top:'2px', color:'#2996F0' }}/> {location}</p>
              <p style={{color:'#2996F0', fontSize:"0.8rem", marginBottom:'10px'}}>Salary:  $ {salary}</p>
              <h5><b>Description</b>: {description}</h5>            
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Job
