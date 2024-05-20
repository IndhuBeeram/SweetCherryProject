import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./CSS/Login.css";

export default function Login() {
  const [token, setToken] = useState();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/api/login", data)
      .then((res) => {
        toast.success("Logged in Successfully",{autoClose:3000});

        const token = res.data.token;
        localStorage.setItem("token", token);

        const UserId = jwtDecode(token).user.id;
        // console.log(UserId);

        localStorage.setItem("userId", UserId);
        setToken(token);
      })

      .catch((err) => {
        console.log(err);
        toast.error("Incorrect Email or Password",{autoClose:3000});
      });
  };
  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="authenticateBoxL col-12 col-t-12 col-m-12">
      <h4>Already Registered?</h4>
      <form onSubmit={submitHandler}>
        <p>
          <label htmlFor="emailL">
            <strong>Email</strong>
          </label>
          <input
            type="email"
            placeholder="Enter email"
            id="emailL"
            autoComplete="off"
            name="email"
            required
            onChange={changeHandler}
          />
        </p>

        <p>
          <label htmlFor="passwordL">
            <strong>Password</strong>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            id="passwordL"
            autoComplete="off"
            name="password"
            required
            onChange={changeHandler}
          />
        </p>

        <button type="submit">Login</button>

        <a href="#">Forgot your password?</a>
      </form>
    </div>
  );
}
