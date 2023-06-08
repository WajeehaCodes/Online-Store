import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "../styles/productDetails.css"

export default function DescriptiveImages({ bookD, _handleHover, urlFor }) {
  const [selected, setSelected] = useState(0);
  let arrayOfImages = [bookD.Image, ...bookD.descriptiveImages];

  return (
    <div className="row d-flex justify-content-center align-items-center">
      <span
        className="col-1 choose-img-arrow"
        onClick={() => {
          let prev = selected - 1 < 0 ? arrayOfImages.length - 1 : selected - 1;
          setSelected(prev);
          _handleHover(arrayOfImages[prev]);
        }}
      >
        <i className="fa fa-chevron-left"></i>
      </span>

      <div className="col thumbs-wrap m-1 mt-3 text-center">
        {bookD.descriptiveImages !== null
          ? arrayOfImages.map((imageDesc, i) => {
              if (selected === i) {
                return (
                  <Link
                    to=""
                    className="item-thumb"
                    key={bookD._id + "dec_img" + i}
                  >
                    {" "}
                    <LazyLoadImage src={urlFor(imageDesc).height(100).url()} />
                  </Link>
                );
              } else {
                return (
                  <Link
                    to=""
                    className="item-thumb"
                    onClick={() => {
                      setSelected(i);
                      _handleHover(imageDesc);
                    }}
                    key={bookD._id + "dec_img" + i}
                  >
                    {" "}
                    <LazyLoadImage src={urlFor(imageDesc).height(80).url()} />
                  </Link>
                );
              }
            })
          : null}
      </div>
      <span
        className="col-1 choose-img-arrow"
        onClick={() => {
          let next = (selected + 1) % arrayOfImages.length;
          setSelected(next);
          _handleHover(arrayOfImages[next]);
        }}
      >
        <i className="fa fa-chevron-right"></i>
      </span>
    </div>
  );
}
