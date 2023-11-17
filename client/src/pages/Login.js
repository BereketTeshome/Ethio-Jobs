import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useFormik} from 'formik'
import * as Yup from 'yup'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';



const Login = () => {

  const [visible, setVisible] = useState(true)
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
        username:"",
        password:"",
    },
    validationSchema: Yup.object({
        username: Yup.string().max(15, "Must be 15 characters or less").required("Required"),
        password: Yup.string().max(15, "Must be 15 characters or less").required("Required").min(6, "Must be 6 characters or more")
    }),
    onSubmit: (values) => {
        console.log(values);
    }
})
  
  const handleVisible = () => {
    setVisible(!visible)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:3001/api/user/login", formik.values)
      if (!res.data.error) {
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("isAdmin", res.data.user.isAdmin)
        navigate('/')
        setTimeout(()=> {
        toast.success(`Hello! ${formik.values.username}`, {
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
      
      if (res.data.error) {
        console.log(res.data.error);
        setTimeout(()=> {
          toast.error(`${res.data.error}`, {
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
    } catch (error) {
      console.error(error);
    }  
  }
  
  return (
    <div className='login'>
      <Navbar />
      <div className='register-container' style={{top:'100px'}}>
        <div>
        <div style={{display:'flex', justifyContent:'center'}}>
          <h3 style={{fontSize:'1.7rem', color:'white'}}><span style={{color:'#011E3D', fontSize:'2.2rem'}}>Log</span> IN</h3>
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

              <button type='submit' onClick={(e) => handleSubmit(e)} className='register-container-btn' disabled={!(formik.isValid && formik.dirty)}>LOG IN</button>
          </div>


          <p style={{fontSize:'0.8rem', marginLeft:'30px'}}>Don't have an account? <a style={{fontSize:'0.9rem', color:'white'}} href="/register">Register</a></p>
        </form>
        </div>
      </div>
        
          <ToastContainer />
    </div>
  )
}

export default Login
