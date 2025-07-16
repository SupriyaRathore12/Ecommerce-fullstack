import React,{useEffect,useState}from 'react'
import { getCart } from '../services/cartServices';
import { toast } from 'react-toastify';
import { placeOrder,getMyOrders } from '../services/OrderServices';
// import { getCart } from '../services/cartServices';


const Order = () => {
  const [orders,setOrders]=useState(null);

  useEffect(()=>{
    fetchCartItem();
    fetchOrderHistory();
  },[])
  const fetchCartItem=async()=>{
    try {
      const res=await getCart();
      setOrders(res.data.cart.items)
      console.log("Response from getCart:", res.data.cart.items);
      
    } catch (error) {
      toast.error("Failed to fetch cart items")
      
    }
  }
  const [shippingAddress, setShippingAddress] = useState("");

const [orderHistory,setOrderHistory]=useState([]);
 
  const handlePlaceOrder=async()=>{
     if (!shippingAddress.trim()) {
  toast.error("Please enter shipping address");
  return;
}
    try {
      const res =await placeOrder(shippingAddress);
      console.log("Order Placed",res.data);
        toast.success("order Placed Successfully")
        await fetchOrderHistory();

      
    } catch (error) {
      console.log("error fetching order",error);
    toast.error("Failed to place Order")
      
      
    }
  }
  const fetchOrderHistory=async()=>{
    try {
      const res=await getMyOrders();
      setOrderHistory(res.data.orders);
      console.log("Order History:", res.data.orders);
      
    } catch (error) {
      console.log("error fetching order history",error);
      toast.error("Failed to load order history")
      
    }
  }


  return (
    <div>
     <h2 className='text-xl font-semibold mb-4'>Your Orders:</h2>
     {!orders ?(
      <p className="text-gray-600">Loading..</p>

     ):
      orders.length===0 ?(
      <p className='text-gray-600'> 🛒Cart is empty..</p>
     ):(
      <>
      <ul className='space-y-4'>
        {orders.map((item,index)=>(
          <li key={index} className='flex justify-between items-center border p-4 rounded shadow'>
            <div>
              <p className="font-medium text-lg">{item.productId.productName}</p>
              <p className="text-sm text-gray-500">Quantity:{item.quantity}</p>
            </div>
            <div className="text-right font-semibold text-purple-700">
              ₹{item.productId.price* item.quantity}
            </div>
          </li>
        ))}

      </ul>
       <div className="mt-4">
  <input
    type="text"
    placeholder="Enter shipping address"
    value={shippingAddress}
    onChange={(e) => setShippingAddress(e.target.value)}
    className="border p-2 w-full rounded"
  />
</div>

 <div className="mt-6 text-right">
          <button
          onClick={handlePlaceOrder}
          
          className='bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 transition'
          >
            Place Order
          </button>


        {orderHistory.length>0 &&(
          <div className="mt-10">
            <h3 className="text-lg font-semibold mb-4">Your Recent Orders:</h3>
            <div className="space-y-4">
              {orderHistory.map((orders)=>(
                <div key={orders._id}  className="border rounded p-4 shadow bg-white">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Order ID: {orders._id.slice(-6)}</span>
                     <span className="text-sm font-semibold text-purple-700">{orders.orderStatus.toUpperCase()}</span>
                  </div>
                  <div className="text-sm mb-2 text-gray-700">
            📦 <strong>Shipping:</strong> {orders.shippingAddress}
          </div>
           <ul className="text-sm pl-4 list-disc">
            {orders.items.map((item, index) => (
              <li key={index}>
                {item.productId?.productName} – Qty: {item.quantity} – ₹{item.productId?.price}
              </li>
            ))}
          </ul>
          <div className="text-right mt-2 font-bold text-purple-800">
            Total: ₹{orders.totalPrice}
          </div>
                </div>
              ))}
            </div>

          </div>
        )}

        </div>
        </>
     )}
    </div>
    
    
  )
}
export default Order;
