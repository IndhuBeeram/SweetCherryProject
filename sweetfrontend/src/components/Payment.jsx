import React, { useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import axios from 'axios';
import NavBar from "../components/Navbar";
import SideBar from "../components/Sidebar"
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import {  useDispatch } from "react-redux";
import { fetchCartItems } from "../store/slice/getUserslice";
const PaymentForm = () => {
  const total = localStorage.getItem("total");
  const amount = total + "00";
  const currency = "INR";
  const navigate=useNavigate();
  const receiptId = "qwsaq1";
  const [data, setData] = useState({});
  const [adress,setAdress]=useState();
  const [cartItems, setCartItems] = useState([]);
  const [productData, setProductData] = useState({});
  const [productQuantities, setProductQuantities] = useState({});
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const {id}=useParams();
  console.log(id)

  useEffect(()=>{
    if(!userId){
      navigate("/")
    }
  },[])
  const ProfileHandler = async () => {
    try {
     
      const response = await axios.get(`http://localhost:4000/api/${userId}`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error.message);
    }
  };
  const AddresseHandler = async () => {
    try {
     
      const response = await axios.get(`http://localhost:4000/api/address/${userId}/${id}`);
      const address=response.data
      setAdress(address.address.Address[0])
    } catch (error) {
      console.error("Error fetching user profile:", error.message);
    }
  };

  useEffect(() => {
    ProfileHandler();
    AddresseHandler();
  }, []);

  const name = data.name;
  const email = data.email;

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await fetch(`http://localhost:4000/api/cart/${userId}`);
        const data = await response.json();

        if (data[0] && data[0].product) {
          const dataArray = data[0].product;
          setCartItems(dataArray);
        } else {
          console.error("Product data not found in response:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCartData();
  }, []);

  useEffect(() => {
    const fetchAllProducts = async (productId) => {
      try {
        const res = await axios.get(`http://localhost:4000/api/products/${productId}`);
        const { name, description, price, category, imageUrl } = res.data;

        setProductData((prevDetails) => ({
          ...prevDetails,
          [productId]: {
            name,
            description,
            price,
            category,
            imageUrl,
          },
        }));
      } catch (err) {
        console.error(`Error fetching products: ${err}`);
      }
    };

    cartItems.forEach((pId) => {
      if (!productData[pId]) {
        fetchAllProducts(pId);
      }
    });
  }, [cartItems, productData]);

  useEffect(() => {
    const quantities = {};
    cartItems.forEach((productId) => {
      const quantity = localStorage.getItem(`count_${productId}`);
      if (quantity) {
        quantities[productId] = parseInt(quantity, 10);
      }else{
        quantities[productId]=1;
      }
    });
    setProductQuantities(quantities);
  }, [cartItems]);
  

  const paymentHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/order', {
        amount,
        currency,
        receipt: receiptId,
      });
      const order = response.data;
  
      var options = {
        key: 'rzp_test_rXhXsMtPumJf9g',
        amount,
        currency,
        name: 'Sweet Cherry Cupcake',
        description: 'Test Transaction',
        image: 'https://example.com/your_logo',
        order_id: order.id,
        handler: async function (response) {
          const body = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            userId,
            name,
            email,
            cupcakes: cartItems.map((productId) => ({
              productId,
              name: productData[productId].name,
              price: productData[productId].price,
              quantity: productQuantities[productId],
            })),
            totalAmount: total,
            address: adress,
          };
  
          try {
            const validateRes = await axios.post('http://localhost:4000/order/validate', body);
            console.log(validateRes.data);
            toast.success('Order successful!', {
              onClose: () => {
                navigate('/');
              },
            });
            setCartItems([]);
            cartItems.forEach((productId) => {
              localStorage.removeItem(`count_${productId}`);
            });

            dispatch(fetchCartItems(userId));
          } catch (error) {
            console.error('Order validation failed:', error);
            toast.error('Order validation failed. Please try again.');
          }
        },
        prefill: { name, email },
        notes: { address: 'Razorpay Corporate Office' },
        theme: { color: '#3399cc' },
      };
      var rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
      rzp1.open();
    } catch (error) {
      console.error('Payment failed:', error);
      toast.error('Payment failed. Please try again later.');
    }
  };
  
  
// console.log("Adress",adress)

  return (
    <>
      <NavBar/>
      <div className="row mainRow">
      <SideBar/>
        <main className="col-9 col-t-8 col-m-12">
          <div className="caption col-12 col-t-12 col-m-12">
            <h4>Payment Page</h4>
          </div>
          
          <div className='cupcakeCart'>
            <h6><strong>Order Summary</strong></h6>
            <strong>Name:</strong> {name}<br/>
           <strong>Email:</strong> {email}<br/>
           <strong>CupCakes Ordered: </strong><br/>

            {cartItems.map((productId) => (
              <div key={productId} className="">
                {productData[productId] && (
                  <div className="adjust">
                    {productData[productId].name}        Rs. {productData[productId].price}      Quantity {productQuantities[productId]}
                  </div>
                )}
              </div>
            ))}
            <div>
              { adress &&(
                <>
              <strong>Address: </strong>
              
              {adress.name}, {adress.addresstype},{" "}
                      {adress.mobilenum}, {adress.address},{" "}
                      {adress.locality}, {adress.city}, {adress.state},{" "}
                      {adress.alternatephonenumber}, {adress.pincode}
                      </>
              )}
            </div>
         
          
          <div>
            <h4>Total Amount: {total}</h4>
          </div>

          <div className="d-flex justify-content-between align-items-center">
    <NavLink to="/cart" >
        <button >Back</button>
    </NavLink>
    <div style={{ marginRight: '10px' }}></div> 
    <button onClick={paymentHandler} className="btn btn-primary">Pay Now</button>
</div>         
          </div>
        </main>
      </div>
    </>
  );
};

export default PaymentForm;
