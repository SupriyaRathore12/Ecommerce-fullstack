import React, { useEffect, useState } from 'react'
import { getAllProducts } from '../services/productService';
import { useNavigate } from 'react-router-dom';
import{addToCart} from '../services/cartServices'
import { deleteProduct } from '../services/productService';
import{toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./Home.css"

const Home = () => {
  const [Products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const[quantities,setQuantities]=useState({});
  const navigate=useNavigate();
  const token=localStorage.getItem("token");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getAllProducts();
      // console.log(response); // optional debug
      setProducts(response.data.product);

      const initialQuantities={};
      response.data.product.forEach((product)=>{
        initialQuantities[product._id]=1;
      });

      setQuantities(initialQuantities);

      setLoading(false);
    } catch (error) {
      console.log("error fetching products:", error);
      setLoading(false);
    }
  };

  const handleQuantityChange=(productId,value)=>{
    if(value>=1){
      setQuantities((prev)=>({...prev,[productId]:value}));

    }
  };

  const handleAddToCart=async(productId)=>{
    const quantity=quantities[productId] || 1;
    try {
      const res=await addToCart({productId,quantity})
      toast.success(res.data.msg);
      
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to add to cart");
      
    }
  };

  const handleDeleteProduct=async(productId)=>{
    try {
      const res=await deleteProduct(productId);
      toast.success(res.data.msg);
        fetchProducts();
      
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to delete product");
    
      
    }
  }

  if (loading) return <h3>Loading products....</h3>;

  return (
    <div>
      <div className='product-container'>
        {Products.map((product) => (
          <div key={product._id} className='product-card'>
            <img 
              src={product.productImage}
              alt={product.productName}
              className='product-image'
            />
            <h3>{product.productName}</h3>
            <p>Category: {product.category}</p>
            <p>Price: ₹{product.price}</p>
            <p>Rating: ⭐ {product.rating}</p>
            {product.isFreeDelivery && (
              <p style={{ color: "green" }}>Free Delivery</p>
            )}
            {token &&(
              <div className='quantity-control'>
                <button  onClick={()=>
                  handleQuantityChange(
                    product._id,
                    Math.max(1,quantities[product._id]-1)
                  )
                }>
                  -
                </button>

                <input
                 type="number" 
                 min="1"
                 value={quantities[product._id]}
                 onChange={(e)=>
                  handleQuantityChange(
                    product._id,
                    Math.max(1,Number(e.target.value))
                  )
                 }
                 />

                 <button
                 onClick={()=>
                  handleQuantityChange(product._id,quantities[product._id]+1)
                 } 
                 >
                  +

                 </button>

              </div>
            )}
            {token&&
            <>
            <button onClick={()=>handleAddToCart(product._id)}
            className='add-to-cart-btn'

            >
              Add To Cart

            </button>
            <button 
            onClick={()=>navigate(`/edit-product/${product._id}`)}
            className='edit-btn'
            >
              Edit Product

            </button>

              <button
              onClick={()=>handleDeleteProduct(product._id)}
              className='delete-btn'
              >
                Delete Product

              </button>

            </>
            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home;
