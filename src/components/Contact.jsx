import { useEffect, useState } from "react";

export default function Contact() {
    const [showInfo, setShowInfo] = useState(false);
    const [infoLeave, setInfoLeave] = useState(false);

    useEffect(() => {
        setInfoLeave(!showInfo);
        const timer = setTimeout(() => setInfoLeave(false), 900);

        return () => clearTimeout(timer);
    }, [showInfo]);

    return (
        <div className="contact">
            <button 
                type="button" 
                className={`contact-button ${showInfo ? "show" : ""}`}
                onClick={() => setShowInfo(!showInfo)}
            >
                Contact
            </button>
            
            <ul className={`contact-info ${showInfo ? "show" : ""} ${infoLeave ? "leave" : ""}`}>
                <li>
                    <a className="contact-info-item" href="mailto:simonmckindley@gmail.com">
                        <span>Email</span>
                        <span className="contact-address">simonmckindley@gmail.com</span>
                    </a>
                </li>
                <li>
                    <a className="contact-info-item" href="https://www.linkedin.com/in/simon-mckindley/" target="_blank">
                        <span>LinkedIn</span>
                        <span className="contact-address">linkedin.com/in/simon-mckindley</span>
                    </a>
                </li>
                <li>
                    <a className="contact-info-item" href="https://github.com/simon-mckindley" target="_blank">
                        <span>GitHub</span>
                        <span className="contact-address">github.com/simon-mckindley</span>
                    </a>
                </li>
            </ul>
        </div>
    );
}