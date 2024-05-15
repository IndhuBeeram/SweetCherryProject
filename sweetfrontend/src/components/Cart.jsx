import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./Navbar";
import axios from "axios";
import SideBar from "./Sidebar";
import "./CSS/Cart.css";
import { NavLink } from "react-router-dom";

const Cart = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState([]);
    const [productData, setProductData] = useState({});
    const [count, setCount] = useState({});
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, []);

    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/cart/${userId}`);
                const data = await response.json();

                if (data[0] && data[0].product) {
                    const dataArray = data[0].product;
                    const countObj = {};
                    dataArray.forEach(productId => {
                        // Retrieve count value from localStorage, default to 1 if not found
                        countObj[productId] = parseInt(localStorage.getItem(`count_${productId}`)) || 1;
                    });
                    setCartItems(dataArray);
                    setCount(countObj);
                } else {
                    console.error('Product data not found in response:', data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (userId) {
            fetchCartItems();
        }
    }, [userId]);

    useEffect(() => {
        const fetchAllProducts = async (productId) => {
            try {
                const res = await axios.get(`http://localhost:4000/api/products/${productId}`);
                const { name, description, price, category, imageUrl } = res.data;

                setProductData(prevDetails => ({
                    ...prevDetails,
                    [productId]: {
                        name,
                        description,
                        price,
                        category,
                        imageUrl
                    }
                }));
            } catch (err) {
                console.error(`Error fetching products: ${err}`)
            }
        }

        let totalPrice = 0;

        cartItems.forEach(pId => {
            if (!productData[pId]) {
                fetchAllProducts(pId);
            } else {
                totalPrice += productData[pId].price * count[pId]; 
            }
        })
        setTotal(totalPrice);

    }, [cartItems, productData, count]);

    const updateCountInStorage = (productId, newCount) => {
        localStorage.setItem(`count_${productId}`, newCount);
    };
    const cartCountP=cartItems.length;
    localStorage.setItem("cartCoutP",cartCountP);

    const removeProductFromCart = async (productId) => {
        try {
            await axios.put(`http://localhost:4000/api/cart/add/${userId}`, { product: productId });
            setCartItems(prevItems => prevItems.filter(product => product !== productId));
            setCount(prevCount => {
                const newCount = { ...prevCount };
                delete newCount[productId]; 
                // Remove count value from localStorage
                localStorage.removeItem(`count_${productId}`);
                return newCount;
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const incrementCount = (productId) => {
        const newCount = (count[productId] || 0) + 1;
        setCount(prev => ({
            ...prev,
            [productId]: newCount
        }));
        updateCountInStorage(productId, newCount);
    }

    const decrementCount = (productId) => {
        if (count[productId] > 1) {
            const newCount = count[productId] - 1;
            setCount(prev => ({
                ...prev,
                [productId]: newCount
            }));
            updateCountInStorage(productId, newCount);
        }
    }

    console.log(cartItems.length);
    return (
        <>
            <NavBar />
            <div className="row mainRow">
                <SideBar />
                <main className="col-9 col-t-8 col-m-12">
                    <div className="caption col-12 col-t-12 col-m-12">
                        <h4>Cart</h4>
                    </div>
                    <div className="cupcakeCart">

                        {cartItems.map(productId => (
                           
                            <div key={productId} className="cupcakeCart">
                                {productData[productId] && (
                                    <>
                                    <div className="adjust">
                                        <img src={productData[productId].imageUrl} alt={productData[productId].name} />
                                        <div style={{marginLeft:100}}>

                                        <h3>{productData[productId].name}</h3>
                                        <h4>Rs. {productData[productId].price * count[productId]}</h4>
                                        {productData[productId].description}
                                        </div>
                            
                                    </div>
                                    <div className="quantityButtons">
                                            <button onClick={() => incrementCount(productId)}><i className="bi bi-plus-circle"></i></button>
                                            <h4>{count[productId]}</h4>
                                            <button onClick={() => decrementCount(productId)} disabled={count[productId] === 1}><i className="bi bi-dash-circle"></i></button>
                                    
                                        <button  type="submit" onClick={() => { removeProductFromCart(productId); } }>Remove</button>
                                        </div>
                                        
                                    </>

                                    
                                )}
                            </div>
                           
                        ))}

                        <h4 className="totalPrice">Total Price: {total}</h4>
                       <NavLink to={"/address"}> <button>Place Order</button></NavLink>
                    </div>
                </main>

                <footer>
                    &copy; The Cupcake Maker, All rights reserved.
                </footer>
            </div>
        </>
    );
}

export default Cart;
