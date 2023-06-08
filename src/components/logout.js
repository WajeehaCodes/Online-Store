import "../styles/logout.scss";
import { Link } from "react-router-dom";

export default function Logout(props) {
    return (

        <div className="logoutD">
            <div className="navigation">

                <Link className="button" to="">
                    <img src={props.imgU} alt="user" />

                    <div className="logout">Logout</div>

                </Link>

            </div>
        </div>



    );
}