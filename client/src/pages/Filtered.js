import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Pagination from '../components/Pagination';
import Span from '../components/Span';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import notFound from '../Images/404.png'

const Section = () => {
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(2)
  const [category, setCategory] = useState("")
  const [filtered, setFiltered] = useState([])
  const navigate = useNavigate()

  const location = useLocation().pathname.split('/')[2]
  useEffect(() => {
      const filterJobs = async () => {
        setLoading(true)
        const res = await axios.get(`https://ethio-jobs.vercel.app/api/job/?${category ? `location=${location}&category=${category}` : `location=${location}`}`)
        setFiltered(res.data.job)
        console.log(res.data.job);
        setLoading(false)
      }
      filterJobs()
    }, [location, category])
  
  if (loading) {
    return <Loading />
  }

  if (filtered < 1) {
    return (
      <>
      <Navbar />
      <div className='not-found-container'>
        <img src={notFound} alt="" className='not-found'/>
       
        <h3> <span style={{color:'red'}}>No</span> result Found for Jobs in <i> "{location.split('%20')} for {category} development"</i>  <button className='goBack' onClick={() => navigate(-1)}> <ReplyAllIcon className='go-back-icon'/> Go Back</button></h3>
      </div>
      </>
    )
  }

  const lastPostIndex = currentPage * postPerPage
  const firstPostIndex = lastPostIndex - postPerPage
  const currentPost = filtered.slice(firstPostIndex, lastPostIndex)

  return (
    <>
    <Navbar /><br /><br />
    <div className='filtered-header'>
      <h2>Jobs in <span style={{color:'#2296F0', fontSize:'100%'}}> {location.split('%20')}</span></h2>
      <button className='goBack' onClick={() => navigate(-1)}> <ReplyAllIcon className='go-back-icon'/> Go Back</button>
    </div>

    <section className='section'>
      <div className='section-left'>
        <div className='section-category'>
        <p>Filter job by</p>
          <fieldset>
              <legend>category</legend>
              <select name="category" id="" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">All</option>
                <option value="frontend">frontend</option>
                <option value="backend">backend</option>
                <option value="fullstack">fullstack</option>
              </select>
          </fieldset>
        </div>
        <div className='section-location'>
          <p>Filter job by location</p>
          <Link to='/location/Addis Ababa' style={{textDecoration:'none'}}><li><Span/> <span>Addis Ababa</span></li></Link>
          <Link to='/location/Dire Dawa' style={{textDecoration:'none'}}><li><Span/><span>Dire Dawa</span></li></Link>
          <Link to='/location/Gondar' style={{textDecoration:'none'}}><li><Span/> <span>Gondar</span></li></Link>
          <Link to='/location/Mekelle' style={{textDecoration:'none'}}><li><Span/> <span>Mekelle</span></li></Link>
          <Link to='/location/Bahir Dar' style={{textDecoration:'none'}}><li><Span/> <span>Bahir Dar</span></li></Link>
          <Link to='/location/Jimma' style={{textDecoration:'none'}}><li><Span/> <span>Jimma</span></li></Link>
          <Link to='/location/Gambella' style={{textDecoration:'none'}}><li><Span/> <span>Gambella</span></li></Link>
          <Link to='/location/Harar' style={{textDecoration:'none'}}><li><Span/> <span>Harar</span></li></Link>

        </div>
      </div>
      
      <div className='section-right'>
     
      {currentPost.map((job) => {
        const {_id, title, description, jobType, category} = job
        return(
          <div className="jobs" key={_id}>
            <p style={{color:'#2996F0', fontSize:"0.9rem"}}><LocationOnIcon fontSize='very small' style={{position:'relative', top:'1px', color:'#2996F0'}}/> {jobType}</p>
            <h2>{title}</h2>
            <span>{category}</span>
            <h5><b>Description</b>: {description.substring(0,70)}...</h5>
            <a href={`/job/${_id}`}>
              <button>+ More Details</button>
            </a>
            
          </div>
        )
      })}
      <Pagination 
        totalPost={filtered.length} 
        postPerPage={postPerPage}
        setCurrentPage={setCurrentPage}  
        currentPage={currentPage}  
        category={category}  
      />
        
      </div>
    </section>
    </>
  )
}

export default Section
