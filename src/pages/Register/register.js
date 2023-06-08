import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/login.css";
// import { GoogleLogin } from "@react-oauth/google";
// import jwt_decode from 'jwt-decode';
// import { googleLogout } from "@react-oauth/google";
// import { useGoogleLogin } from "@react-oauth/google";
// import axios from "axios";

export default function Register(props) {
  const [showP, setShowP] = useState(false);
  const [Error, setError] = useState("");
  const [passText, setpassText] = useState("password");
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  // const passwordConfirmRef = useRef()
  const { signup } = useAuth();
  const { login, googleSignIn } = useAuth();

  let navigate = useNavigate();

  const handleShow = (e) => {
    // console.log(e);
    setShowP(!showP);
    setpassText(passText === "password" ? "text" : "password");
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);

      // navigate("/", {replace: true});
    } catch (err) {
      // setError(err);
      console.log(err);
      setError(err.message.split(":")[1]);
      setLoading(false);
    }
  }

  if (props.user === null || props.user === undefined) {
    return (
      <div className="login-wrapper">
        <div className="content">
          <div className="container">
            <div className="row justify-content-center">
              {/* <!-- <div className="col-md-6 order-md-2">
                        <img src="images/undraw_file_sync_ot38.svg" alt="Image" className="img-fluid">
                    </div> --> */}
              <div className="col-md-6 contents">
                <div className="row justify-content-center">
                  <div className="col-md-12">
                    <div className="form-block">
                      <div className="mb-4">
                        <center>
                          <h3
                            style={{
                              fontFamily: "Fira Sans",
                              fontWeight: "bold",
                              color: "#434445",
                            }}
                          >
                            Welcome to Readers Club
                          </h3>
                        </center>
                        <p className="mb-4" style={{ color: "red" }}>
                          {Error}
                        </p>
                      </div>
                      <form onSubmit={handleSubmit}>
                        <div
                          className="form-group first"
                          onClick={(e) =>
                            (e.target.previousSibling.hidden = true)
                          }
                          onBlurCapture={(e) => {
                            if (e.target.value.length === 0)
                              e.target.previousSibling.hidden = false;
                          }}
                        >
                          <label htmlFor="username">Username</label>
                          <input
                            type="text"
                            className="form-control"
                            id="username"
                            ref={usernameRef}
                          />
                        </div>
                        <div
                          className="form-group"
                          onClick={(e) =>
                            (e.target.previousSibling.hidden = true)
                          }
                          onBlurCapture={(e) => {
                            if (e.target.value.length === 0)
                              e.target.previousSibling.hidden = false;
                          }}
                        >
                          <label htmlFor="email">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            required
                            ref={emailRef}
                          />
                        </div>
                        <div
                          className="form-group last mb-4"
                          onClick={(e) =>
                            (e.target.previousSibling.hidden = true)
                          }
                          onBlurCapture={(e) => {
                            if (e.target.value.length === 0)
                              e.target.previousSibling.hidden = false;
                          }}
                        >
                          <label htmlFor="password">Password</label>
                          <input
                            type={passText}
                            className="form-control"
                            id="password"
                            ref={passwordRef}
                          />
                        </div>

                        <div className="d-flex mb-4 align-items-center">
                          <label className="control control--checkbox mb-0">
                            <span className="caption">Show Password</span>
                            <input
                              type="checkbox"
                              defaultChecked={false}
                              onClick={(e) => handleShow(e)}
                            />
                            <div className="control__indicator"></div>
                          </label>
                          {/* <span className="ml-auto"><a href="/#" className="forgot-pass">Forgot Password</a></span> */}
                        </div>
                        {/* <div className="row d-flex justify-content-end">
                                                    <div className="col-7">
                                                        <Link to="/login"><p>Already Have an account?</p></Link>
                                                    </div>
                                                </div> */}

                        {/* <span>Error</span> */}
                        <button
                          type="submit"
                          className="btn btn-block btn-primary"
                          style={{
                            backgroundColor: "#434445",
                            border: "#E5E4E2",
                            color: "white",
                            borderRadius: "0px",
                          }}
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              Loading...
                            </>
                          ) : (
                            <>Continue</>
                          )}
                          {/* Log In */}
                        </button>
                        <br />
                        <center>
                          <p>or you can sign in with</p>
                        </center>

                        {/* <span className="d-block text-center my-4 text-muted"> or sign in with</span> */}

                        <div className="social-login text-center my-4">
                          {/* <div className="pl-5 pb-3">
                                                        <GoogleLogin
                                                            onSuccess={(credentialResponse) => {
                                                                handleGoogleLogin(credentialResponse)
                                                                // console.log(credentialResponse);
                                                            }}
                                                            onError={() => {
                                                                console.log('Login Failed');
                                                            }}
                                                        />
                                                    </div> */}

                          {/* <Link to="" className="facebook mr-3">
                                                    <i className="fa fa-facebook mr-3"></i>
                                                </Link>
                                                <Link to="" className="twitter mr-3">
                                                    <i className="fa fa-twitter mr-3"></i>
                                                </Link> 

                                                     {/* <Link to="" onClick={() => googleSignIn()} style={{textDecoration: 'none'}}><button type="submit" className="btn btn-block btn-primary"
                                                    style={{ backgroundColor: "#E5E4E2", border: "black", color: "black" }}>
                                                        <div className="row">
                                                        <div className='col-2'><img src={require("./google.png")}style={{ width: 30, height: 30}} /></div>
                                                    <div className='col-8'>Continue with Google</div>
                                                        </div>
                                                     
                                                </button></Link> <Link to="" className="twitter mr-3">
                                                    <i className="fa fa-twitter mr-3"></i>
                                                </Link> */}
                          <Link
                            to=""
                            className="google mr-1"
                            onClick={() => googleSignIn()}
                          >
                            <i className="fa fa-google mr-1"></i>
                          </Link>
                        </div>
                        <center>
                          <p>
                            By continuing, you agree to Readersclub's{" "}
                            <strong>
                              <Link
                                to="/Terms"
                                style={{ textDecoration: "none" }}
                              >
                                Terms of Service
                              </Link>
                            </strong>{" "}
                            and acknowledge that you've read our{" "}
                            <strong>
                              <Link
                                to="/PrivacyPolicy"
                                style={{ textDecoration: "none" }}
                              >
                                Privacy Policy
                              </Link>
                            </strong>
                            .
                          </p>
                        </center>
                        <hr />
                        <center>
                          <Link to="/login" style={{ textDecoration: "none" }}>
                            Already a member? Log in
                          </Link>
                        </center>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    navigate("/", { replace: true });
    return <div></div>;
  }
}
