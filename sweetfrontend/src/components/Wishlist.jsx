import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import NavBar from "./Navbar";
import axios from "axios";
import SideBar from "./Sidebar";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { fetchCartItems } from "../store/slice/getUserslice";
import "./CSS/wishlist.css"

const Wishlist = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [wishlistItems, setWishlistItems] = useState([]);
  const [productData, setProductData] = useState({});
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/wishlist/${userId}`
        );
        const data = await response.json();

        if (data[0] && data[0].product) {
          const dataArray = data[0].product;
          setWishlistItems(dataArray);
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

    if (userId) {
      fetchWishlistItems();
    }
  }, [userId]);

  useEffect(() => {
    const fetchAllProducts = async (productId) => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/products/${productId}`
        );
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

    wishlistItems.forEach((pId) => {
      if (!productData[pId]) {
        fetchAllProducts(pId);
      }
    });
  }, [wishlistItems, productData]);

  const removeProductFromWishlist = async (productId) => {
    console.log("removeid:", productId);
    console.log("remove user:", userId);
    try {
      await axios.put(`http://localhost:4000/api/wishlist/add/${userId}`, {
        product: productId,
      });
      setWishlistItems((prevItems) =>
        prevItems.filter((product) => product !== productId)
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addToCart = async (pId) => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        return;
      }
      const response = await axios.put(
        `http://localhost:4000/api/cart/add/${userId}`,
        { product: pId }
      );
      setCart(response.data.product);
      dispatch(fetchCartItems(userId));
      toast.success("Product added to cart successfully", { autoClose: 2000 });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const isProductInCart = (prodId) => {
    return cart && cart.includes(prodId);
  };

  return (
    <>
      <NavBar />
      <div className="row mainRow">
        <SideBar />
        <main className="col-9 col-t-8 col-m-12">
          <div className="caption col-12 col-t-12 col-m-12">
            <h4>Wishlist</h4>
          </div>
          <div className="row">
            {wishlistItems.length === 0 ? (
              <div className="emptywishlist">
                <img src="wishlist.png" alt="Empty Wishlist" />
               
              </div>
            ) : (
              wishlistItems.map((productId) => (
                <div key={productId} className="cupcakeDiv col-3 col-t-6 col-m-6">
                  {productData[productId] && (
                    <div>
                      <img
                        src={productData[productId].imageUrl}
                        alt={productData[productId].name}
                      />
                      <div className="cupcakeText">
                        <h3>{productData[productId].name}</h3>
                        {productData[productId].description}
                      </div>
                      <h4>Rs. {productData[productId].price}</h4>
                      {isProductInCart(productId) ? (
                        <NavLink to={"/cart"}>
                          <button className="link" type="submit">
                            Go to cart
                          </button>
                          <br />
                        </NavLink>
                      ) : (
                        <>
                          <button
                            className="link"
                            onClick={() => addToCart(productId)}
                            type="submit"
                          >
                            Add to cart
                          </button>
                          <br />
                        </>
                      )}
                      <button
                        className="link"
                        type="submit"
                        onClick={() => removeProductFromWishlist(productId)}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </main>
        <footer>&copy; The Cupcake Maker, All rights reserved.</footer>
      </div>
    </>
  );
};

export default Wishlist;
