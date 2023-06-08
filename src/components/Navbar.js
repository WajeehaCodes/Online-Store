import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../utils/sanityQueries";
// import { getAllCategoriesData } from "../temporaryData";
import "../styles/loginBtn.css";

import sanityClient from "../utils/client";
import NavItems from "./navItems";
import Logout from "./logout";
import CartHover from "./cartHover";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import CartModel from "./CartModel";

function NavBar(props) {
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");
  const [selectSearch, setSelectSearch] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [expandCategory, setExpandCategory] = useState(true);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let query = getAllCategories;
    sanityClient
      .fetch(query)
      .then((data) => {
        data = data.filter((book) => {
          return book.Category !== null;
        });
        let tempData = [];
        // let data = getAllCategoriesData();
        data.map((categoriesArr) => {
          categoriesArr.Category.map((category) => {
            if (tempData.indexOf(category) < 0 && category.length > 2) {
              tempData.push(category);
            }

            return category;
          });

          return categoriesArr;
        });

        setCategories(tempData);
        // console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleQueryChange = (e) => {
    // console.log(e._reactName);
    if (e.key === "Enter") {
      let storeQuery = query;
      setQuery("");
      navigate(`/search/${storeQuery}`);
    } else {
      setQuery(e.target.value);
    }
  };

  return (
    <header className="header-section">
      <div className="container-fluid">
        <div
          className="row"
          style={{
            backgroundColor: "#434445",
            paddingTop: "0.85rem",
            // fontFamily: "monospace",
            height: "5vh",
            maxHeight: "5vh",
            position: "relative",
            overflow: "hidden",
            color: "white",
          }}
        >
          <span className="col-12 text-center" id="shipping-offer">
            FREE SHIPPING ON ORDER ABOVE Rs. 2500/-
          </span>
        </div>
      </div>

      {/* css in loginBtn.css */}
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
        className=""
        style={{ zIndex: 2147483647 }}
      >
        <div className="drawer">
          <button onClick={(e) => setIsOpen(!isOpen)}>
            <svg
              height="25"
              width="25"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              viewBox="0 0 1024 1024"
            >
              <path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path>
            </svg>
            <span></span>
          </button>

          <nav className="nav-menu">
            <ul className="list-group list-group-flush drawer-list">
              <NavLink to="/" onClick={(e) => setIsOpen(!isOpen)}>
                <li
                  className={
                    location.pathname === "/"
                      ? "bg-dark list-group-item text-white"
                      : "list-group-item"
                  }
                  key="Home"
                >
                  Home
                </li>
              </NavLink>
              <NavLink to="/shop" onClick={(e) => setIsOpen(!isOpen)}>
                <li
                  className={
                    location.pathname === "/shop"
                      ? "bg-dark list-group-item text-white"
                      : "list-group-item"
                  }
                  key="Shop"
                >
                  Shop
                </li>
              </NavLink>
              {/* <li className={location.pathname === "/services" ? "active" : ""}><NavLink to="">Services</NavLink></li> */}
              <NavLink to="/cart" onClick={(e) => setIsOpen(!isOpen)}>
                <li
                  className={
                    location.pathname === "/cart"
                      ? "bg-dark list-group-item text-white"
                      : "list-group-item"
                  }
                  key="Cart"
                >
                  Shopping Cart
                </li>
              </NavLink>

              <li
                className="list-group-item drawer-categories"
                key="Categories"
              >
                <div
                  className="row"
                  onClick={(e) => setExpandCategory(!expandCategory)}
                >
                  <div className="col-8">Categories</div>
                  <div className="col-4 text-right"></div>
                </div>
                {expandCategory && (
                  <div className="row ml-3 drawer-list-categories">
                    <ul className="list-group list-group-flush">
                      {categories.map((book, i) => {
                        let linkToBooks = "/categories/" + book;
                        return (
                          <NavLink
                            to={linkToBooks}
                            onClick={(e) => setIsOpen(!isOpen)}
                          >
                            <li className="list-group-item" key={book + i}>
                              {book}
                            </li>
                          </NavLink>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </li>

              <NavLink to="/contact" onClick={(e) => setIsOpen(!isOpen)}>
                <li
                  className={
                    location.pathname === "/contact"
                      ? "bg-dark list-group-item text-white"
                      : "list-group-item"
                  }
                  key="Contact"
                >
                  Contact
                </li>
              </NavLink>
              <NavLink to="/about" onClick={(e) => setIsOpen(!isOpen)}>
                <li
                  className={
                    location.pathname === "/about"
                      ? "bg-dark list-group-item text-white"
                      : "list-group-item"
                  }
                  key="About"
                >
                  About
                </li>
              </NavLink>

              {props.userData && props.userData.cart.length > 0 && (
                <NavLink to="/checkout" onClick={(e) => setIsOpen(!isOpen)}>
                  <li
                    className={
                      location.pathname === "/checkout"
                        ? "bg-dark list-group-item text-white"
                        : "list-group-item"
                    }
                    key="Checkout"
                  >
                    Buy Now
                  </li>
                </NavLink>
              )}
              {props.user && (
                <NavLink to="/Wishlist" onClick={(e) => setIsOpen(!isOpen)}>
                  <li
                    className={
                      location.pathname === "/wishlist"
                        ? "bg-dark list-group-item text-white"
                        : "list-group-item"
                    }
                    key="Wishlist"
                  >
                    Wishlist
                  </li>
                </NavLink>
              )}
              <NavLink to="/FAQ" onClick={(e) => setIsOpen(!isOpen)}>
                <li
                  className={
                    location.pathname === "/FAQ"
                      ? "bg-dark list-group-item text-white"
                      : "list-group-item"
                  }
                  key="FAQs"
                >
                  FAQs
                </li>
              </NavLink>
              {!props.user && (
                <NavLink to="/register" onClick={(e) => setIsOpen(!isOpen)}>
                  <li className="list-group-item" key="Register">
                    Register
                  </li>
                </NavLink>
              )}
              {!props.user && (
                <NavLink to="/login" onClick={(e) => setIsOpen(!isOpen)}>
                  <li className="list-group-item" key="Login">
                    Login
                  </li>
                </NavLink>
              )}
            </ul>
          </nav>
        </div>
      </Drawer>

      <div className="container mb-2">
        <div className="inner-header">
          <div className="row">
            <div className="col-lg-2 col-md-2">
              <div className="logo">
                <div className="d-md-none d-mg-block">
                  <br />
                </div>

                <div className="row d-flex justify-content-between">
                  <div
                    className="d-md-none d-mg-block ml-3 mt-2"
                    onClick={toggleDrawer}
                  >
                    <img
                      src="assets/img/burger-menu.png"
                      alt="drawer icon"
                      style={{ height: 25, cursor: "pointer" }}
                    />
                  </div>

                  <NavLink to="/" className="ml-2">
                    <img
                      src="assets/img/logo.png"
                      style={{ width: "100%", maxWidth: 150 }}
                      alt="website logo"
                    ></img>
                  </NavLink>

                  <div className="d-md-none d-mg-block mr-3">
                    <ul
                      className="nav-right d-flex align-items-center mb-2"
                      style={{ listStyleType: "none", height: "50px" }}
                    >
                      <li className="search-icon mx-2" key="search-icon">
                        <NavLink
                          onClick={(e) => setSelectSearch(!selectSearch)}
                        >
                          <img
                            src={require("./search.png")}
                            alt="search-icon"
                            className="mb-3"
                            style={{
                              height: 25,
                            }}
                          />
                        </NavLink>
                      </li>
                      <li className="cart-icon ml-1" key="cart-icon">
                        <NavLink to="/cart">
                          {/* <i
                            className="icon_bag_alt"
                            style={{ fontSize: 25 }}
                          ></i> */}
                          <img
                            src={require("./bag.png")}
                            alt="bag-icon"
                            className="mb-3"
                            style={{
                              height: 20,
                            }}
                          />
                          <span>
                            {props.userData !== null &&
                            props.userData !== undefined
                              ? props.userData.cart.length
                              : 0}
                          </span>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-none d-md-block d-lg-block d-xl-block col-lg-7 col-md-7">
              <div className="advanced-search">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Search"
                    style={{ color: "#434445" }}
                    value={query}
                    onChange={(e) => handleQueryChange(e)}
                    onKeyDown={(e) => handleQueryChange(e)}
                  />
                  <Link to={`search/${query}`}>
                    <button type="button">
                      <i className="ti-search"></i>
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {selectSearch && (
              <div className="d-md-none d-lg-none d-xl-none col-lg-7 col-md-7">
                <div className="advanced-search">
                  <button type="button" className="category-btn">
                    All Categories
                  </button>
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="Search"
                      style={{ color: "black" }}
                      value={query}
                      onChange={(e) => handleQueryChange(e)}
                      onKeyDown={(e) => handleQueryChange(e)}
                    />
                    <Link to={`search/${query}`}>
                      <button type="button">
                        <i className="ti-search"></i>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            <CartHover
              user={props.user}
              userData={props.userData}
              handlecartbookremove={props.handlecartbookremove}
            />
          </div>
        </div>
      </div>

      <NavItems
        user={props.user}
        userData={props.userData}
        categories={categories}
      />

      <CartModel
        user={props.user}
        userData={props.userData}
        handlecartbookremove={props.handlecartbookremove}
      />
    </header>
  );
}

export default NavBar;
