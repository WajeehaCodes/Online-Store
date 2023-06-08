export default function WhatsappButton() {
    const phoneNumber = "923027308993"
    let linkToWhatsapp = "";
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // true for mobile device
        linkToWhatsapp = "https://wa.me/" + phoneNumber;
    } else {
        // false for not mobile device
        linkToWhatsapp = "https://web.whatsapp.com/send?text=Hi!\nI need your help in finding a book.&phone=" + phoneNumber;
    }
    return (
        <a href={linkToWhatsapp}
            target="_blank"
            rel='noopener noreferrer'
            style={{
                zIndex: 3,
                position: "fixed",
                bottom: 20,
                right: 20,
                padding: 5,
                color: "#707070",
                fontWeight: "bold",
                textDecoration: "none"
            }}>
            <span>
                <img src={require('./whatsapp-icon.png')}
                    style={{
                        height: 35,
                        width: 35
                    }}
                    alt="whatsapp logo"
                /> </span>
        </a>
    );
}