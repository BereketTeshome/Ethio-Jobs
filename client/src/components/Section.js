import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from './Loading';
import Pagination from './Pagination';
import Span from './Span';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const Section = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(2)
  const [category, setCategory] = useState("")


  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true)
      const res = await axios.get(`http://localhost:3001/api/job/${category ? `getJob?category=${category}` : 'get'}`)
      setJobs(res.data.job)
      setLoading(false)
    }
    fetchJobs()
  }, [category])

  if (loading) {
    return <Loading />
  }

  const lastPostIndex = currentPage * postPerPage
  const firstPostIndex = lastPostIndex - postPerPage
  const currentPost = jobs.slice(firstPostIndex, lastPostIndex)

  return (
    <section className='section'>
      <div className='section-left'>
        <div className='section-category'>
        <p>Filter job by category</p>
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
          <Link to='/location/Addis Ababa' style={{textDecoration:'none'}}><li><Span/> Addis Ababa</li></Link>
          <Link to='/location/Dire Dawa' style={{textDecoration:'none'}}><li><Span/> Dire Dawa</li></Link>
          <Link to='/location/Gondar' style={{textDecoration:'none'}}><li><Span/> Gondar</li></Link>
          <Link to='/location/Mekelle' style={{textDecoration:'none'}}><li><Span/> Mekelle</li></Link>
          <Link to='/location/Bahir Dar' style={{textDecoration:'none'}}><li><Span/> Bahir Dar</li></Link>
          <Link to='/location/Jimma' style={{textDecoration:'none'}}><li><Span/> Jimma</li></Link>
          <Link to='/location/Gambella' style={{textDecoration:'none'}}><li><Span/> Gambella</li></Link>
          <Link to='/location/Harar' style={{textDecoration:'none'}}><li><Span/> Harar</li></Link>      
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
        totalPost={jobs.length} 
        postPerPage={postPerPage}
        setCurrentPage={setCurrentPage}  
        currentPage={currentPage}  
        category={category}  
      />
        
      </div>
      <ToastContainer />
    </section>
  )
}

export default Section
