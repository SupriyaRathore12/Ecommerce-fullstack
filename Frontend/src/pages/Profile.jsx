import React, { useEffect, useState } from 'react';
import axios from "../services/axiosConfig"
import "./profile.css"


const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile=async()=>{
      const token=localStorage.getItem("token")
      try {
        const res=await axios.get("/profile",{
          headers:{
            Authorization: token
          }

        });
        setUser(res.data.user);
        
      } catch (error) {
         console.error("Error fetching profile:", error);
        
      }
    };
    fetchProfile();
    
  }, []);
    if (!user) return <p>Loading...</p>;

  return (
    <div className='profile-container'>
       <div className='profile-card'>
        <h2>Welcome, 👤{user.Name}</h2>
         <p>Email: {user.Email}</p>
      <p>Contact: {user.Contact}</p>
      <p>Gender: {user.gender}</p>
      <p>Age: {user.Age}</p>
      <p>Address: {user.Address}</p>

       </div>
    </div>
  );
};

export default Profile;
