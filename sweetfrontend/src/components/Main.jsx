import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { fetchCartItems } from "../store/slice/getUserslice";

const Main = () => {
  // const dispatch=useDispatch();
  // useEffect(()=>{
  //     const UserId=localStorage.getItem("userId");

  //     dispatch(fetchCartItems(UserId));
  // })
  return <Outlet />;
};
export default Main;
