import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Loading from '../components/Loading'
import axios from 'axios'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { useNavigate } from 'react-router-dom';
import notFound from '../Images/404.png'

const Search = () => {

  const [data, setData] = useState([])
  const searchTerm = window.location.href.split('?')[1]
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async() =>{
        setLoading(true)
        try {
            const res = await axios.post(`https://ethio-jobs.vercel.app/api/job/search?searchTerm=${searchTerm}`)
            setData(res.data.job)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error(error)
        }
    }
    fetchData();      
}, [searchTerm])

if (loading) {
  return (
    <main>
      <Loading />
    </main>
  )
}

if (data.length < 1) {
  return (
    <>
    <Navbar />
    <div className='not-found-container'>
      <img src={notFound} alt="" className='not-found'/>
      <h3> <span style={{color:'red'}}>No</span> result Found for <i> " {searchTerm.split('=')[1]} " </i>  <button className='goBack' onClick={() => navigate(-1)}> <ReplyAllIcon className='go-back-icon'/> Go Back</button></h3>
    </div>
    </>
  )
}
 
  return (
    <div>
        <Navbar />
      <div style={{display:'flex', justifyContent:'space-between', padding:'0px 3%'}}>
        <button className='goBack' onClick={() => navigate(-1)}> <ReplyAllIcon className='go-back-icon'  style={{marginTop:'15px'}}/> Go Back</button>
      </div>
      
      <div className='search-container'>
      {data.map((job) => {
        const {_id, title, description, jobType, category} = job
        return(
          <div className='search-container'>
            <div className="jobs" key={_id} style={{margin:'20px', width:'100%', maxWidth:"530px"}}>
              <p style={{color:'#2996F0', fontSize:"0.9rem"}}><LocationOnIcon fontSize='very small' style={{position:'relative', top:'1px', color:'#2996F0'}}/> {jobType}</p>
              <h2>{title}</h2>
              <span>{category}</span>
              <h5><b>Description</b>: {description.substring(0,70)}...</h5>
              {token ? <a href={`/job/${_id}`}><button>+ More Details</button></a> : <a href='/login'><button>+ More Details</button></a>}            

              
            </div>
          </div>
        )
      })}
      </div>
    </div>
  )
}

export default Search
