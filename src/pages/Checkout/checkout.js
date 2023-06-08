import "../../styles/styleApp.scss";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Checkout(props) {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(
    props.user === null ? "" : props.user.userName
  );
  const [lastName, setLastName] = useState(
    props.user === null ? "" : props.user.lastName
  );
  const [emailUpdate, setemailUpdate] = useState("");
  const [address, setAddress] = useState(
    props.user === null ? "" : props.user.address
  );
  const [address2, setAddress2] = useState(
    props.user === null ? "" : props.user.address2
  );
  const [postalCode, setPostalCode] = useState(
    props.user === null ? "0" : props.user.postalCode
  );
  const [phone, setPhone] = useState(
    props.user === null ? "0" : props.user.phone
  );
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");
  const [rememberMe, setRememberMe] = useState(true);
  const [enabled, setEnabled] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleRemember = (e) => {
    setRememberMe(!rememberMe);
  };

  const handleConfirmOrder = () => {
    setEnabled(false);

    if (
      firstName.replace(/\s+/g, " ").trim() === "" ||
      lastName.replace(/\s+/g, " ").trim() === "" ||
      address.replace(/\s+/g, " ").trim() === "" ||
      postalCode.replace(/\s+/g, " ").trim() === "" ||
      (phone.replace(/\s+/g, " ").trim() === "" &&
        (emailUpdate.replace(/\s+/g, " ").trim() === "" || props.user === ""))
    ) {
      setEnabled(true);
      setError("Please fill all the Required Fields first.");
      return;
    } else {
      if (emailUpdate.replace(/\s+/g, " ").trim() !== "") {
        const validEmailRegex =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!emailUpdate.replace(/\s+/g, " ").trim().match(validEmailRegex)) {
          setEnabled(true);
          setError("Please fill all the Required Fields first.");
          return;
        }
      }

      setEnabled(true);

      let totalPrice = 0;
      props.user.cart.forEach((book, i) => {
        totalPrice += book.price * props.user.cartCount[i];
      });

      totalPrice += totalPrice <= 2500 ? 200 : 0;

      let orderObj = {
        user: {
          email:
            props.user.email === ""
              ? emailUpdate.replace(/\s+/g, " ").trim()
              : props.user.email,
          userName: firstName.replace(/\s+/g, " ").trim(),
          lastName: lastName.replace(/\s+/g, " ").trim(),
          phone: phone.replace(/\s+/g, " ").trim(),
          picture:
            props.user.email === ""
              ? "https://cdn.sanity.io/images/lu9vyhom/production/f1809d36168b6bf89b1334fda669e6135c9cb250-612x612.jpg?rect=131,132,350,350"
              : props.user.picture,
        },
        addressObj: {
          country: "Pakistan",
          // city: "city",
          address: address.replace(/\s+/g, " ").trim(),
          address2:
            address2 === undefined ? "" : address2.replace(/\s+/g, " ").trim(),
          postalCode: postalCode.replace(/\s+/g, " ").trim(),
        },
        cart: props.user.cart,
        cartCount: props.user.cartCount,
        extraNote: notes.replace(/\s+/g, " ").trim(),
        paymentMethod: paymentMethod,
        totalPrice: totalPrice,
        orderPlaced: new Date(),
      };

      props.confirmOrder(orderObj, rememberMe);

      setTimeout(() => navigate("/thanks-for-shopping-here"), 500);
    }
  };

  if (
    props.user === null ||
    props.user === undefined ||
    props.user.cart.length === 0
  ) {
    navigate("/", { replace: true });
    return <div></div>;
  } else {
    let total = 0;
    props.user.cart.forEach((book, i) => {
      total += book.price * props.user.cartCount[i];
    });

    return (
      <div className="untree_co-section">
        <div className="container">
          {props.user.email === "" ? (
            <div className="row mb-5">
              <div className="col-md-12">
                <div className="border p-4 rounded" role="alert">
                  Don't Have An Account? <Link to="/login">Click here</Link> to
                  Register
                </div>
              </div>
            </div>
          ) : null}

          <div className="row">
            <div className="col-md-6 mb-5 mb-md-0">
              <h2 className="h3 mb-3 text-black">Billing Details</h2>
              <div className="p-3 p-lg-5 border bg-white">
                <div className="form-group">
                  <label htmlFor="c_country" className="text-black">
                    Country
                  </label>
                  <select id="c_country" className="form-control">
                    <option value="1">Pakistan</option>
                  </select>
                </div>
                <div className="form-group row">
                  <div className="col-md-6">
                    <label htmlFor="c_fname" className="text-black">
                      First Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="c_fname"
                      name="c_fname"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="c_lname" className="text-black">
                      Last Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="c_lname"
                      name="c_lname"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                {/* <div className="form-group row">
                  <div className="col-md-12">
                    <label htmlFor="c_companyname" className="text-black">Company Name </label>
                    <input type="text" className="form-control" id="c_companyname" name="c_companyname" />
                  </div>
                </div> */}

                <div className="form-group row">
                  <div className="col-md-12">
                    <label htmlFor="c_address" className="text-black">
                      Address <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="c_address"
                      name="c_address"
                      placeholder="Street address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Apartment, suite, unit etc. (optional)"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                </div>

                <div className="form-group row">
                  {/* <div className="col-md-6">
                    <label htmlFor="c_state_country" className="text-black">State / Country <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="c_state_country" name="c_state_country" />
                  </div> */}
                  <div className="col-md-6">
                    <label htmlFor="c_postal_zip" className="text-black">
                      Postal / Zip <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="c_postal_zip"
                      name="c_postal_zip"
                      value={postalCode}
                      onChange={(e) => {
                        setPostalCode(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="form-group row mb-5">
                  <div className="col-md-6">
                    <label htmlFor="c_email_address" className="text-black">
                      Email Address <span className="text-danger">*</span>
                    </label>
                    {props.user.email !== "" ? (
                      <input
                        type="email"
                        className="form-control"
                        id="c_email_address"
                        name="c_email_address"
                        value={props.user.email}
                        disabled
                      />
                    ) : (
                      <input
                        type="email"
                        className="form-control"
                        id="c_email_address"
                        name="c_email_address"
                        value={emailUpdate}
                        onChange={(e) => setemailUpdate(e.target.value)}
                      />
                    )}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="c_phone" className="text-black">
                      Phone <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="c_phone"
                      name="c_phone"
                      placeholder="Phone Number"
                      value={phone}
                      onChange={(e) => {
                        if (e.target.value >= "0" && e.target.value <= "9")
                          setPhone(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label
                    htmlFor="remember_me"
                    className="text-black"
                    data-bs-toggle="collapse"
                    href="#create_an_account"
                    role="button"
                    aria-expanded="false"
                    aria-controls="create_an_account"
                  >
                    <input
                      type="checkbox"
                      value="1"
                      id="remember_me"
                      defaultChecked={rememberMe}
                      onClick={() => {
                        handleRemember();
                      }}
                    />{" "}
                    Remember me{" "}
                  </label>
                  {/* <div className="collapse" id="create_an_account">
                    <div className="py-2 mb-4">
                      <p className="mb-3">Create an account by entering the information below. If you are a returning customer please login at the top of the page.</p>
                      <div className="form-group">
                        <label htmlFor="c_account_password" className="text-black">Account Password</label>
                        <input type="email" className="form-control" id="c_account_password" name="c_account_password" placeholder="" />
                      </div>
                    </div>
                  </div> */}
                </div>

                {/* <div className="form-group">
                  <label htmlFor="c_order_notes" className="text-black">
                    Order Notes
                  </label>
                  <textarea
                    name="c_order_notes"
                    id="c_order_notes"
                    cols="30"
                    rows="5"
                    className="form-control"
                    placeholder="Write your notes here..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  ></textarea>
                </div> */}
              </div>
            </div>
            <div className="col-md-6">
              {/* <div className="row mb-5">
                <div className="col-md-12">
                  <h2 className="h3 mb-3 text-black">Coupon Code</h2>
                  <div className="p-3 p-lg-5 border bg-white">
                    <label htmlFor="c_code" className="text-black mb-3">
                      Enter your coupon code if you have one
                    </label>
                    <div className="input-group w-75 couponcode-wrap">
                      <input
                        type="text"
                        className="form-control me-2"
                        id="c_code"
                        placeholder="Coupon Code"
                        aria-label="Coupon Code"
                        aria-describedby="button-addon2"
                        disabled={true}
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-black btn-sm"
                          type="button"
                          id="button-addon2"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

              <div className="row mb-5">
                <div className="col-md-12">
                  <h2 className="h3 mb-3 text-black">Your Order</h2>
                  <div className="p-3 p-lg-5 border bg-white">
                    <table className="table site-block-order-table mb-5">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {props.user.cart.map((book, i) => {
                          return (
                            <tr key={book._id}>
                              <td>
                                {book.Name} <strong className="mx-2">x</strong>{" "}
                                {props.user.cartCount[i]}
                              </td>
                              <td>
                                Rs. {book.price * props.user.cartCount[i]}/-
                              </td>
                            </tr>
                          );
                        })}

                        <tr>
                          <td className="text-black">
                            <strong>Cart Sub-total: </strong>
                          </td>
                          <td className="text-black">Rs. {total}/-</td>
                        </tr>
                        <tr>
                          <td className="text-black">
                            <strong>Shipping Fee: </strong>
                          </td>
                          <td className="text-black">
                            Rs. {total > 2500 ? 0 : 200}/-
                          </td>
                        </tr>
                        <tr>
                          <td className="text-black font-weight-bold">
                            <strong>Order Total: </strong>
                          </td>
                          <td className="text-black font-weight-bold">
                            <strong>
                              Rs. {total > 2500 ? total : total + 200}/-
                            </strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    {/* <div className="border p-3 mb-3">
                      <h3 className="h6 mb-0"><a className="d-block" data-bs-toggle="collapse" href="#collapsebank" role="button" aria-expanded="false" aria-controls="collapsebank">Direct Bank Transfer</a></h3>

                      <div className="collapse" id="collapsebank">
                        <div className="py-2">
                          <p className="mb-0">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.</p>
                        </div>
                      </div>
                    </div>

                    <div className="border p-3 mb-3">
                      <h3 className="h6 mb-0"><a className="d-block" data-bs-toggle="collapse" href="#collapsecheque" role="button" aria-expanded="false" aria-controls="collapsecheque">Cheque Payment</a></h3>

                      <div className="collapse" id="collapsecheque">
                        <div className="py-2">
                          <p className="mb-0">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.</p>
                        </div>
                      </div>
                    </div>

                    <div className="border p-3 mb-5">
                      <h3 className="h6 mb-0"><a className="d-block" data-bs-toggle="collapse" href="#collapsepaypal" role="button" aria-expanded="false" aria-controls="collapsepaypal">Paypal</a></h3>

                      <div className="collapse" id="collapsepaypal">
                        <div className="py-2">
                          <p className="mb-0">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.</p>
                        </div>
                      </div>
                    </div> */}

                    <div className="row justify-content-center p-2 m-2">
                      <span className="text-danger">{error} </span>
                    </div>
                    {props.user && props.user.cart.length > 0 && (
                      <div className="form-group">
                        <button
                          onClick={handleConfirmOrder}
                          disabled={!enabled}
                          className="btn btn-black btn-lg py-3 btn-block"
                          style={{
                            backgroundColor: "#434445",
                            borderRadius: "0px",
                          }}
                        >
                          Confirm Order
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- </form> --> */}
        </div>
      </div>
    );
  }
}
