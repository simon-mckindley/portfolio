import { useEffect, useState } from "react";

export default function Contact() {
    const [showInfo, setShowInfo] = useState(false);
    const [infoLeave, setInfoLeave] = useState(false);

    useEffect(() => {
        setInfoLeave(!showInfo);
        setTimeout(() => setInfoLeave(false), 500);
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

            {/* <p>Hi, I'm Simon McKindley, a Full Stack Developer with experience in a wide variety of front-end and back-end technologies.</p>
            <p>My goal is to create elegant code to build innovative solutions that solve realworld problems.</p> */}

        </div>
    );
}