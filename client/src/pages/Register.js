import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import {useFormik} from 'formik'
import * as Yup from 'yup'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';



const Register = () => {
  const [visible, setVisible] = useState(true)
  const handleVisible = () => {
    setVisible(!visible)
  }
  

  const formik = useFormik({
    initialValues: {
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    },
    validationSchema: Yup.object({
        username: Yup.string().max(15, "Must be 15 characters or less").required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string().max(15, "Must be 15 characters or less").required("Required").min(6, "Must be 6 characters or more"),
        confirmPassword: Yup.string().max(15, "Must be 15 characters or less").required("Required").min(6, "Must be 6 characters or more").oneOf([Yup.ref('password'), null], 'Password must match')
    }),
    onSubmit: (values) => {
        console.log(values);
    }
})
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post("https://ethio-jobs.vercel.app/user/register", formik.values)
      setTimeout(()=> {
        toast.success('SIGN UP Success!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }, 2)
        navigate('/')
    }
     catch (error) {
      console.error(error);
    }
    
  }

  return (
    <div className='login'>
      <Navbar />
      <div className='register-container'>
        <div>
        <div style={{display:'flex', justifyContent:'center'}}>
          <h3 style={{fontSize:'1.7rem', color:'white'}}><span style={{color:'#011E3D'}}>SIGN</span> UP</h3>
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

              <label htmlFor="confirmPassword">Confirm Password </label>
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

            <button type='submit' onClick={(e) => handleSubmit(e)} className='register-container-btn' disabled={!(formik.isValid && formik.dirty)}>SIGN UP</button>
            </div>

          </form>
          <p style={{fontSize:'0.8rem', marginLeft:'30px'}}>Already have an account? <a style={{fontSize:'0.9rem', color:'white'}} href="/login">Login</a></p>
        </div>
      </div>
    </div>
  )
}

export default Register
