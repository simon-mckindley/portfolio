import { useEffect, useState, type RefObject } from "react";

interface HeaderProps {
    onHeaderClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    showContact: boolean;
    showAbout: boolean;
    contactRef: RefObject<HTMLButtonElement | null>;
    aboutRef: RefObject<HTMLButtonElement | null>;
}

export default function Header({ onHeaderClick, showContact, showAbout, contactRef, aboutRef }: HeaderProps) {
    const [scrollPosition, setScrollPosition] = useState<number>(0);

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
                        className={`${showAbout ? "show" : ""}`}
                        onClick={onHeaderClick}
                    >
                        About
                    </button>

                    <button
                        ref={contactRef}
                        id="contact-button"
                        type="button"
                        className={`${showContact ? "show" : ""}`}
                        onClick={onHeaderClick}
                    >
                        Contact
                    </button>
                </div>
            </div>
        </header>
    )
}