import { useEffect, useState } from "react";
const logo = require("./upArrow.png");
import("../styles/scrolling.css");

function ScrollToTop() {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScrollButtonVisibility = () => {
            window.pageYOffset > 300 ? setShowButton(true) : setShowButton(false);
        };

        window.addEventListener('scroll', handleScrollButtonVisibility);

        return () => {
            window.removeEventListener('scroll', handleScrollButtonVisibility);
        };
    }, []);

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <>
            {showButton &&
                <div className="scrollToTop">
                    <button className="btn-scroll"
                        onClick={handleScrollToTop}>
                        <img src={logo} alt="scroll logo" className="logo-scroll" />
                    </button>
                </div>
            }
        </>
    );
}

export default ScrollToTop;