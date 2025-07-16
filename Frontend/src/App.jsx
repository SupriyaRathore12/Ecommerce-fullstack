import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'
import Home from './pages/Home.jsx'
import AddProduct from "./pages/AddProduct.jsx"
import Login from './pages/Login.jsx'
import Order from './pages/Order.jsx'
import Cart from "./pages/Cart.jsx"
import Contact from "./pages/Contact.jsx"
import Signup from './pages/Signup.jsx'
import Profile from './pages/Profile.jsx'
import { ToastContainer } from 'react-toastify'
import About from './pages/About.jsx'
import Footer from './Components/Footer.jsx'
import "./index.css"







const App = () => {
  const [showLoginModel,setShowLoginModel]=useState(false);
  const [showSignupModel,setSignupModel]=useState(false);

  const openLoginModel=()=>setShowLoginModel(true);
  const closeLoginModel=()=>setShowLoginModel(false)

  const openSignupModel=()=>setSignupModel(true);
  const closeSignupModel=()=>setSignupModel(false)
  return (
    <div>
      <BrowserRouter>
        <Navbar openLogin={openLoginModel} />
        {showLoginModel && (
          <Login
          closeModel={closeLoginModel}
          openSignupModel={()=>{
            closeLoginModel();
            openSignupModel();
          }}
          />
        )}

        {
          showSignupModel && (
            <Signup
            closeModel={closeSignupModel}
            openLoginModel={()=>{
              closeSignupModel();
              openLoginModel();
            }}
            />
          )
        }

        <Routes>
      <Route path="/" element={<Home />}/>
       <Route path="/order" element={<Order />}/>
        <Route path="/addproducts" element={<AddProduct />}/>
         <Route path="/contact" element={<Contact />}/>
          <Route path="/cart" element={<Cart />}/>
           <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<Signup/>}/>
             <Route path="/profile" element={<Profile/>}/>
             <Route path='/about' element={<About/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
        <ToastContainer position='top-center' autoClose={2000}/>

    </div>
  )
}

export default App
