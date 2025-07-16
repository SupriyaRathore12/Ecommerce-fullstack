import React,{useState} from 'react'
import { SignupUser } from '../services/userService'
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./login.css"



const Signup = ({closeModel,openLoginModel}) => {
  const [formData,setFormData]=useState({
    Name:'',
    Email:'',
    password:'',
    Address:"",
    Contact:"",
    gender:"",
    Age:"",

  })
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});

  };
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const response=await SignupUser(formData);
      toast.success(response.data.msg);
      closeModel();
      openLoginModel();

    } catch (error) {
      toast.error(error.response?.data?.msg ||"signup Failed");
      
    }
  }
  return (
    <div>
      <div>

     <span onClick={closeModel}>
      &times;
    </span>
    <form action="login-form" className='login-form'onSubmit={handleSubmit}>
      <h4>Signup To GurllyShop</h4>
       <input
            type="text"
            name="Name"
            placeholder="Enter Name"
            value={formData.Name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="Email"
            placeholder="Enter Email"
            value={formData.Email}
            onChange={handleChange}
          />
          <input
            type="number"
            name="Contact"
            placeholder="Enter Contact Number"
            value={formData.Contact}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="text"
            name="Address"
            placeholder="Enter Address"
            value={formData.Address}
            onChange={handleChange}
          />
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
          <input
            type="number"
            name="Age"
            placeholder="Enter Age"
            value={formData.Age}
            onChange={handleChange}
          />
          <button type="submit">Signup</button>
        </form>

        <p>
          Already have an account?{" "}
          <span
            onClick={() => {
              closeModel();
              openLoginModel();
            }}
          >
            Login
          </span>
        </p>

      </div>
    </div>
   
    
  )
}

export default Signup
