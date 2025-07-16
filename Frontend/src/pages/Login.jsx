
import './login.css'
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import {loginUser} from "../services/userService"
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

   


function Login ({closeModel,openSignupModel})  {
  const navigate=useNavigate();
  const[formData,setFormData]=useState({
    Email:"",
    password:""
  });
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  };
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const response=await loginUser(formData);
      toast.success(response.data.msg);
      localStorage.setItem("token",response.data.token);
       localStorage.setItem("user", JSON.stringify(response.data.user));
      closeModel();
      navigate("/");
      
    } catch (error) {
      toast.error(error.response?.data?.msg || "login Failed");

      
    }
  }
  return (
   <div className='login-wrapper'>
    <div>
       <span onClick={closeModel} className='close-btn'>
    &times;
    </span>
    
     <form action="login-form" className='login-form' onSubmit={handleSubmit}>
      <h4>Login To GurllyShop</h4>
      <label htmlFor="email">Email:</label>
      <input type="text" id='Email' name='Email' placeholder='Enter your email' value={formData.Email} onChange={handleChange}/>
      <label htmlFor="password">Password:</label>
      <input type="password"  id='pswd' placeholder='Enter your password' name='password' value={formData.password} onChange={handleChange}/>
      <button type='submit'>Login</button>
     </form>
     <p>If you don't have any account ?{" "} <span style={{color:"blue",cursor:"pointer"}} onClick={()=>{
      closeModel();
      openSignupModel();
     }}>Create an account
     </span>
     </p>

    </div>

   </div>
   
    
  )
}

export default Login
