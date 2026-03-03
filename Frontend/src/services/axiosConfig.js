import axios from "axios";

const instance=axios.create({
    baseURL:"https://ecommerce-fullstack-snjq.onrender.com",
    headers:{
        "Content-Type":"application/json",
    }
});
export default instance;
