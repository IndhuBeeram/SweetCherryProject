import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../components/Navbar";
import SideBar from "../components/Sidebar"


const ProfileEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",

    age: "",
    gender: "",
  });
  const baseUrl = "http://localhost:4000/api";
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await axios.get(`${baseUrl}/${id}`);
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching page details:", error.message);
      }
    };
    fetchData();
  }, []);

  const handleChange = async (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.put(`${baseUrl}/edit/${id}`, data);
    toast.success("User updated successfully");
    navigate("/myprofile");
  };
  return (
    <>
      
      <NavBar/>
      <div className="row mainRowV">
       <SideBar/>
        <main className="col-9 col-t-8 col-m-12">
          <div className="border border dark rounded container-fluid w-50 shadow-lg p-3 mb-5 mt-5 bg-white rounded">
            <h3 className="text-center mb-4">Edit Profile</h3>
            <form>
              <div className="form-group">
                <label htmlFor="name" className="col-form-label">
                  Full Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={data.name}
                  id="name"
                  onChange={handleChange}
                  name="name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="age" className="col-form-label">
                  Age:
                </label>
                <input
                  type="number"
                  className="form-control"
                  value={data.age}
                  id="age"
                  onChange={handleChange}
                  name="age"
                />
              </div>
              <div className="form-group">
                <label htmlFor="gender" className="col-form-label">
                  Gender:
                </label>
                <select
                  className="form-control"
                  value={data.gender}
                  id="gender"
                  onChange={handleChange}
                  name="gender"
                >
                  <option>Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <br />

              <div className="text-center d-flex flex-row-reverse">
                <button
                  type="submit"
                  onClick={handleUpdate}
                  className="btn btn-primary"
                >
                  Update
                </button>
                <NavLink to="/userprofile">
                  <button
                    type="button"
                    className="btn btn-secondary me-2"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                </NavLink>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};
export default ProfileEdit;
