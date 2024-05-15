import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, useNavigate } from "react-router-dom";
import SideBar from "../components/Sidebar";
import Login from "./Login";
import "./CSS/Login.css";
import NavBar from "./Navbar";
import Header from "./Header";

export default function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmpassword) {
      toast.error(
        "Please make sure password and confirm password are the same."
      );
      return;
    }

    try {
      const res = await axios.post("http://localhost:4000/api/register", data);
      toast.success(res.data);

      navigate("/login");
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data;

      if (errorMessage) {
        toast.error("User already exists");
      } else {
        console.error("Error:", err);
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  const handleShowPasswordToggle = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <>
      <NavBar />
      <div className="row mainRow">
        <SideBar />
        <main className="col-9 col-t-8 col-m-12">
          <div className="caption col-12 col-t-12 col-m-12">
            <h4>Authentication</h4>
          </div>
          <div className="row"></div>
          <form onSubmit={submitHandler}>
            <div className="authenticateBox col-12 col-t-12 col-m-12">
              <h4>Create an Account</h4>

              <div>
                <p>
                  <label htmlFor="name">
                    <strong>Name</strong>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    id="name"
                    autoComplete="off"
                    name="name"
                    onChange={changeHandler}
                    required
                  />
                </p>
              </div>
              <div>
                <p>
                  <label htmlFor="email">
                    <strong>Email</strong>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter email Ex: abc@gmail.com"
                    id="email"
                    autoComplete="off"
                    name="email"
                    onChange={changeHandler}
                    required
                  />
                </p>
              </div>

              <p>
                <label htmlFor="age">
                  <strong>Age</strong>
                </label>
                <input
                  type="Number"
                  min="0"
                  placeholder="Enter you're age"
                  id="age"
                  autoComplete="off"
                  name="age"
                  onChange={changeHandler}
                />
              </p>

              <div className="gender d-flex ms-10">
                <p>
                  <label htmlFor="gender">
                    <strong>Gender</strong>
                  </label>
                </p>

                <div className="radio">
                  <p>
                    <input
                      type="radio"
                      id="htmlMale"
                      name="gender"
                      value="Male"
                      onChange={changeHandler}
                    />
                    <label htmlFor="htmlMale">Male</label>
                  </p>
                  <p>
                    <input
                      type="radio"
                      id="htmlF"
                      name="gender"
                      value="Female"
                      onChange={changeHandler}
                    />
                    <label htmlFor="htmlF">Female</label>
                  </p>
                </div>
              </div>

              <p>
                <label htmlFor="password">
                  <strong>Password</strong>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  id="password"
                  autoComplete="off"
                  name="password"
                  onChange={changeHandler}
                  required
                  minLength="6"
                />
                <br />
                <input
                  type="checkbox"
                  id="showPassword"
                  className="check"
                  onChange={handleShowPasswordToggle}
                />
                <label htmlFor="showPassword" className="form-check-label">
                  {" "}
                  &nbsp; Show Password
                </label>
              </p>

              <p>
                <label htmlFor="confirmpassword">
                  <strong>Confirm Password</strong>
                </label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  id="confirmpassword"
                  autoComplete="off"
                  name="confirmpassword"
                  onChange={changeHandler}
                  required
                />
              </p>

              <button type="submit">Create an account</button>
            </div>
          </form>
          <Login />
        </main>
      </div>
    </>
  );
}
