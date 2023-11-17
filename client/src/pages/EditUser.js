import React, { useState } from 'react'
import axios from 'axios'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useFormik} from 'formik'
import * as Yup from 'yup'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import WorkOutlineTwoToneIcon from '@mui/icons-material/WorkOutlineTwoTone';
import MenuIcon from '@mui/icons-material/Menu';
import AdminLogo from '../Images/Admin.png'
import LOGO from '../Images/logo.png'

const EditUser = () => {
  const [slide, setSlide] = useState(false)
  const location = useLocation().pathname.split("/")[4]
  const [visible, setVisible] = useState(true)
  const handleVisible = () => {
    setVisible(!visible)
  }  

  const formik = useFormik({
    initialValues: {
        username:"",
        email:"",
        password:"",
        confirmPassword:"",
        isAdmin:""
    },
    validationSchema: Yup.object({
        username: Yup.string().max(15, "Must be 15 characters or less").required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string().max(15, "Must be 15 characters or less").required("Required").min(6, "Must be 6 characters or more"),
        confirmPassword: Yup.string().max(15, "Must be 15 characters or less").required("Required").min(6, "Must be 6 characters or more").oneOf([Yup.ref('password'), null], 'Password must match'),
        isAdmin: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
        console.log(values);
    }
})
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`https://ethio-jobs.vercel.app/api/user/edit/${location}`, formik.values)
      setTimeout(()=> {
        toast.success('USER UPDATED!', {
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
        navigate('/admin/users')
    }
     catch (error) {
      console.error(error);
    }    
  }

  return (
    <div className='login'>
      <div className='navbar' style={{background:'#011E3D'}}>
        <Link to="/"><img src={LOGO} alt="logo" /></Link>          
      </div>
      <div className='dashboard-sidebar' style={{width: slide ? '300px' : '80px'}}>
        <button onClick={()=> setSlide(!slide)} className='menu-icon'><MenuIcon /></button>
            <img src={AdminLogo} alt="admin logo" style={{position:'relative', left: slide ? '0px' : '-33px'}}/>
            <Link to="/admin/dashboard"><div><DashboardTwoToneIcon className='dashboard-icon'/> <span style={{display: slide ? 'block' : 'none'}}>Dashboard</span></div></Link>
            <Link to="/admin/users"><div><PeopleAltTwoToneIcon className='dashboard-icon'/> <span style={{display: slide ? 'block' : 'none'}}>Users</span></div></Link>
            <Link to="/admin/jobs"><div><WorkOutlineTwoToneIcon className='dashboard-icon'/> <span style={{display: slide ? 'block' : 'none'}}>Jobs</span></div></Link>
        </div>
      <div className='create-job-container'>
        <div>
        <div style={{display:'flex', justifyContent:'center'}}>
          <h3 style={{fontSize:'1.7rem', color:'white'}}><span style={{color:'#011E3D'}}>EDIT</span> User</h3>
        </div>
                  
          <form onSubmit={formik.handleSubmit}>
            <div className='register-input-container'>
              <label htmlFor="username">Username </label>
              <input 
                type="text" 
                name='username' 
                style={formik.touched.username &&formik.errors.username ? {border:'2px solid red', outline:'none'} : {outline:'none'}} 
                value={formik.values.username} 
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur}
              />
              {formik.touched.username && formik.errors.username ? <p>{formik.errors.username}</p>: null}

              <label htmlFor="email">Email </label>
              <input 
                type="email" name='email' 
                style={formik.touched.email &&formik.errors.email ? {border:'2px solid red', outline:'none'} : {outline:'none'}} 
                value={formik.values.email} 
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? <p>{formik.errors.email}</p>: null}

              <label htmlFor="password">Password </label>
              <input 
                type={visible ? "password" : "text"}
                name='password' 
                style={formik.touched.password && formik.errors.password ? {border:'2px solid red', outline:'none'} : {outline:'none'}} 
                value={formik.values.password} 
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur}
              /> 
              {formik.touched.password && formik.errors.password ? <p>{formik.errors.password}</p>: null}
              {!formik.errors.password && <button className='visible-btn' onClick={() => handleVisible()} style={{background:'none', height:'27px', border:'none'}}> { visible ? <VisibilityIcon className='visible-icon'/> : <VisibilityOffIcon className='visible-icon'/>} </button>} 

              <label htmlFor="confirmPassword">Confirm Password</label>
              <input 
                type={visible ? "password" : "text"} 
                name='confirmPassword' 
                style={formik.touched.confirmPassword && formik.errors.confirmPassword ? {border:'2px solid red', outline:'none'} : {outline:'none'}} 
                value={formik.values.confirmPassword} 
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur}
              /> 
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? <p>{formik.errors.confirmPassword}</p>: null}
              {!formik.errors.confirmPassword && <button className='visible-btn' onClick={() => handleVisible()} style={{background:'none', height:'27px', border:'none'}}> { visible ? <VisibilityIcon className='visible-icon'/> : <VisibilityOffIcon className='visible-icon'/>} </button>} 

              <label htmlFor="isAdmin">Is this admin acc you want to create?</label>
                       
              <select value={formik.values.isAdmin} name='isAdmin' defaultValue="false" onChange={formik.handleChange} className='create-user-select'>
                <option name="" value="" id=""></option>     
                <option name="false" value="false" id="">No</option>
                <option name="true" value="true" id="">Yes</option>
              </select>
              {formik.touched.isAdmin && formik.errors.isAdmin ? <p>{formik.errors.isAdmin}</p>: null}
              
            <button type='submit' onClick={(e) => handleSubmit(e)} className='register-container-btn' disabled={!(formik.isValid && formik.dirty)}>Update</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default EditUser
