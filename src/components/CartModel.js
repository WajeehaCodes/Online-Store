import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../utils/client";
import "../styles/cartModel.css";
import { useNavigate } from "react-router";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function CartModel({ user, userData, handlecartbookremove }) {
  let Navigate = useNavigate();
  let total = 0;
  if (userData !== null) {
    userData.cart.forEach((book, i) => {
      total += book.price * userData.cartCount[i];
    });
  }
  return (
    <div>
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        id="cart-model-btn"
        className="d-none"
        data-toggle="modal"
        data-target="#cart-model"
      >
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="cart-model"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-lg modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                These Books were added to cart &nbsp;
              </h5>

              
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            {/* MODEL BODY START HERE */}
            <div className="modal-body">
              <div className="row">
                <div className="col-12 mb-2">
                  <div
                    className="cart-hover"
                    // style={{ backgroundColor: "#F2F1F0" }}
                  >
                    <div
                      className="select-items"
                      style={{ maxHeight: 240, overflow: "auto" }}
                    >
                      <table cellSpacing={0} cellPadding={3} className="col-12">
                        {/* <thead className="text-center" style={{fontWeight: "bold"}}>
                          <td>#</td>
                          <td>Image</td>
                          <td>Quantity / Name</td>
                          <td>Action</td>
                        </thead> */}
                        <tbody>
                          {userData !== null && userData !== undefined ? (
                            userData.cart.map((book, i) => {
                              return (
                                <tr key={book._id}>
                                  {/* <td className="p-2">{i + 1}</td> */}
                                  <td className="si-pic">
                                    <LazyLoadImage
                                      src={urlFor(book.Image).height(100).url()}
                                      alt={book.Name}
                                    />
                                  </td>
                                  <td className="si-text">
                                    <div className="product-selected">
                                      <p>
                                        <strong>Rs.</strong> {book.price} *{" "}
                                        {userData.cartCount[i]}
                                      </p>
                                      <h6>{book.Name}</h6>
                                    </div>
                                  </td>
                                  <td className="si-close text-center">
                                    <i
                                      className="ti-close"
                                      onClick={(e) => {
                                        handlecartbookremove(book);
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
                  </div>
                </div>

                <div className="col-7 select-total-cart-model">
                  You have {userData && userData.cart.length} items in your Cart{" "}
                </div>
                <div className="col-5 select-total-cart-model">
                  SubTotal: {total}
                </div>
              </div>
            </div>
            <div className="modal-footer d-flex">
              <button
                data-dismiss="modal"
                id="modal-dismiss"
                className="d-none"
              >
                Close
              </button>
              <button
                type="button"
                className="btn col modal-footer-btn-continue"
                data-dismiss="modal"
                onClick={() => {
                  Navigate("/shop");
                }}
              >
                Continue Shopping
              </button>
              <button
                type="button"
                data-dismiss="modal"
                className="btn col modal-footer-btn-cart"
                onClick={() => {
                  Navigate("/cart");
                }}
              >
                View Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
