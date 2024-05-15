import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./Navbar";
import SideBar from "./Sidebar";
import "./CSS/Address.css";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Address = () => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [data, setData] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [editedAddress, setEditedAddress] = useState({
    name: "",
    mobilenum: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    alternatephonenumber: "",
    addresstype: "",
  });

  const { addressId } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const fetchAddress = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/address/${userId}`
      );
      const responseData = response.data;
      console.log(response.data);
      if (
        responseData &&
        responseData.success &&
        responseData.addresses &&
        responseData.addresses.length > 0
      ) {
        const addresses = responseData.addresses[0].Address;
        setData(addresses);
      } else {
        console.error("Invalid data structure in API response:", responseData);
      }
    } catch (error) {
      console.error("Error fetching address data:", error);
    }
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setShowEditForm(false);
    setEditedAddress(address);
  };

  const resetEditedAddress = () => {
    setEditedAddress({
      name: "",
      mobilenum: "",
      pincode: "",
      locality: "",
      address: "",
      city: "",
      state: "",
      alternatephonenumber: "",
      addresstype: "",
    });
  };

  const removeAddress = async (addressid) => {
    try {
      let receivedProduct = await axios.delete(
        `http://localhost:4000/api/address/${userId}/${addressid}`,
        editedAddress
      );
      if (!receivedProduct) {
        throw new Error("Failed to delete product");
      }
      toast.success("Address Removed Successfully");
      navigate("/cart");
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    console.log("Fetching address data...");
    try {
      if (userId) {
        fetchAddress();
      }
      if (addressId && data && data.length > 0) {
        const selectedAddress = data.find(
          (address) => address._id === addressId
        );
        setSelectedAddress(selectedAddress);
        setEditedAddress(selectedAddress);
        setShowEditForm(true);
      }
    } catch (error) {
      console.error("Error fetching address data:", error.message);
    }
  }, [userId, addressId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedAddress({
      ...editedAddress,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (addressId) {
        response = await axios.put(
          `http://localhost:4000/api/address/${userId}/${addressId}`,
          editedAddress
        );
        toast.success("Address Updated Successfully");
      } else {
        response = await axios.post(
          `http://localhost:4000/api/address/${userId}`,
          editedAddress
        );
        toast.success("Address Added Successfully");
      }
      console.log("Address saved/updated successfully:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Error saving/updating address:", error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="row mainRow">
        <SideBar />
        <main className="col-9 col-t-8 col-m-12">
          <div className="caption col-12 col-t-12 col-m-12">
            <h4>Address</h4>
          </div>
          <div className="row"></div>
          {!showEditForm && (
            <div className="address">
              {Array.isArray(data) &&
                data.length > 0 &&
                data.map((address) => (
                  <div key={address._id} className="address-box">
                    <div>
                      <span onClick={() => handleAddressSelect(address)}>
                        {selectedAddress === address ? (
                          <RadioButtonCheckedIcon />
                        ) : (
                          <RadioButtonUncheckedIcon />
                        )}
                      </span>
                      <strong>{address.name}</strong>, {address.addresstype},{" "}
                      <strong>{address.mobilenum}</strong>, {address.address},{" "}
                      {address.locality}, {address.city}, {address.state},{" "}
                      {address.alternatephonenumber}, {address.pincode}
                    </div>
                    {selectedAddress === address && (
                      <div>
                        <NavLink to={"/order"}>
                          <button
                            onClick={() =>
                              console.log(
                                "Deliver clicked for address:",
                                address
                              )
                            }
                          >
                            Deliver Here
                          </button>
                        </NavLink>
                        <NavLink to={`/address/${address._id}`}>
                          <button
                            onClick={() => {
                              setEditedAddress(address);
                              setShowEditForm(true);
                            }}
                          >
                            Edit
                          </button>
                        </NavLink>
                        <button
                          onClick={() => {
                            removeAddress(editedAddress._id);
                          }}
                        >
                          delete
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              <div className="new-address-button">
                <button
                  onClick={() => {
                    resetEditedAddress();
                    setShowEditForm(true);
                  }}
                >
                  Add a New Address
                </button>
                <br />
              </div>
              <div className="apply-button"></div>
            </div>
          )}
          {showEditForm && (
            <div className="address">
              <h3>{selectedAddress ? "Edit Address" : "New Address"}</h3>
              <form onSubmit={submitHandler}>
                <div className="mb-3">
                  <label htmlFor="name">
                    <strong>Name</strong>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    id="name"
                    name="name"
                    value={editedAddress.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="mobilenum">
                    <strong>Mobile Number</strong>
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Mobile Number"
                    id="mobilenum"
                    name="mobilenum"
                    min="10"
                    required
                    value={editedAddress.mobilenum}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="pincode">
                    <strong>Pin Code</strong>
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Pin Code"
                    id="pincode"
                    name="pincode"
                    required
                    min="6"
                    value={editedAddress.pincode}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="locality">
                    <strong>Locality</strong>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Locality"
                    id="locality"
                    name="locality"
                    required
                    value={editedAddress.locality}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address">
                    <strong>Address</strong>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Address"
                    id="address"
                    name="address"
                    required
                    value={editedAddress.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="city">
                    <strong>City</strong>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter city"
                    id="city"
                    name="city"
                    required
                    value={editedAddress.city}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="state">
                    <strong>State</strong>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter State"
                    id="state"
                    name="state"
                    required
                    value={editedAddress.state}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="alternatemobilenum">
                    <strong>Alternate Phone Number</strong>
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Alternate Number"
                    id="alternatemobilenum"
                    name="alternatephonenumber"
                    value={editedAddress.alternatephonenumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="type d-flex ms-10">
                  <p>
                    <label htmlFor="addresstype">
                      <strong>Adress Type</strong>
                    </label>
                  </p>

                  <div className="radio">
                    <p>
                      <input
                        type="radio"
                        id="addresstype"
                        name="addresstype"
                        value="Home"
                        onChange={handleChange}
                      />
                      <label htmlFor="addresstype">Home</label>
                    </p>
                    <p>
                      <input
                        type="radio"
                        id="addresstype"
                        name="addresstype"
                        value="Office"
                        onChange={handleChange}
                      />
                      <label htmlFor="addresstype">Office</label>
                    </p>
                  </div>
                </div>

                <div className="addressbutton">
                  <button
                    type="submit"
                    className="btn btn-success w-100 rounded-0"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-success w-100 rounded-0"
                    onClick={() => setShowEditForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Address;
