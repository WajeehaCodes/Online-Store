import { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import sanityClient from "../../utils/client";
import imageUrlBuilder from "@sanity/image-url";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
    return builder.image(source);
}

export default function Wishlist(props) {
    useEffect(() => {
        document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);
    const navigate = useNavigate();
    if (props.user === undefined || props.user === null) {
        navigate("/", { replace: true })
        return <></>;
    }
    else {

        return (
            <div className="untree_co-section product-section before-footer-section">
                <div className="container">
                    <div className="row">
                        {
                            props.user.wishlist.map((book, i) => {
                                return (
                                    <div className="col-6 col-md-3" key={book._id}>
                                        <div className="content-books m-2">
                                            <Link to={book._id} style={{ color: "black", transition: "none" }}>
                                                <div className="row d-flex justify-content-center align-items-center" style={{ height: 350, background: "#f8f8f8" }}>
                                                    <div className="col-12">
                                                        <div className="row d-flex justify-content-center">
                                                            <LazyLoadImage src={urlFor(book.Image)}
                                                                className="img-fluid product-thumbnail" />
                                                        </div>
                                                    </div>
                                                </div>

                                                {book.Name}
                                                <br />
                                                <span style={{ color: "red", fontWeight: "bold" }}>Rs.{book.price}</span>
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })
                        }

                    </div>
                </div>
            </div>
        );
    }
}
                                    // <div className="col-12 col-md-4 col-lg-3 mb-5 p-item border " key={i}>
                                    //     <Link className="product-item">
                                    //         <LazyLoadImage src={urlFor(book.Image).height(300).url()}
                                    //             className="img-fluid product-thumbnail" />
                                    //         <h3 className="product-title p-2">{book.Name}</h3>
                                    //         <h5 className="product-title p-2" style={{ fontWeight: 100 }}>{book.Authors[0]}</h5>
                                    //         <strong className="product-price" style={{ color: "red" }}>Pkr{book.price}</strong>
                                    //     </Link>

                                    //     <div className="btn d-flex" style={{ visibility: "hidden" }}>
                                    //         <span className="icon-cart" onClick={e => props.addToCart(book)}>
                                    //             <LazyLoadImage src="/assets/img/add-to-cart.svg" className="img-fluid" style={{ width: 30 }} />
                                    //         </span>
                                    //         <Link to={`../shop/${book._id}`} className="icon-cross" >
                                    //             <LazyLoadImage src="/assets/img/cross.svg" className="img-fluid" />
                                    //         </Link>
                                    //         <span className="icon-heart" onClick={e => props.deleteFromWishlist(book)}>
                                    //             <LazyLoadImage src="/assets/img/heart.svg" className="img-fluid" />
                                    //         </span>
                                    //     </div>
                                    // </div>