import "../styles/cart_loader.css";
import { Link } from "react-router-dom";

export default function BookLoader() {
    return (
        <div className="row d-flex justify-content-center align-items-center con_cart_loader" style={{minHeight: 400}}>
            <div className="col-6">
                <h4>You Cart is Empty</h4>
                <Link to="/shop"><button className="btn btn-success m-3">Add Books</button></Link>
            </div>
            <div className="typewriter">
                <div className="slide"><i></i></div>
                <div className="paper"></div>
                <div className="keyboard"></div>
            </div>
        </div>
    );
}