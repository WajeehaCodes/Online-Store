import { LazyLoadImage } from "react-lazy-load-image-component";
import sanityClient from "../../utils/client";
import imageUrlBuilder from "@sanity/image-url";
import { Link } from "react-router-dom";
import Loader from "../../components/loader";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useEffect, useState } from "react";
import "../../styles/home.css";
import BookRow from "../../components/BookRow";
import { categoryBooks } from "../../utils/sanityQueries";

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

const responsiveBanner = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

function Home(props) {
  let categories = [];

  const [catDict, setCatDict] = useState({});
  const [islamicBooks, setIslamicBooks] = useState([]);
  // const [categoryQuan, setcategoryQuan] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(categoryBooks("Islamic"))
      .then((data) => {
        setIslamicBooks(data);
      })
      .catch((err) => {
        console.error(err);
      });

    let temp = {};
    props.categoryBlock.forEach((catB, i) => {
      temp[catB.description] = -1;
    });

    const getLatestBooksAccCategory = () => {
      let dictCat = {};
      props.allBooks.forEach((book, i) => {
        book.Category.forEach((c) => {
          if (dictCat[c] === undefined) {
            dictCat[c] = 1;
          } else {
            dictCat[c]++;
          }

          if (temp[c] !== undefined) {
            // console.log(temp, c);
            if (temp[c] === -1) {
              temp[c] = i;
            } else if (
              book.dateFeatured !== null &&
              props.allBooks[temp[c]].dateFeatured !== null
            ) {
              let dateB = new Date(book.dateFeatured);
              let dateT = new Date(props.allBooks[temp[c]]);

              if (dateB > dateT) temp[c] = i;
            }
          }
        });
      });

      let sorted = [];
      for (const key in dictCat) {
        if (dictCat[key] !== undefined) {
          sorted.push([key, dictCat[key]]);
        }
      }

      sorted.sort((a, b) => b[1] - a[1]);
      // setcategoryQuan(sorted);
    };
    getLatestBooksAccCategory();
    setCatDict(temp);
  }, [props.categoryBlock, props.allBooks]);

  if (
    props.booksDisplay === null ||
    props.booksDisplay === undefined ||
    props.booksDisplay.length === 0
  ) {
    return <Loader />;
  } else {
    props.booksDisplay.forEach((book) => {
      if (categories.indexOf(book.Category[0]) < 0) {
        categories.push(book.Category[0]);
      }
    });

    // console.log(categoryBlock);

    return (
      <div>
        <section className="hero-section ml-3 mr-3">
          <div className="hero-items ">
            <Carousel
              responsive={responsiveBanner}
              swipeable={true}
              draggable={true}
              // showDots={true}
              ssr={true} // means to render carousel on server-side.
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={7000}
              keyBoardControl={true}
              customTransition="all .7s"
              transitionDuration={700}
              containerClass="carousel-container"
              // removeArrowOnDeviceType={["tablet", "mobile"]}
              // deviceType={this.props.deviceType}
              // dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
            >
              {props.banners.length > 0 &&
                props.banners.map((ban, i) => {
                  return (
                    <div
                      className="single-hero-items p-0 m-0"
                      key={ban.title + i}
                    >
                      <img
                        src={urlFor(ban.Picture).url()}
                        style={{ maxHeight: "55%", width: "100%" }}
                        alt="banner1"
                      />
                    </div>
                  );
                })}
            </Carousel>
          </div>
        </section>

        {/*  <div className="container">
          <div className="row ml-5">
            <h3
              style={{
                fontWeight: "bold",
                fontFamily: "helvetica",
              }}
            >
              Recently Added
            </h3>
          </div>
        </div> */}
        <BookRow
          booksData={islamicBooks}
          addToCart={props.addToCart}
          link={"/shop/"}
        />
        <br />
        <br />
        <Link to="/shop">
          <div className="container mb-5">
            <div className="row d-flex justify-content-center">
              <button className="cta">
                <span>View All</span>
                <svg viewBox="0 0 13 10" height="10px" width="15px">
                  <path d="M1,5 L11,5"></path>
                  <polyline points="8 1 12 5 8 9"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </Link>

        <section className="women-banner spad mt-2">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-3">
                <div
                  className="product-large set-bg"
                  style={{ backgroundImage: `url("assets/img/long.jpg")` }}
                >
                  {/* <NavLink to="/shop" style={{ color: "black" }}>Discover More</NavLink> */}
                </div>
              </div>
              <div className="col-lg-8 offset-lg-1">
                <div className="filter-control mb-0 pb-0">
                  <div className="list-group" id="list-example">
                    <ul>
                      {categories.map((category, i) => {
                        let url = "categories/" + category;

                        return (
                          <Link to={url}>
                            <li
                              key={category}
                              className="list-group-item ml-1 mr-1 mb-1 category-btn"
                              style={{ borderRadius: "0px" }}
                            >
                              {category}
                            </li>
                          </Link>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <div className="product-slider">
                  <div
                    data-spy="scroll"
                    data-target="#list-example"
                    data-offset="0"
                    className="scrollspy-example"
                  >
                    <div className="untree_co-section product-section before-footer-section">
                      <Carousel
                        swipeable={false}
                        draggable={false}
                        showDots={true}
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
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-40-px"
                      >
                        {props.booksDisplay.map((book, i) => {
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
                                    to={"shop/" + book._id}
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
                                          background:
                                            "rgba(204, 204, 219, 0.96)",
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
                                            boxShadow:
                                              "10px 10px 8px 10px #D3D3D3",
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </Link>
                                </div>

                                <div className="row text-center">
                                  <div className="col-12">
                                    <Link
                                      to={"shop/" + book._id}
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
                                        style={{
                                          fontSize: 12,
                                          color: "GrayText",
                                        }}
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
                                            // padding: "3px",
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="card">
              {categoryQuan.splice(0, 4).map((cQ, i) => {
                return (
                  <div className={`item item--${i + 1}`}>
                    <span className="quantity">{cQ[1]}</span>
                    <span className={`text text--${i + 1}`}>{cQ[0]}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div> */}
        <div className="banner-section spad">
          <div className="container-fluid">
            <div className="row justify-content-center">
              {props.categoryBlock.map((categoryB) => {
                let link = "categories/" + categoryB.description;
                return (
                  <div
                    className="col-lg-4 m-4"
                    style={{
                      maxWidth: 370,
                      height: 200,
                      borderRadius: "5px",
                      background:
                        categoryB.description === "Islamic"
                          ? "#8e44ad"
                          : categoryB.description === "Law"
                          ? "#2d98da"
                          : "#434445",
                    }}
                    key={categoryB.description}
                  >
                    <div className="row">
                      <div className="col-6" style={{ position: "relative" }}>
                        <div
                          className="p-3 bg-white"
                          style={{
                            position: "absolute",
                            top: -20,
                            borderRadius: "2px",
                          }}
                        >
                          {props.allBooks[catDict[categoryB.description]] !==
                            undefined &&
                          catDict[categoryB.description] !== -1 ? (
                            <LazyLoadImage
                              src={urlFor(
                                props.allBooks[catDict[categoryB.description]]
                                  .Image
                              ).url()}
                              alt="Medical"
                              style={{ height: 170, width: 170 }}
                            />
                          ) : (
                            <LazyLoadImage
                              src={urlFor(categoryB.Picture).url()}
                              alt="Medical"
                              style={{ height: 170 }}
                            />
                          )}
                        </div>
                      </div>
                      <div
                        className="col-6 "
                        style={{ position: "relative", minHeight: 180 }}
                      >
                        <div
                          className="row"
                          style={{ position: "absolute", bottom: -10 }}
                        >
                          <div
                            className="col-12 pb-2 text-white"
                            style={{
                              fontSize: "1.5rem",
                              bottom: -8,
                            }}
                          >
                            <strong>{categoryB.extra}</strong>
                          </div>
                          <div className="col-11 pb-2">
                            <Link to={link}>
                              <div
                                className="btn btn-block btn-sm p-3"
                                style={{
                                  border: "1px solid white",
                                  borderRadius: 5,
                                  background:
                                    categoryB.description === "Islamic"
                                      ? "#8e44ad"
                                      : categoryB.description === "Law"
                                      ? "#2d98da"
                                      : "#434445",
                                }}
                              >
                                See More <i className="fa fa-chevron-right"></i>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <section className="latest-blog spad">
          <div className="container">
            <div className="benefit-items">
              <div className="row">
                <div className="col-lg-4">
                  <div className="single-benefit">
                    <div className="sb-icon">
                      <img src="assets/img/icon-1.png" alt="" />
                    </div>
                    <div className="sb-text">
                      <h6>Free Shipping</h6>
                      <p>For all order over 2500</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="single-benefit">
                    <div className="sb-icon">
                      <img src="assets/img/icon-2.png" alt="" />
                    </div>
                    <div className="sb-text">
                      <h6>Delivery On Time</h6>
                      <p>Goods have Premium Quality</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="single-benefit">
                    <div className="sb-icon">
                      <img src="assets/img/icon-1.png" alt="" />
                    </div>
                    <div className="sb-text">
                      <h6>Secure Payment</h6>
                      <p>100% secure payment</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
