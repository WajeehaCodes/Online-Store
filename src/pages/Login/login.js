import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../styles/login.css";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
// import { GoogleLogin } from "@react-oauth/google";
// import { useGoogleLogin } from "@react-oauth/google";
// import jwt_decode from 'jwt-decode';
// import axios from "axios";
// import { googleLogout } from "@react-oauth/google";

export default function Login(props) {
  const [rememberOpt, setRememberOpt] = useState(true);
  let navigate = useNavigate();

  const [Error, setError] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  // const passwordConfirmRef = useRef()
  const { login, googleSignIn, forgotPassword } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      await login(emailRef.current.value, passwordRef.current.value);

      // navigate("/", {replace: true});
      console.log("Hi");
    } catch (error) {
      // setError(err);
      console.log(error);
      setLoading(false);
      setError(error.message);
    }
  }

  const perfectEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleRemember = (e) => {
    // console.log(e);
    setRememberOpt(!rememberOpt);
  };

  const handleForgotPassword = () => {
    if (perfectEmail(emailRef.current.value)) {
      forgotPassword(emailRef.current.value);
      toast.success("Email To reset Password has been sent.");
      setError("");
    } else {
      setError("Please Enter a Valid email");
    }
  };

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
                              color: "#434445",
                              fontFamily: "Fira Sans",
                              fontWeight: "bold",
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
                          className="form-group  mb-4"
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
                            type="password"
                            className="form-control"
                            id="password"
                            required
                            ref={passwordRef}
                          />
                        </div>

                        <div className="d-flex mb-4 align-items-center">
                          <label className="control control--checkbox mb-0">
                            <span className="caption">Remember me</span>
                            <input
                              type="checkbox"
                              defaultChecked={true}
                              onClick={(e) => handleRemember(e)}
                            />
                            <div className="control__indicator"></div>
                          </label>
                          <span className="ml-auto">
                            <Link
                              to=""
                              className="forgot-pass"
                              onClick={(e) => handleForgotPassword()}
                              style={{ textDecoration: "none" }}
                            >
                              Forgot Password?
                            </Link>
                          </span>
                        </div>

                        {/* <span>Error</span> */}
                        <button
                          type="submit"
                          className="btn btn-block"
                          style={{
                            backgroundColor: "#434445",
                            borderRadius: "0px",
                            // border: "#E5E4E2",
                            color: "white",
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
                            <>Log in</>
                          )}
                          {/* Log In */}
                        </button>
                        <br />
                        <center>
                          <p>or you can sign in with</p>
                        </center>
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

                        {/* <Link to="" onClick={() => googleSignIn()} style={{textDecoration: 'none'}}><button type="submit" className="btn btn-block btn-primary"
                                                    style={{ backgroundColor: "#E5E4E2", border: "black", color: "black" }}>
                                                        <div className="row">
                                                        <div className='col-2'><img src={require("./google.png")}style={{ width: 30, height: 30}} /></div>
                                                    <div className='col-8'>Continue with Google</div>
                                                        </div>
                                                     
                                                </button></Link> */}
                        <center>
                          <Link
                            to="/register"
                            style={{ textDecoration: "none" }}
                          >
                            Not on Readers Club yet? Sign up
                          </Link>
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
                                                        </div> 

                                                        <Link to="" className="facebook mr-3">
                                                        <i className="fa fa-facebook mr-3"></i>
                                                    </Link>
                                                    <Link to="" className="twitter mr-3">
                                                        <i className="fa fa-twitter mr-3"></i>
                                                    </Link>  */}
                          <Link to="" onClick={() => googleSignIn()}>
                            <i className="fa fa-google mr-3"></i>
                          </Link>
                        </div>
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
