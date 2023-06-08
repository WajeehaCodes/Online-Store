import { toast } from "react-hot-toast";
import emailjs from "@emailjs/browser";
import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/contact.css";

export default function Contact() {
  useEffect(() => {
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_CONTACT_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_EMAILJS_APP_PASS
      )
      .then(
        (result) => {
          toast.success("Message Sent");
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
          toast.fail("Somethings wrong");
        }
      );
    e.target.reset();
  };

  return (
    <>
      <br />
      <div className="container p-3 pb-5 pt-5">
        <h3
          style={{
            textAlign: "center",
            fontFamily: "sans-serif",
            color: "#434445",
          }}
        >
          Contact
        </h3>
        <br />
        <form ref={form} onSubmit={sendEmail}>
          <label HtmlFor="name">Name</label>
          <input
            type="text"
            className="con-name"
            id="name"
            name="name"
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="con-email"
            id="email"
            name="email"
            required
          />

          <label htmlFor="subject">Subject</label>
          <input type="text" className="con-name" id="name" name="name" />

          <label htmlFor="subject">Message</label>
          <textarea
            className="con-mess"
            id="message"
            name="message"
            style={{ height: "500px" }}
            required
          ></textarea>

          <input
            type="submit"
            value="Submit"
            className="con-sub"
            style={{ backgroundColor: "#434445" }}
          />
        </form>

        <div className="container p-3 pb-5 pt-5">
          {/* <h4>Contact Address</h4><br /> */}
          <div className="d-block">
            <div className="row text-center">
              <div className="col-sm-3 col-xs-6">
                <img
                  src="assets/img/phone-call.png"
                  alt="phone"
                  style={{ width: "45px", height: "45px" }}
                />
                <div>
                  <br />
                  <p>
                    <strong>Address: </strong>+92 302 7308993
                  </p>
                  <br />
                </div>
              </div>
              <div className="col-sm-3 col-xs-6">
                <img
                  src="assets/img/gps.png"
                  alt="phone"
                  style={{ width: "45px", height: "45px" }}
                />
                <div>
                  <br />
                  <p>
                    <strong>Location: </strong>Urdu Bazar, Lahore, Paksitan
                  </p>
                  <br />
                </div>
              </div>
              <div className="col-sm-3 col-xs-6">
                <img
                  src="assets/img/email.png"
                  alt="email"
                  style={{ width: "45px", height: "45px" }}
                />
                <div>
                  <br />
                  <p
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <strong>E-mail: </strong>online@readersclub.com
                  </p>
                  <br />
                </div>
              </div>
              <div className="col-sm-3 col-xs-6">
                <img
                  src="assets/img/web.png"
                  alt="web"
                  style={{ width: "45px", height: "45px" }}
                />
                <div>
                  <br />
                  <p>
                    <strong>Web: </strong>
                    <Link to="www.readersclub.pk">readersclub.pk</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
    </>
  );
}
