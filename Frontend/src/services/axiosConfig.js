import axios from "axios";

const instance=axios.create({
    baseURL:"https://ecommerce-fullstack-backend-7p2q.onrender.com",
    headers:{
        "Content-Type":"application/json",
    }
});
export default instance;
