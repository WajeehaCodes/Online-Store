import { NavLink } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../utils/client";
// import { isMobile, isTablet } from "react-device-detect";
// import { useState } from "react";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function CartHover(props) {
  // const [cartHover, setCartHover] = useState(false);

  let total = 0;
  if (props.userData !== null) {
    props.userData.cart.forEach((book, i) => {
      total += book.price * props.userData.cartCount[i];
    });
  }

  return (
    <div className="col-lg-3 text-right col-md-3 d-none d-md-block d-lg-block d-xl-block">
      <ul className="nav-right">
        <li className="heart-icon">
          <NavLink to={props.user ? "/Wishlist" : ""}>
            <i className="icon_heart_alt"></i>
            <span>
              {props.user && props.userData
                ? props.userData.wishlist.length
                : 0}
            </span>
          </NavLink>
        </li>

        <li className="cart-icon">
          <NavLink>
            <i className="icon_bag_alt"></i>
            <span>
              {props.userData !== null && props.userData !== undefined
                ? props.userData.cart.length
                : 0}
            </span>
          </NavLink>
          <div className="cart-hover" style={{ backgroundColor: "#F2F1F0" }}>
            <div
              className="select-items"
              style={{ maxHeight: 240, overflow: "auto" }}
            >
              <table
                cellSpacing={0}
                cellPadding={1}
                style={{ borderBottom: "1px solid #434445" }}
              >
                <tbody>
                  {props.userData !== null && props.userData !== undefined ? (
                    props.userData.cart.map((book, i) => {
                      return (
                        <tr key={book._id}>
                          <td className="si-pic">
                            <LazyLoadImage
                              src={urlFor(book.Image).height(100).url()}
                              alt=""
                            />
                          </td>
                          <td className="si-text">
                            <div className="product-selected">
                              <p>
                                <strong>Rs.</strong> {book.price} *{" "}
                                {props.userData.cartCount[i]}
                              </p>
                              <h6>{book.Name}</h6>
                            </div>
                          </td>
                          <td className="si-close">
                            <i
                              className="ti-close"
                              onClick={(e) => {
                                props.handlecartbookremove(book);
                              }}
                            ></i>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </tbody>
              </table>
            </div>
            <div className="select-total">
              <span>
                {" "}
                <strong>total:</strong>
              </span>
              <h5>
                <strong>Rs.</strong> {total}/-
              </h5>
            </div>
            <div className="select-button">
              <NavLink to="/cart" className="primary-btn view-card">
                VIEW CART
              </NavLink>
              {props.userData && props.userData.cart.length > 0 && (
                <NavLink to="/checkout" className="primary-btn checkout-btn">
                  BUY NOW
                </NavLink>
              )}
            </div>
          </div>
        </li>
        <li className="cart-price">
          <strong style={{ fontWeight: "bold" }}>Rs.</strong> {total}/-
        </li>
      </ul>
    </div>
  );
}
