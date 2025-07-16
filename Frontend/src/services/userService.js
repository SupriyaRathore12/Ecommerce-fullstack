import axios from "./axiosConfig";

//login API call

export const loginUser=async(FormData)=>{
    return await axios.post("/login",FormData);
}

//Signup API Call

export const SignupUser=async(userData)=>{
    return await axios.post("/addUser",userData);
}

