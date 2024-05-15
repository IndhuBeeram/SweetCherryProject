import React from "react";
import "./CSS/Slidebar.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from "react-router-dom";
export default function SideBar(){
    return(
        <>
            <aside class="aside col-3 col-t-4 col-m-12">
                <div class="aside1">
                    <h3>CATEGORIES</h3>
                    <ul>
                        <li><NavLink  to={"/Gifts"}>Gifts/Combos</NavLink></li>
                        <li><NavLink to={"/Premium"}>Premium Cupcakes</NavLink></li>
                        <li><NavLink to={"/Birthday"}>Birthday Cupcakes</NavLink></li>
                        <li><NavLink to={"/Custom"}>Custom Cupcakes</NavLink></li>
                        <li><NavLink to={"/Cartoon"}>Cartoon Cupcakes</NavLink></li>
                        <li><NavLink to={"/Super"}>Superhero Cupcakes</NavLink></li>
                        <li><NavLink to={"/Cheese"}>Cheesecake Cupcakes</NavLink></li>
                        <li><NavLink to={"/Holiday"}>Holiday Cupcakes</NavLink></li>
                        <li><NavLink to={"/Eggless"}>Eggless Cupcakes</NavLink></li>
                        <li><NavLink to={"/Midnight"}>Midnight Delivery</NavLink></li>                
                    </ul>
                </div>

                <div class="aside2">
                    <h3>CONTACT US</h3>
                    <p>Our support is available 24/7.<br/>
                    +91-9988776655 / +91-9988776654</p>
                </div>
                
                {/* <div class="aside3">
                    <h3>FIND CUPCAKES</h3>
                    <input type="text" placeholder="Search" id="searchBox2" />
                </div> */}
            </aside>
        </>
    )
}