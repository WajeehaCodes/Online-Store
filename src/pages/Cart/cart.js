import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/styleApp.scss";
// import CartLoader from "../../components/CartLoader";
import { LazyLoadImage } from "react-lazy-load-image-component";
import sanityClient from "../../utils/client";
import imageUrlBuilder from "@sanity/image-url";
import BookRow from "../../components/BookRow";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

const Cart = (props) => {
  useEffect(() => {
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  if (
    props.user === null ||
    props.user === undefined ||
    props.user.cart.length === 0
  ) {
    // navigate("/", {replace: true});
    return (
      <>
        <div className="untree_co-section product-section before-footer-section">
          <div className="container">
            <div
              className="row d-flex justify-content-center align-items-center"
              style={{ height: "30vh", backgroundColor: "#f7f1f1a6" }}
            >
              <p>
                Your Cart is Empty
                <br />
                <Link to="../shop">Continue Shopping</Link>
              </p>
            </div>
          </div>

          <div className="container mt-3">
            <div className="row"></div>

            <BookRow
              // booksData={islamicBooks}
              addToCart={props.addToCart}
              link={"../shop/"}
            />
          </div>
        </div>
      </>
    );
  } else {
    let total = 0;
    props.user.cart.forEach((book, i) => {
      total += book.price * props.user.cartCount[i];
    });
    return (
      <div className="untree_co-section before-footer-section">
        <div className="container">
          <div className="row mb-5">
            <form className="col-md-12" method="post">
              <div className="site-blocks-table">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="product-thumbnail">Image</th>
                      <th className="product-name">Product</th>
                      <th className="product-price">Price</th>
                      <th className="product-quantity">Quantity</th>
                      <th className="product-total">Total</th>
                      <th className="product-remove">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.user.cart.map((book, i) => {
                      return (
                        <tr key={book._id}>
                          <td className="product-thumbnail">
                            <LazyLoadImage
                              src={urlFor(book.Image).url()}
                              alt="Image"
                              className="img-fluid"
                            />
                          </td>
                          <td className="product-name">
                            <h2 className="h6 text-black">{book.Name}</h2>
                          </td>
                          <td>Rs. {book.price}/-</td>
                          <td>
                            <div
                              className="input-group mb-3 d-flex align-items-center quantity-container"
                              style={{ maxWidth: "120px" }}
                            >
                              <div
                                className="input-group-prepend"
                                onClick={(e) => {
                                  props.handleUpdateCartBookCount(
                                    book,
                                    props.user.cartCount[i] - 1
                                  );
                                }}
                              >
                                <button
                                  className="btn btn-outline-black decrease"
                                  type="button"
                                >
                                  &minus;
                                </button>
                              </div>
                              <input
                                type="text"
                                className="form-control text-center quantity-amount p-1"
                                value={props.user.cartCount[i]}
                                placeholder=""
                                aria-label="Example text with button addon"
                                readOnly
                                aria-describedby="button-addon1"
                                min={0}
                                max={book.quantity}
                              />
                              <div
                                className="input-group-append"
                                onClick={(e) => {
                                  props.handleUpdateCartBookCount(
                                    book,
                                    props.user.cartCount[i] + 1
                                  );
                                }}
                              >
                                <button
                                  className="btn btn-outline-black increase"
                                  type="button"
                                >
                                  &#43;
                                </button>
                              </div>
                            </div>
                          </td>
                          <td>Rs. {book.price * props.user.cartCount[i]}/-</td>
                          <td>
                            <p
                              className="btn btn-black btn-sm"
                              onClick={(e) => {
                                props.handleCartBookRemove(book);
                              }}
                            >
                              X
                            </p>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </form>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="row mb-5">
                <Link
                  className="col-md-6 mb-3 mb-md-0"
                  onClick={props.emptyCart}
                >
                  <button
                    className="btn btn-black btn-sm "
                    style={{ backgroundColor: "#434445", borderRadius: "0px" }}
                  >
                    Empty Cart
                  </button>
                </Link>
                <Link to="/shop" className="col-md-6">
                  <button
                    className="btn btn-outline-black btn-sm"
                    style={{ backgroundColor: "#434445", borderRadius: "0px" }}
                  >
                    Continue Shopping
                  </button>
                </Link>
              </div>
              {/* <div className="row">
                <div className="col-md-12">
                  <label className="text-black h4" htmlFor="coupon">
                    Coupon
                  </label>
                  <p>Enter your coupon code if you have one.</p>
                </div>
                <div className="col-md-8 mb-3 mb-md-0">
                  <input
                    type="text"
                    className="form-control py-3"
                    id="coupon"
                    placeholder="Coupon Code"
                    readOnly
                  />
                </div>
                <div className="col-md-4">
                  <button className="btn btn-black">Apply Coupon</button>
                </div>
              </div> */}
            </div>
            <div className="col-md-6 pl-5">
              <div className="row justify-content-end">
                <div className="col-md-8">
                  <div className="row">
                    <div className="col-md-12 text-right border-bottom mb-5">
                      <h3 className="text-black h4 text-uppercase">
                        Order Summary
                      </h3>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <span className="text-black">Sub-Total: </span>
                    </div>
                    <div className="col-md-6 text-right">
                      <strong className="text-black">Rs. {total}/-</strong>
                    </div>
                  </div>
                  <div className="row mb-5">
                    <div className="col-md-6">
                      <span className="text-black">Total: </span>
                    </div>
                    <div className="col-md-6 text-right">
                      <strong className="text-black">Rs. {total}/-</strong>
                    </div>
                  </div>

                  {props.user && props.user.cart.length > 0 && (
                    <div className="row">
                      <div className="col-md-12">
                        <Link to="/checkout">
                          <button
                            className="btn btn-black btn-lg py-3 btn-block"
                            style={{
                              backgroundColor: "#434445",
                              borderRadius: "0px",
                            }}
                          >
                            Buy Now
                          </button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Cart;
