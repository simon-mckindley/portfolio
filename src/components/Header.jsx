import { useEffect, useState } from "react";

export default function Header({ onContactClick, showContact, onAboutClick, showAbout, contactRef, aboutRef }) {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollPosition(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`${scrollPosition > 50 ? "sticky" : ""}`}>
            <div className="header-inner">
                <h1>Simon McKindley</h1>

                <div className="header-links">
                    <button
                        ref={aboutRef} 
                        type="button"
                        className={`contact-button ${showAbout ? "show" : ""}`}
                        onClick={onAboutClick}
                    >
                        About
                    </button>

                    <button
                        ref={contactRef}
                        type="button"
                        className={`contact-button ${showContact ? "show" : ""}`}
                        onClick={onContactClick}
                    >
                        Contact
                    </button>
                </div>
            </div>
        </header>
    )
}