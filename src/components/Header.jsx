import { useEffect, useState } from "react";
import Contact from './Contact'

export default function Header() {
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
                    <button>Projects</button>
                    <Contact />
                </div>
            </div>
        </header>
    )
}