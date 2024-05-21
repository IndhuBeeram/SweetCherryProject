import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

import "./CSS/View.css";
import NavBar from "../components/Navbar";
import SideBar from "../components/Sidebar"
import { toast } from "react-toastify";
import {  useDispatch } from "react-redux";
import { fetchCartItems } from "../store/slice/getUserslice";

const ProductDetails = () => {
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "",
    price: 0,
    imageUrl: "",
    _id: "",
  });
  const { id } = useParams();
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await fetch(
          `http://localhost:4000/api/wishlist/${userId}`
        );
        const data = await response.json();
        console.log(data);

        if (data[0] && data[0].product) {
          const dataArray = data[0].product;
          setWishlist(dataArray);
          console.log(dataArray);
        } else {
          console.error("Product data not found in response:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchCartData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await fetch(
          `http://localhost:4000/api/cart/${userId}`
        );
        const data = await response.json();
        console.log(data);

        if (data[0] && data[0].product) {
          const dataArray = data[0].product;
          setCart(dataArray);
          console.log(dataArray);
        } else {
          console.error("Product data not found in response:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCartData();
    fetchData();
  }, []);
  // console.log("first wishlist:",wishlist)

  useEffect(() => {
    const populateProductByID = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/products/${id}`);
        setData(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    populateProductByID();
  }, [id]);
  const addToCart = async (pId) => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        toast.warn("Please log in to add products to your cart");

        return;
      }
      const response = await axios.put(
        `http://localhost:4000/api/cart/add/${userId}`,
        { product: pId }
      );
      setCart(response.data.product);
      dispatch(fetchCartItems(userId));
      // toast.success("Product added to cart successfully",{autoClose:2000});
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const addToWishlist = async (pId) => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        toast.warn("Please log in to add products to your cart",{autoClose:3000});

        return;
      }
      const response = await axios.put(
        `http://localhost:4000/api/wishlist/add/${userId}`,
        { product: pId }
      );
      setWishlist(response.data.product);
      // toast.success("Product added to wishlist successfully",{autoClose:2000});
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const removeFromWishlist = async (pId) => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        return;
      }
      const response = await axios.put(
        `http://localhost:4000/api/wishlist/add/${userId}`,
        { product: pId }
      );
      setWishlist(response.data.product);
      toast.success("Product removed from wishlist successfully",{autoClose:2000});
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  const isProductInWishlist = (prodId) => {
    return wishlist && wishlist.includes(prodId);
  };
  const isProductInCart = (prodId) => {
    return cart && cart.includes(prodId);
  };
  console.log("Final wishlist:", wishlist);
  console.log("Final Cart:", cart);

  return (
    <>
    <NavBar/>
      <div className="row mainRowV">
        <SideBar/>
        <main className="col-9 col-t-8 col-m-12">
          <div className="captionV col-12 col-t-12 col-m-12">
            <h4>{data.name}</h4>
          </div>
          <div className="row"> </div>
          <div className="cupcakeDivV col-12 col-t-12 col-m-12">
            <div className="cupcakeDiv" key={data._id}>
              <div className="cupcakeImgV">
                <img src={"/" + data.imageUrl} alt={data.name} />
              </div>
              <div className="cupcakeTextV">
                <p>{data.description}</p>
                <em>Rs. {data.price}</em>
                {isProductInCart(data._id) ? (
                  <NavLink to={"/cart"}>
                    <button type="submit">Go to cart</button>
                    <br />
                  </NavLink>
                ) : (
                  <>
                    <button onClick={() => addToCart(data._id)} type="submit">
                      Add to cart
                    </button>
                    <br />
                  </>
                )}

                {/* <button onClick={()=>addToCart(data._id)} type="submit">Add to cart</button><br /> */}
                {isProductInWishlist(data._id) ? (
                  <button
                    onClick={() => removeFromWishlist(data._id)}
                    className="btn btn-danger"
                  >
                    Remove from Wishlist
                  </button>
                ) : (
                  <button
                    onClick={() => addToWishlist(data._id)}
                    className="btn btn-success"
                  >
                    Add to Wishlist
                  </button>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ProductDetails;
