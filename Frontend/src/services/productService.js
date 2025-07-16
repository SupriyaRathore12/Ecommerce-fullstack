import axios from "./axiosConfig"

export const getAllProducts = async () => {

    return await axios.get("/getAllProducts");
};

export const addProduct = async (productData) => {
      console.log("Sending to backend:", productData);
    return await axios.post("/addProducts",
         productData,{
            headers:{
        Authorization: localStorage.getItem("token")
    }
         });
    
}
export const deleteProduct = async (productId) => {
  return await axios.delete(`/deleteProducts/${productId}`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};

