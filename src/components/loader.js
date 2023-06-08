import "../styles/loader.css";

export default function Loader() {
    return (
        <div className="container" style={{height: "400px"}}>
            <figure className="loader">
                <div className="dot white"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </figure>
        </div>
    );
}