import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
// import { isDesktop, isMobile, isTablet } from "react-device-detect";
import sanityClient from "../utils/client";
import imageUrlBuilder from "@sanity/image-url";
import { categoryBooks } from "../utils/sanityQueries";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function BookRow({ booksData, ...props }) {
  const [newBooksData, setNewBooksData] = useState([]);

  useEffect(() => {
    if (booksData === null || booksData === undefined) {
      sanityClient
        .fetch(categoryBooks("Islamic"))
        .then((data) => {
          setNewBooksData(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  let count = 4;

  if (booksData) {
    return (
      <div className="container mt-1 mb-3">
        <div className="row">
          {booksData.slice(0, count).map((book, i) => {
            let dateCount = new Date(book.dateFeatured);

            let diff = new Date().getTime() - dateCount.getTime();
            let daydiff = diff / (1000 * 60 * 60 * 24);

            return (
              <div
                className="col-6 col-md-3"
                key={book._id + i}
                style={{ display: "inline-block" }}
              >
                <div className="content-books m-2">
                  <div
                    className="row d-flex justify-content-center align-items-center"
                    style={{
                      height: 300,
                      // background: "#f8f8f8",
                      position: "relative",
                    }}
                  >
                    <Link
                      to={"/shop/" + book._id}
                      style={{ color: "black", transition: "none" }}
                    >
                      {daydiff <= 7 && (
                        <small
                          style={{
                            position: "absolute",
                            top: "0.5rem",
                            left: "0.5rem",
                            background: "rgba(204, 204, 219, 0.96)",
                            padding: "0.2rem 0.4rem",
                            borderRadius: "10px",
                          }}
                        >
                          New
                        </small>
                      )}
                      <div className="col-12">
                        <div className="row  justify-content-center">
                          <LazyLoadImage
                            src={urlFor(book.Image)}
                            className="img-fluid product-thumbnail"
                            style={{
                              width: 150,
                              height: 220,
                              boxShadow: "10px 10px 8px 10px #D3D3D3",
                            }}
                          />
                        </div>
                      </div>
                    </Link>
                  </div>

                  <div
                    className="row text-center"
                    style={{
                      lineHeight: 0.8,
                    }}
                  >
                    <div className="col-12">
                      <Link
                        to={"/shop/" + book._id}
                        style={{ color: "#434445", transition: "none" }}
                      >
                        <span
                          style={{
                            fontFamily: "sans-serif",
                            fontSize: "12px",
                            fontStyle: "Bold",
                          }}
                        >
                          {book.Name}
                        </span>

                        <div
                          className="mt-2"
                          style={{ fontSize: 12, color: "GrayText" }}
                        >
                          {book.Category.join(", ")}
                        </div>

                        <br />
                      </Link>
                    </div>
                  </div>
                  <div className="row text-center">
                    <div className="col-12">
                      <Link
                        to={"/shop/" + book._id}
                        style={{ color: "black", transition: "none" }}
                      >
                        <center>
                          <span
                            style={{
                              fontWeight: "bold",
                              textAlign: "center",
                              border: "1px solid transparent",
                              padding: "3px",
                              color: "#434445",
                            }}
                          >
                            Rs. {book.price}/-
                          </span>
                        </center>
                      </Link>
                      <button
                        type="button"
                        onClick={(e) => props.addToCart(book)}
                        style={{
                          backgroundColor: "#434445",
                          color: "#E5E4E2",

                          borderColor: "transparent",
                          borderRadius: "0px",
                        }}
                      >
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="container mt-1 mb-3">
        <div className="row">
          {newBooksData.slice(0, count).map((book, i) => {
            let dateCount = new Date(book.dateFeatured);

            let diff = new Date().getTime() - dateCount.getTime();
            let daydiff = diff / (1000 * 60 * 60 * 24);

            return (
              <div
                className="col-6 col-md-3"
                key={book._id + i}
                style={{ display: "inline-block" }}
              >
                <div className="content-books m-2">
                  <div
                    className="row d-flex justify-content-center align-items-center"
                    style={{
                      height: 300,
                      // background: "#f8f8f8",
                      position: "relative",
                    }}
                  >
                    <Link
                      to={"/shop/" + book._id}
                      style={{ color: "black", transition: "none" }}
                    >
                      {daydiff <= 7 && (
                        <small
                          style={{
                            position: "absolute",
                            top: "0.5rem",
                            left: "0.5rem",
                            background: "rgba(204, 204, 219, 0.96)",
                            padding: "0.2rem 0.4rem",
                            borderRadius: "10px",
                          }}
                        >
                          New
                        </small>
                      )}
                      <div className="col-12">
                        <div className="row  justify-content-center">
                          <LazyLoadImage
                            src={urlFor(book.Image)}
                            className="img-fluid product-thumbnail"
                            style={{
                              width: 150,
                              height: 220,
                              boxShadow: "10px 10px 8px 10px #D3D3D3",
                            }}
                          />
                        </div>
                      </div>
                    </Link>
                  </div>

                  <div
                    className="row text-center"
                    style={{
                      lineHeight: 0.8,
                    }}
                  >
                    <div className="col-12">
                      <Link
                        to={"/shop/" + book._id}
                        style={{ color: "#434445", transition: "none" }}
                      >
                        <span
                          style={{
                            fontFamily: "sans-serif",
                            fontSize: "12px",
                            fontStyle: "Bold",
                          }}
                        >
                          {book.Name}
                        </span>

                        <div
                          className="mt-2"
                          style={{ fontSize: 12, color: "GrayText" }}
                        >
                          {book.Category.join(", ")}
                        </div>

                        <br />
                      </Link>
                    </div>
                  </div>
                  <div className="row text-center">
                    <div className="col-12">
                      <Link
                        to={"/shop/" + book._id}
                        style={{ color: "black", transition: "none" }}
                      >
                        <center>
                          <span
                            style={{
                              fontWeight: "bold",
                              textAlign: "center",
                              border: "1px solid transparent",
                              padding: "3px",
                              color: "#434445",
                            }}
                          >
                            Rs. {book.price}/-
                          </span>
                        </center>
                      </Link>
                      <button
                        type="button"
                        onClick={(e) => props.addToCart(book)}
                        style={{
                          backgroundColor: "#434445",
                          color: "#E5E4E2",

                          borderColor: "transparent",
                          borderRadius: "0px",
                        }}
                      >
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
