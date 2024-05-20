import React from "react";

import { Link, NavLink } from "react-router-dom";

import "../components/CSS/SiteMap.css";


export default function SiteMap() {
  const pages = [
    { name: "Home", url: "/" },
    { name: "NewProducts", url: "/New" },
    { name: "Specials", url: "/Special" },
    { name: "My Account", url: "/myaccount" },
    { name: "Blog", url: "#" },
    { name: "Gifts/Combos", url: "/Gifts" },
    { name: "Premium Cupcakes", url: "/Premium" },
    { name: "Birthday CupCakes", url: "/Birthday" },
    { name: "Custom Cupcakes", url: "/Custom" },
    { name: "Cartoon cupcakes", url: "/Cartoon" },
    { name: "SuperHero Cupcakes", url: "/Super" },
    { name: "CheeseCake Cupcakes", url: "/Cheese" },
    { name: "Holiday Cupcakes", url: "/Holiday" },
    { name: "Eggless CupCakes", url: "/Eggless" },
    { name: "Midnight Delivery", url: "/Midnight" },
    { name: "Contact", url: "/contact" },
    { name: "Cart", url: "/cart" },
    { name: "Wishlist", url: "/wishlist" },
    { name: "Address", url: "/address" },
    { name: "Login", url: "/login" },
  ];

  return (
    <>
     
      <div className="row mainRow">
        
        <main className="col-9 col-t-8 col-m-12">
          <div className="caption col-12 col-t-12 col-m-12">
            <h4>SITE MAP</h4>
          </div>
          <div className="row">
            <div className="sitemap-container">
              <div className="sitemap-list">
                {pages.map((page, index) => (
                  <div key={index} className="sitemap-column">
                    <div className="sitemap-list-item">
                      <NavLink to={page.url}>{page.name}</NavLink>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
