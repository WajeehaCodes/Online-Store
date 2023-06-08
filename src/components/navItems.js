import React from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../styles/navItems.css";

export default function NavItems(props) {
  let location = useLocation();

  return (
    <div className="nav-item">
      <div className="container">
        <div
          className="nav-depart"
          style={{
            borderRight: "2px solid #b8b6b6",
            borderLeft: "2px solid #b8b6b6",
          }}
        >
          <div className="depart-btn">
            <i className="ti-menu" style={{ color: "#E5E4E2" }}></i>
            <span style={{ color: "#E5E4E2" }}>Catalogue</span>
            <ul className="depart-hover">
              {props.categories.map((book) => {
                let linkToBooks = "/categories/" + book;
                return (
                  <li key={book}>
                    <NavLink
                      to={linkToBooks}
                      style={{ fontFamily: "sans-serif", fontSize: "12px" }}
                    >
                      {book}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <nav className="nav-menu">
          <ul>
            <li className={location.pathname === "/" ? "active" : ""}>
              <NavLink to="/" style={{ color: "#E5E4E2" }}>
                Home
              </NavLink>
            </li>
            <li className={location.pathname === "/shop" ? "active" : ""}>
              <NavLink to="/shop" style={{ color: "#E5E4E2" }}>
                Shop
              </NavLink>
            </li>
            {/* <li className={location.pathname === "/services" ? "active" : ""}><NavLink to="">Services</NavLink></li> */}
            <li className={location.pathname === "/contact" ? "active" : ""}>
              <NavLink to="/contact" style={{ color: "#E5E4E2" }}>
                Contact
              </NavLink>
            </li>
            <li className={location.pathname === "/about" ? "active" : ""}>
              <NavLink to="/about" style={{ color: "#E5E4E2" }}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart" style={{ color: "#E5E4E2" }}>
                Shopping Cart
              </NavLink>
            </li>
            <li>
              <NavLink to="" style={{ color: "#E5E4E2" }}>
                More
              </NavLink>
              <ul className="dropdown">
                {props.userData && props.userData.cart.length > 0 && (
                  <li>
                    <NavLink to="/checkout">Buy Now</NavLink>
                  </li>
                )}
                {props.user && (
                  <li>
                    <NavLink to="/Wishlist">Wishlist</NavLink>
                  </li>
                )}
                <li>
                  <NavLink to="/FAQ">FAQs</NavLink>
                </li>
                {!props.user && (
                  <li>
                    <NavLink to="/register">Register</NavLink>
                  </li>
                )}
                {!props.user && (
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                )}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
