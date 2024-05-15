// Header.jsx

import React, { useEffect,useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./CSS/Header.css";
import axios from "axios";

export default function Header() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };

  const [data,setData]=useState({
    name: "",
});

const userId=localStorage.getItem('userId');
console.log(userId);

const ProfileHandler = async () => {
    try {
        const userId = localStorage.getItem('userId');
        console.log(userId)
        const response = await axios.get(`http://localhost:4000/api/${userId}` );
       
        setData(response.data);
    } catch (error) {
        console.error('Error fetching user profile:', error.message);
    }
};


useEffect(() => {
    ProfileHandler();
}, [userId]);

  return (
    <div className="body">
      <header>
        <div className="headerLogo">
          <img src="./headerImage.jpg" alt="The Cupcake Maker Logo" />
          The Cupcake Maker
        </div>
        <div className="right-column">
          <NavLink className="navl" to="/cart">
            Cart
          </NavLink>
          <NavLink className="navl" to="/wishlist">
            Wishlist
          </NavLink>
          
          {token ? (
            <div className="welcomemessage">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Hi {data.name}
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="/wishlist">
                    Wishlist <i class="bi bi-heart"></i>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/myaccount">
                    My Account <i class="bi bi-person"></i>
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
                    Logout <i class="bi bi-box-arrow-right"></i>
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
