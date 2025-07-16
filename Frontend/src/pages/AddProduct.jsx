import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./login.css"
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../services/productService';

const AddProduct = () => {
  const [productData, setProductData] = useState({
    productName: '',
    productImage: '',
    description: '',
    price: '',
    category: '',
    rating: '',
    isFreeDelivery: '',

  })
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: name === 'isFreeDelivery' ? value === 'true' : value,

    })
  };

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      toast.error("Please login first to add products");
      navigate("/");
    }
  }, [token, navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const { productName, productImage, description, price, category, rating, isFreeDelivery } = productData
    if (!productName || !productImage || !description || !price || !category || !rating || isFreeDelivery === "") {
      toast.error("Please fill all fields correctly!");
      return;
    }
    try {
      const response=await addProduct(productData);
       toast.success("Product added successfully!");

      setProductData({
        productName: '',
        productImage: '',
        description: '',
        price: '',
        category: '',
        rating: '',
        isFreeDelivery: '',


      });

    } catch (error) {
      
    }

  }

  return (
    <div>
      <form onSubmit={handleSubmit} className='login-form'>
        <h4>Add Products</h4>
        <input
          type="text"
          name="productName"
          placeholder="Enter product Name"
          value={productData.productName}
          onChange={handleChange}
          className="input-field"
          required
        />
        <input
          type="text"
          name="productImage"
          placeholder="Enter product Image url"
          value={productData.productImage}
          onChange={handleChange}
          className="input-field"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Enter product Description"
          value={productData.description}
          onChange={handleChange}
          className="input-field"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Enter product Price"
          value={productData.price}
          onChange={handleChange}
          className="input-field"
          required
        />
        <select name="category"
          id=""
          value={productData.category}
          onChange={handleChange}
          className="input-field"
          required
        >
          <option value="">Select Category</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="food">Food</option>
          <option value="books">Books</option>
          <option value="furniture">Furniture</option>
        </select>
        <input
          type="number"
          name='rating'
          placeholder="Enter product Rating"
          value={productData.rating}
          onChange={handleChange}
          min={1}
          max={5}
          className="input-field"
          required

        />
        <select name="isFreeDelivery"
          id=""
          value={productData.isFreeDelivery}
          onChange={handleChange}
          className="input-field"
          required
        >
          <option value="">-- Select isFreeDelivery--</option>
          <option value="true">Yes</option>
          <option value="false">No</option>

        </select>
        <button type='submit'>Add Products</button>

      </form>
    </div>
  )
}

export default AddProduct;
