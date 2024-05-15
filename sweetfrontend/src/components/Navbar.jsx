import React from "react";
import { NavLink} from "react-router-dom";
import "./CSS/Navbar.css"

export default function NavBar(props){
   
    const handlechange = (e) => {
        props.setSearchTerm(e.target.value);
    }
    return(
        <>
        <div>
            <nav>
                <ul>
                    <li><NavLink className="navbar" to="/">HOME</NavLink></li>
                    <li><NavLink className="navbar" to={"/New"}>NEW PRODUCTS</NavLink></li>
                    <li><NavLink className="navbar" to={"/Special"}>SPECIALS</NavLink></li>
                    <li><NavLink className="navbar" to="/sitemap">SITEMAP</NavLink></li>
                    {/* <li><NavLink className="navbar" to="/blog">BLOG</NavLink></li> */}
                    <li className="searchBox1">
                        <input
                            type="text"
                            placeholder="Search"
                            id="searchBox1"
                            value={props.searchTerm}
                            onChange={handlechange}
                        />
                    </li>
                    
                    <li className="icon"><a href="javascript:void(0);"><i className="w3-large">menu</i></a></li>
                </ul>
            </nav>
        </div>
        
        </>
    )
}