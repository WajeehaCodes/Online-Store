import { useEffect, useState } from "react";
// import { getDataLatest } from "../temporaryData";
import Loader from "../../components/loader";
import { LazyLoadImage } from "react-lazy-load-image-component";
import sanityClient from "../../utils/client";
import { searchQuey } from "../../utils/sanityQueries";
import imageUrlBuilder from "@sanity/image-url";
import { Link, useLocation } from "react-router-dom";
import "../../styles/searchResult.css";
// import { getDataLatest } from "../temporaryData";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  if (source !== null) return builder.image(source).height(300).url();
  else return "";
}

export default function SearchResult(props) {
  const location = useLocation();

  const [booksData, setBooksData] = useState(null);

  useEffect(() => {
    let q = window.location.pathname.split("/")[2];

    q = q.replaceAll("%20", " ");

    let query = searchQuey(q);
    sanityClient
      .fetch(query)
      .then((data) => {
        // console.log(data);
        data = data.filter((book) => {
          return (
            book.Name !== null &&
            book.Image !== null &&
            book.price !== null &&
            book.price > 0 &&
            book.quantity !== null &&
            book.quantity > 0 &&
            book.Authors !== null &&
            book.Category !== null
          );
        });
        if (data !== null) {
          data = data.filter(
            (book) =>
              book.Name !== null && book.Image !== null && book.quantity > 0
          );
        }
        setBooksData(data);
        // console.log(data);
      })
      .catch((err) => console.log(err));

    // let data = getDataLatest();
    // setBooksData(data);

    // console.log(booksData);

    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  let querySArr = location.pathname.split("/");
  let queryS = querySArr[querySArr.length - 1];

  if (booksData === null || booksData === undefined) {
    return <Loader />;
  } else if (booksData.length === 0) {
    return (
      <div className="untree_co-section product-section before-footer-section">
        <div className="container">
          <div className="row">
            <div className="mr-2 text-uppercase font-weight-bold">
              <span>Search Result: </span>
            </div>
            {queryS}
          </div>
          <div
            className="row d-flex justify-content-center align-items-center"
            style={{ height: "30vh" }}
          >
            <p>No Book found matching the search criteria</p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="untree_co-section product-section before-footer-section">
        <div className="container">
          <div className="row">
            <div className="mr-2 text-uppercase font-weight-bold">
              <span>Search Result: </span>
            </div>
            {queryS}
          </div>
          <div className="row">
            {booksData.map((book, i) => {
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
                        to={"../../shop/" + book._id}
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
                          to={"../../shop/" + book._id}
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
                          to={"../../shop/" + book._id}
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
      </div>
    );
  }
}
