import React, { useEffect, useState } from "react";
import "../../styles/productDetails.css";
import { getBookSpec, categoryBooks } from "../../utils/sanityQueries";
import { LazyLoadImage } from "react-lazy-load-image-component";
import sanityClient from "../../utils/client";
import imageUrlBuilder from "@sanity/image-url";
import Loader from "../../components/loader";
import { Link, useLocation } from "react-router-dom";
import Carousel from "react-multi-carousel";
import { isMobile, isTablet } from "react-device-detect";
import DescriptiveImages from "../../components/DescriptiveImages";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  if (source !== null) return builder.image(source);
  else return "";
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

let ZOOM_IMAGE_SIZE = 0;

if (isMobile) {
  ZOOM_IMAGE_SIZE = 600;
} else {
  ZOOM_IMAGE_SIZE = 800;
}

function ProductDetails(props) {
  const [book, setBook] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [suggestions, setSuggestions] = useState([]);
  const location = useLocation();

  useEffect(() => {
    let len = window.location.pathname.split("/").length;
    let id = window.location.pathname.split("/")[len - 1];

    let query = getBookSpec(id);
    sanityClient
      .fetch(query)
      .then((data) => {
        // console.log(data)
        setBook({ book: data });
        setMainImage(data[0].Image);

        sanityClient
          .fetch(categoryBooks(data[0].Category[0], data[0]._id))
          .then((sug) => {
            setSuggestions(sug);
            // console.log(sug);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));

    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  const zoom = (e) => {
    if (isMobile || isTablet) {
      window.open(urlFor(book.book[0].Image), "_blank");
      return;
    }
    try {
      var zoomer = e.currentTarget;
      // console.log(e);
      let offsetX = 0;
      let offsetY = 0;
      e.nativeEvent.offsetX
        ? (offsetX = e.nativeEvent.offsetX)
        : (offsetX = e.touches[0].pageX);
      e.nativeEvent.offsetY
        ? (offsetY = e.nativeEvent.offsetY)
        : (offsetX = e.touches[0].pageX);
      let x = (offsetX / zoomer.offsetWidth) * 100;
      let y = (offsetY / zoomer.offsetHeight) * 100;
      zoomer.style.backgroundPosition = x + "% " + y + "%";
    } catch (err) {
      console.log(err);
    }
  };

  const _handleHover = (imgH) => {
    setMainImage(imgH);
  };

  const addBooksCount = () => {
    if (quantity < book.book[0].quantity) setQuantity(quantity + 1);
  };

  const subtractBooksCount = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  if (book === [] || book.length === 0) {
    return <Loader />;
  } else {
    return book.book.map((bookD) => {
      return (
        <>
          <section
            className="section-content p-3"
            key={bookD._id}
            style={{
              // backgroundColor: "rgba(249, 249, 249, 0.77)",
              borderRadius: "20px",
            }}
          >
            <div className="container">
              <article
                className="card"
                style={{
                  borderRadius: "0px",
                }}
              >
                <div className="card-body">
                  <div className="row">
                    <aside className="col-md-6">
                      <article className="gallery-wrap d-flex justify-content-center">
                        <div
                          className="card border-4 img-big-wrap"
                          style={{ boxShadow: "10px 10px 8px 10px #D3D3D3" }}
                        >
                          {mainImage && (
                            <Link to="">
                              {" "}
                              <figure
                                className="zoom"
                                onMouseMove={(e) => zoom(e)}
                                style={{
                                  backgroundImage: `url(${urlFor(mainImage)
                                    .height(ZOOM_IMAGE_SIZE)
                                    .url()})`,
                                  width: "auto",
                                  height: "auto",
                                }}
                              >
                                <LazyLoadImage
                                  src={urlFor(mainImage).height(400).url()}
                                  alt={bookD.Name}
                                  style={{
                                    width: "auto",
                                    height: "auto",
                                    maxHeight: "400px",
                                  }}
                                />
                              </figure>
                            </Link>
                          )}
                        </div>
                      </article>

                      {bookD.descriptiveImages && (
                        <DescriptiveImages
                          bookD={bookD}
                          _handleHover={_handleHover}
                          urlFor={urlFor}
                          mainImage={mainImage}
                        />
                      )}
                    </aside>
                    <main className="col-md-6 pt-3">
                      <article>
                        <h3
                          className="title"
                          style={{ fontWeight: "bold", color: "#434445" }}
                        >
                          {bookD.Name}
                        </h3>
                        <br />
                        {/* <hr style={{borderTop: "0.1rem dotted #c8c1c1"}}/> */}
                        <i
                          className="fa fa-star"
                          style={{ color: "#fcb900" }}
                        ></i>{" "}
                        <i
                          className="fa fa-star"
                          style={{ color: "#fcb900" }}
                        ></i>{" "}
                        <i className="fa fa-star" style={{ color: "#fcb900" }}>
                          {" "}
                        </i>{" "}
                        <i
                          className="fa fa-star"
                          style={{ color: "#fcb900" }}
                        ></i>{" "}
                        <i className="fa fa-star" style={{ color: "grey" }}></i>
                        <hr />
                        <div className="mb-3">
                          {/* Price: &nbsp; */}
                          <span
                            style={{
                              fontSize: "1.2rem",
                              fontWeight: "bold",
                              fontFamily: "sans-serif",
                              color: "#434445 ",
                              borderRadius: "20px",
                            }}
                          >
                            Rs. {bookD.price}/-
                          </span>{" "}
                          <span className="mx-2">
                            <del style={{ color: "red" }}>Rs. 00</del>
                          </span>
                          <br />
                        </div>
                        <div className="pt-3">
                          QTY: &nbsp;
                          <button
                            className="q-minus btn-quantity"
                            onClick={(e) => subtractBooksCount()}
                          >
                            &minus;
                          </button>
                          <input
                            className="q-input"
                            type="text"
                            pattern="[0-9]*"
                            onInput={(e) => {
                              setQuantity(
                                e.target.validity.valid &&
                                  parseInt(e.target.value) < bookD.quantity
                                  ? parseInt(e.target.value)
                                  : quantity
                              );
                              if (e.target.value === "") setQuantity(0);
                            }}
                            value={quantity}
                          />
                          <button
                            className="q-plus btn-quantity"
                            onClick={(e) => addBooksCount()}
                          >
                            +
                          </button>
                        </div>
                        <hr />
                        <div className="mb-4 d-flex justify-content-center book-btn">
                          <Link
                            to=""
                            className="btn btn-sm p-2 mr-1 col"
                            onClick={(e) => props.addToCart(bookD, quantity)}
                            style={{
                              backgroundColor: "transparent",
                              color: "#434445 ",
                              borderRadius: "0px",
                            }}
                          >
                            ADD TO CART
                          </Link>

                          <Link
                            to="/checkout"
                            className="btn btn-sm p-2 ml-1 col"
                            onClick={(e) => props.addToCart(bookD, quantity)}
                            style={{
                              backgroundColor: "#434445 ",
                              color: "white",
                              borderRadius: "0px",
                            }}
                          >
                            BUY IT NOW
                          </Link>
                        </div>
                        {bookD.description && (
                          <>
                            <hr />
                            <div className="mb-3">
                              <h6
                                style={{
                                  backgroundColor: "#434445",
                                  color: "#E5E4E2",
                                  padding: "10px",
                                  fontWeight: "bold",
                                }}
                              >
                                Short Description
                              </h6>
                              <br />
                              <p>{bookD.description}</p>
                            </div>
                          </>
                        )}
                        <hr />
                        <div className="share-link">
                          SHARE THIS BOOK
                          <br />
                          <br />
                          <Link
                            to={
                              "//https://www.facebook.com/sharer.php?u=" +
                              window.location.href
                            }
                            className="p-2 share-book-icon"
                            style={{ borderRadius: "0px" }}
                          >
                            <i
                              className="fa fa-facebook mb-4"
                              style={{ color: "#3b5998" }}
                            >
                              {" "}
                              Share
                            </i>
                          </Link>
                          <Link
                            to={
                              "//twitter.com/share?text=Tatariyon%20Ki%20Yalghar&amp;url=" +
                              window.location.href
                            }
                            className="p-2 share-book-icon mx-2"
                            style={{ borderRadius: "0px" }}
                          >
                            <i
                              className="fa fa-twitter mb-4"
                              style={{ color: "#00acee" }}
                            >
                              {" "}
                              Tweet
                            </i>
                          </Link>
                          <Link
                            to={
                              "//pinterest.com/pin/create/button/?url=" +
                              window.location.href
                            }
                            className="p-2 share-book-icon"
                            style={{ borderRadius: "0px" }}
                          >
                            <i
                              className="fa fa-pinterest mb-4"
                              style={{ color: "#c8232c" }}
                            >
                              {" "}
                              Pin it
                            </i>
                          </Link>
                        </div>
                      </article>
                    </main>
                  </div>
                </div>
              </article>
            </div>
          </section>

          <div className="container suggestions mt-2">
            <Carousel
              swipeable={false}
              draggable={false}
              // showDots={true}
              responsive={responsive}
              ssr={true} // means to render carousel on server-side.
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={5000}
              keyBoardControl={true}
              customTransition="all .5s"
              transitionDuration={1500}
              containerClass="carousel-container pb-5 pt-4 m-0"
              // removeArrowOnDeviceType={["tablet", "mobile"]}
              // deviceType={this.props.deviceType}
              // dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
            >
              {suggestions.map((book, i) => {
                let dateCount = new Date(book.dateFeatured);

                let diff = new Date().getTime() - dateCount.getTime();
                let daydiff = diff / (1000 * 60 * 60 * 24);

                return (
                  <div
                    className="col"
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
                          to={"../shop/" + book._id}
                          style={{
                            color: "black",
                            transition: "none",
                          }}
                        >
                          {book.dateFeatured && daydiff <= 7 && (
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

                      <div className="row text-center">
                        <div className="col-12">
                          <Link
                            to={"../shop/" + book._id}
                            style={{
                              color: "black",
                              transition: "none",
                            }}
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
                            <center>
                              <span
                                style={{
                                  fontWeight: "bold",
                                  textAlign: "center",
                                  border: "1px solid transparent",
                                  color: "#434445",
                                  padding: "3px",
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
                              color: "white",
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
            </Carousel>
          </div>
        </>
      );
    });
  }
}

export default ProductDetails;
