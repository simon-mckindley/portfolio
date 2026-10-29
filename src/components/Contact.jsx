import { useEffect, useRef, useState } from "react";

export default function Contact({ showContact = false, buttonX, buttonY }) {
    const containerRef = useRef(null);
    const [translateX, setTranslateX] = useState(0);
    const [translateY, setTranslateY] = useState(0);

    useEffect(() => {
        const getContainerPosition = () => {
            const rect = containerRef?.current.getBoundingClientRect();
            return rect ? { x: rect.x, y: rect.y } : null;
        }

        if (!showContact) {
            setTranslateX(0);
            setTranslateY(0);
            return;
        }

        const position = getContainerPosition();
        if (!position) return;

        setTranslateX(buttonX - position.x);
        setTranslateY(buttonY - position.y);
    }, [showContact, buttonX, buttonY, containerRef]);

    return (          
        <ul 
            ref={containerRef}
            className={`bento-card translate-card contact-card ${showContact ? "show" : ""}`}
            style={{ "--_translateX": `${translateX}px`, "--_translateY": `${translateY}px` }}
        >
            <h3 className="card-heading">Contact me</h3>
            <li>
                <a className="contact-item" href="mailto:simonmckindley@gmail.com">
                    <span className="label">Email</span>
                    <span className="contact-address">simonmckindley@gmail.com</span>
                </a>
            </li>
            <li>
                <a className="contact-item" href="https://www.linkedin.com/in/simon-mckindley/" target="_blank">
                    <span className="label">LinkedIn</span>
                    <span className="contact-address">linkedin.com/in/simon-mckindley</span>
                </a>
            </li>
            <li>
                <a className="contact-item" href="https://github.com/simon-mckindley" target="_blank">
                    <span className="label">GitHub</span>
                    <span className="contact-address">github.com/simon-mckindley</span>
                </a>
            </li>
        </ul>
    );
}