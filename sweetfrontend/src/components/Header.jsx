import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./CSS/Header.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "../store/slice/getUserslice";
import { IoCartOutline } from "react-icons/io5";

export default function Header() {
  const token = localStorage.getItem("token");
  const data = useSelector((state) => state.api.data);
  const cartItems = data?.[0]?.product;
  const cartLength = cartItems ? cartItems.length : 0;

  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };

  const [data1, setData] = useState({
    name: "",
  });

  const userId = localStorage.getItem("userId");

  const ProfileHandler = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/${userId}`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error.message);
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    const UserId = localStorage.getItem("userId");

    dispatch(fetchCartItems(UserId));
  });

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
          <NavLink
            className="navl"
            to="/cart"
            style={{ position: "relative", display: "inline-block" }}
          >
            <IoCartOutline style={{ fontSize: "20px" }} />
            <span
              style={{
                fontSize: "12px",
                position: "absolute",
                top: "-2px",
                right: "19px",
              }}
            >
              {cartLength}
            </span>
          </NavLink>

          <NavLink className="navl" to="/wishlist">
            <i class="bi bi-heart"></i>
          </NavLink>

          {token ? (
            <div className="welcomemessage">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Hi {data1.name}
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
                  <a className="dropdown-item" href="/" onClick={handleLogOut}>
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
