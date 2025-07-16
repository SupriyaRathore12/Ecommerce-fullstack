import axios from "./axiosConfig";

export const placeOrder = async (shippingAddress) => {
  return await axios.post( "/placeOrder", {shippingAddress},{
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};
export const getMyOrders = async () => {
  return await axios.get("/getMyOrder", {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};
