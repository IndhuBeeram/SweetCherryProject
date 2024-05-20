import React, { useEffect, useState, lazy, Suspense } from "react";
import { toast } from "react-toastify";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/CSS/Home.css";
import {  useDispatch } from "react-redux";
import { fetchCartItems } from "../store/slice/getUserslice";
import NavBar from "../components/Navbar";
// import SideBar from "../components/Sidebar"

const LazySideBar = lazy(() => import("../components/Sidebar"));

const Home = () => {
  const { category } = useParams("");
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();

  console.log("category :", category);
  const [productData, setProductData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);

  
    
  const fetchAllProducts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/products");
      setProductData(res.data);
      console.log(res.data);
    } catch (err) {
      console.error(`Error fetching products: ${err}`);
    }
  };

  const fetchCatgoryProducts = async (searchTerm) => {
    console.log(searchTerm);
    try {
      const response = await axios.get(
        "http://localhost:4000/api/products/search?q=" + searchTerm
      );
      setProductData(response.data);
    } catch (err) {
      console.error(`Error fetching products: ${err}`);
    }
  };

  useEffect(() => {
    const fetchcartData = async () => {
      try {
        // const userId = localStorage.getItem("userId");
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
    fetchcartData();
  }, []);

  useEffect(() => {
    if (category === "New") {
      fetchAllProducts().then(() => {
        setProductData((prevData) => prevData.slice(-10).reverse());
      });
    } else if (category) {
      fetchCatgoryProducts(category);
    } else {
      fetchAllProducts();
    }
  }, [category]);

  useEffect(() => {
    if (searchTerm) {
      fetchCatgoryProducts(searchTerm);
    } else {
      fetchAllProducts();
    }
  }, [searchTerm]);
 
  const addToCart = async (pId) => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        toast.warn("Please log in to add products to your cart",{autoClose:3000});
        return;
      }
      const response = await axios.put(
        `http://localhost:4000/api/cart/add/${userId}`,
        { product: pId }
      );
      setCart(response.data.product);
      dispatch(fetchCartItems(userId));
      toast.success("Product added to cart successfully", {
        autoClose: 2000 
    });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const isProductInCart = (prodId) => {
    return cart && cart.includes(prodId);
  };

  let headingMap = {
    New: "New Cupcakes",
    Premium: "Premium Cupcakes",
    Gifts: "Gifts Cupcakes",
    Birthday: "Birthday Cupcakes",
    Custom: "Custom Cupcakes",
    Cartoon: "Cartoon Cupcakes",
    Cheese: "Cheese Cupcakes",
    Eggless: "Eggless Cupcakes",
    Midnight: "Midnight Cupcakes",
    Special: "Special Cupcakes",
  };

  let heading = headingMap[category] || "Featured Products";

  return (
    <>
   
      <NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="row mainRow">
        <Suspense fallback={<div>Loading Sidebar...</div>}>
          <LazySideBar />
        </Suspense>
        <main className="col-9 col-t-8 col-m-12">
          <div className="caption col-12 col-t-12 col-m-12">
            <h4>{heading}</h4>
          </div>
          <div className="row">
            {productData.map((cupcake) => (
              <div
                key={cupcake._id}
                className="cupcakeDiv col-3 col-t-6 col-m-6"
              >
                <img src={cupcake.imageUrl} alt={cupcake.name} />
                <div>
                  <div className="cupcakeText">
                    <h3>{cupcake.name}</h3>
                    {cupcake.description}
                  </div>
                </div>
                <h4>Rs. {cupcake.price}</h4>
                <NavLink className="link" to={`/productDetails/${cupcake._id}`}>
                  View
                </NavLink>
                {isProductInCart(cupcake._id) ? (
                  <NavLink className="link" to={"/cart"} type="submit">
                    Go to cart
                    <br />
                  </NavLink>
                ) : (
                  <NavLink
                    className="link"
                    onClick={() => addToCart(cupcake._id)}
                    type="submit"
                  >
                    Add to cart
                    <br />
                  </NavLink>
                )}
              </div>
            ))}
          </div>
          <div className="row"></div>
          <div className="cupcakeOrderInfo col-12 col-t-12 col-m-12">
            <h3>
              Cupcakes Delivered Online with <em>The Cupcake Maker</em>
            </h3>
            <p>
              Cupcakes make delightful treats for any special occasion. Online
              cupcake order is a boon for shoppers. At The Cupcake Maker we
              offer a variety of designer cupcakes that are sure to impress. The
              soccer cupcake is just right for the sports fan. It works well to
              celebrate the victory of a soccer player. It will add the
              requisite sweetness to his joy. This cake is available in 6 pieces
              for online delivery and can be made in four flavors namely
              Chocolate, Butterscotch, Pineapple and Vanilla. The rose cupcake
              is a delight. It adds an element of fun to any celebration be it a
              Birthday, Anniversary, Christmas or New Years. This is 8 pieces,
              available in four flavors namely Chocolate, Butterscotch,
              Pineapple and Vanilla. The special photo cupcake is a personalized
              cupcake which carries the stamp of individuality of the recipient.
              Just send in the photograph of the person you wish to celebrate
              and we will do the rest. It adds a personal touch to any
              celebration be it a Birthday, Anniversary, or Christening. Our
              home delivery service will deliver the goods to you in time and in
              a good condition. So go ahead and treat your loved ones. Cupcakes
              are perfect indulgence for any occasion and are quite hard to
              resist. The fresh and spongy texture makes it the best gift to be
              chosen for your loved ones. At The Cupcake Maker, we have baked
              all our cupcakes with utmost love, care and affection so that
              every bite that you take transports you to the heavenly feeling.
            </p>
          </div>
        </main>
        <div className="row"></div>
        <footer>&copy; The Cupcake Maker, All rights reserved.</footer>
      </div>
    </>
  );
};

export default Home;
