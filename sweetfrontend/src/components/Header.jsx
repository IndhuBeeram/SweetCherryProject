import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./CSS/Header.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartItems, fetchUserDetails } from "../store/slice/getUserslice";
import { IoCartOutline } from "react-icons/io5";

export default function Header() {
  const token = localStorage.getItem("token");
  
  const cartData = useSelector((state) => state.api.cartData);
  const userData = useSelector((state) => state.api.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    dispatch(fetchCartItems(userId));
    dispatch(fetchUserDetails(userId));
  }, [token]);
  

  const cartItems = cartData?.[0]?.product;
  const cartLength = cartItems ? cartItems.length : 0;
  const userName = userData ? userData.name : "";

  return (
    <div className="body">
      <header>
        <div className="headerLogo">
          <img src="./headerImage.jpg" alt="The Cupcake Maker Logo" />
          The Cupcake Maker
        </div>
        <div className="right-column">
          <NavLink
            className="navl"
            to="/cart"
            style={{ position: "relative", display: "inline-block" }}
          >
            <IoCartOutline style={{ fontSize: "30px" }} />
            <span
              style={{
                fontSize: "12px",
                position: "absolute",
                top: "-2px",
                right: "15px",
              }}
            >
              {cartLength}
            </span>
          </NavLink>

          {token ? (
            <div className="welcomemessage">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Hi {userName}
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="/wishlist">
                    Wishlist <i className="bi bi-heart"></i>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/myaccount">
                    My Account <i className="bi bi-person"></i>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/address">
                    Address
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="/"
                    onClick={handleLogOut}
                  >
                    Logout <i className="bi bi-box-arrow-right"></i>
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <NavLink className="navl" to="/login">
              Login
            </NavLink>
          )}
        </div>
      </header>
    </div>
  );
}
