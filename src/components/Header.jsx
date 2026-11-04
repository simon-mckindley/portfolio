import { useEffect, useState } from "react";

export default function Header({ onHeaderClick, showContact, showAbout, contactRef, aboutRef }) {
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
                        id="about-button"
                        type="button"
                        className={`contact-button ${showAbout ? "show" : ""}`}
                        onClick={onHeaderClick}
                    >
                        About
                    </button>

                    <button
                        ref={contactRef}
                        id="contact-button"
                        type="button"
                        className={`contact-button ${showContact ? "show" : ""}`}
                        onClick={onHeaderClick}
                    >
                        Contact
                    </button>
                </div>
            </div>
        </header>
    )
}