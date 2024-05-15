import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import NavBar from "./Navbar";
import SideBar from "./Sidebar";
import { toast } from "react-toastify";
const MyAccount = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);
  const [data, setData] = useState({
    name: "",
    email: "",
    age: 0,
    gender: "",
    _id: "",
  });

  const userId = localStorage.getItem("userId");
  console.log(userId);

  const ProfileHandler = async () => {
    try {
      const userId = localStorage.getItem("userId");
      console.log(userId);
      const response = await axios.get(`http://localhost:4000/api/${userId}`);

      setData(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error.message);
    }
  };

  useEffect(() => {
    ProfileHandler();
  }, []);
  return (
    <>
      <NavBar />

      <div className="row mainRowV">
        <SideBar />
        <main className="col-9 col-t-8 col-m-12">
          <div className="container shadow-lg p-3 mb-5 mt-5 bg-white rounded p-5">
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-12">
                    <h1 className="book-header">
                      <div className="row">
                        <div className=" col xs={6} sm={6} md={6} lg={6}">
                          <i className="glyphicon glyphicon-file"></i> Welcome{" "}
                          {data.name}
                        </div>
                        <div className="col xs={6} sm={6} md={6} lg={6} d-flex flex-row-reverse">
                          <NavLink to={`/edit/${data._id}`}>
                            <button
                              type="button"
                              className="btn btn-primary shadow-lg"
                            >
                              <i className="bi bi-pencil-square"></i> Edit
                            </button>
                          </NavLink>{" "}
                        </div>
                      </div>
                    </h1>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <p>
                        <strong>Name:</strong> {data.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {data.email}
                      </p>

                      <p>
                        <strong>Gender:</strong> {data.gender}
                      </p>
                      <p>
                        <strong>Age:</strong> {data.age}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
export default MyAccount;
