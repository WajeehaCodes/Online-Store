// export default function BookCard({ book }) {
//   let dateCount = new Date(book.dateFeatured);

//   let diff = new Date().getTime() - dateCount.getTime();
//   let daydiff = diff / (1000 * 60 * 60 * 24);

//   return (
//     <div
//       className="col-6 col-md-3"
//       key={book._id + i}
//       style={{ display: "inline-block" }}
//     >
//       <div className="content-books m-2">
//         <div
//           className="row d-flex justify-content-center align-items-center"
//           style={{
//             height: 300,
//             // background: "#f8f8f8",
//             position: "relative",
//           }}
//         >
//           <Link to={book._id} style={{ color: "black", transition: "none" }}>
//             {book.dateFeatured && daydiff <= 7 && (
//               <small
//                 style={{
//                   position: "absolute",
//                   top: "0.5rem",
//                   left: "0.5rem",
//                   background: "rgba(204, 204, 219, 0.96)",
//                   padding: "0.2rem 0.4rem",
//                   borderRadius: "10px",
//                 }}
//               >
//                 New
//               </small>
//             )}
//             <div className="col-12">
//               <div className="row  justify-content-center">
//                 <LazyLoadImage
//                   src={urlFor(book.Image)}
//                   className="img-fluid product-thumbnail"
//                   style={{
//                     width: 150,
//                     height: 220,
//                     boxShadow: "10px 10px 8px 10px #D3D3D3",
//                   }}
//                 />
//               </div>
//             </div>
//           </Link>
//         </div>

//         <div
//           className="row text-center"
//           style={{
//             lineHeight: 0.8,
//           }}
//         >
//           <div className="col-12">
//             <Link to={book._id} style={{ color: "black", transition: "none" }}>
//               <span
//                 style={{
//                   fontFamily: "sans-serif",
//                   fontSize: "12px",
//                   fontStyle: "Bold",
//                 }}
//               >
//                 {book.Name}
//               </span>
//               <br />
//             </Link>
//           </div>
//         </div>
//         <div className="row text-center">
//           <div className="col-12 mt-2">
//             <Link to={book._id} style={{ color: "black", transition: "none" }}>
//               <center>
//                 <span
//                   style={{
//                     fontWeight: "bold",
//                     textAlign: "center",
//                     border: "1px solid transparent",

//                     padding: "3px",
//                   }}
//                 >
//                   Rs. {book.price}
//                 </span>
//               </center>
//             </Link>
//             <button
//               type="button"
//               onClick={(e) => props.addToCart(book)}
//               style={{
//                 backgroundColor: "black",
//                 color: "white",
//                 borderColor: "transparent",
//                 borderRadius: "5px",
//               }}
//             >
//               <img
//                 height="18"
//                 src="https://www.libertybooks.com/image/icons/cart-small.png"
//                 alt="cart-ico"
//               />{" "}
//               <span>Add to Cart</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
