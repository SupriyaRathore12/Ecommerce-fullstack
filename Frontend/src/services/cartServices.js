import axios from "./axiosConfig"

export const addToCart=async(data)=>{
    return await axios.post("/addToCart",data,{
        headers:{
            Authorization:localStorage.getItem("token"),
        },

    })

};

export const getCart=async()=>{
    return await axios.get("/getCart",{
        headers:{
            Authorization:localStorage.getItem("token"),
        }

    })
};

export const removeItem=async(productId)=>{
    return await axios.delete(`/removeItem/${productId}`,{
        headers:{
            Authorization:localStorage.getItem("token"),
        }
    })
};

export const clearCart=async () => {
    return await axios.delete("/clearCart", {
        headers:{
            Authorization:localStorage.getItem("token"),
        }

    })
    
}

export const updateCart=async (data) => {
    return await axios.put("/updateCart",data,{
        headers:{
            Authorization:localStorage.getItem("token"),
        }
    })
    
}