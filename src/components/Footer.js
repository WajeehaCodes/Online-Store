import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="footer-left">
              <div className="footer-logo">
                <NavLink
                  to="/"
                  style={{ color: "#E5E4E2", fontWeight: "bold" }}
                >
                  Readers Club
                  {/* <img src="assets/img/logo1.png" alt="logo" /> */}
                </NavLink>
              </div>
              <p style={{ color: "#E5E4E2" }}>
                It is an online Book Store. Established in 2023 with a unique
                Philosophy to revive the Country Readers, providing all kind of
                Authentic Books(Islam, Law, Fiction, Story, Kids), Rehal &
                Digital Devices under single roof.
              </p>
              <div className="footer-social">
                <a
                  href="
                      https://www.facebook.com/profile.php?id=100089369271007"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  <i className="fa fa-facebook"></i>
                </a>
                <a
                  href="https://www.instagram.com/readersclubpk/"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  <i className="fa fa-instagram"></i>
                </a>
                <NavLink to="">
                  <i className="fa fa-twitter"></i>
                </NavLink>
                <NavLink to="">
                  <i className="fa fa-pinterest"></i>
                </NavLink>
              </div>
            </div>
          </div>
          <div className="col-lg-2 offset-lg-1">
            <div className="footer-widget">
              <h5 style={{ color: "#E5E4E2" }}>Information</h5>
              <ul>
                <li>
                  <NavLink to="/about" style={{ color: "#E5E4E2" }}>
                    Who We Are
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/shop" style={{ color: "#E5E4E2" }}>
                    Shop
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contact" style={{ color: "#E5E4E2" }}>
                    Contact
                  </NavLink>
                </li>
                {/* <li>
                  <NavLink to="/shop" style={{ color: "#E5E4E2" }}>
                    Services
                  </NavLink>
                </li> */}
              </ul>
            </div>
          </div>
          <div className="col-lg-2">
            <div className="footer-widget">
              <h5 style={{ color: "#E5E4E2" }}>Customer Care</h5>
              <ul>
                <li>
                  <NavLink to="/Terms" style={{ color: "#E5E4E2" }}>
                    Terms of Service
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/PrivacyPolicy" style={{ color: "#E5E4E2" }}>
                    {" "}
                    Privacy Policy
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/ExchangePolicy" style={{ color: "#E5E4E2" }}>
                    Return & Exchange
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/FAQ" style={{ color: "#E5E4E2" }}>
                    FAQs
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="newslatter-item">
              <h5 style={{ color: "#E5E4E2" }}>Join Our Newsletter Now</h5>
              <p style={{ color: "#E5E4E2" }}>
                Get E-mail updates about our latest Books and special offers.
              </p>
              <form action="#" className="subscribe-form">
                <input
                  type="text"
                  placeholder="Enter Your Mail"
                  style={{ color: "F2F1F0" }}
                />
                <button
                  className="footer-subscribe-btn"
                  type="button"
                  style={{ backgroundColor: "F2F1F0" }}
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-reserved">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="copyright-text" style={{ color: "#E5E4E2" }}>
                Copyright &copy; {new Date().getFullYear()} All rights reserved
                |{" "}
                <NavLink to="/" target="_blank" style={{ color: "#E5E4E2" }}>
                  Readers Club
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
