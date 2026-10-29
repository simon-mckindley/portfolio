import { useEffect, useRef, useState } from "react";

export default function About({ showAbout = false, buttonX, buttonY }) {
    const containerRef = useRef(null);
    const [translateX, setTranslateX] = useState(0);
    const [translateY, setTranslateY] = useState(0);

    useEffect(() => {
        const getContainerPosition = () => {
            const rect = containerRef?.current.getBoundingClientRect();
            return rect ? { x: rect.x, y: rect.y } : null;
        }
console.log(showAbout)
        if (!showAbout) {
            setTranslateX(0);
            setTranslateY(0);
            return;
        }

        const position = getContainerPosition();
        console.log(position)
        if (!position) return;

        setTranslateX(buttonX - position.x);
        setTranslateY(buttonY - position.y);
    }, [showAbout, buttonX, buttonY, containerRef]);

    return (            
        <div 
            ref={containerRef}
            className={`bento-card about-card ${showAbout ? "show" : ""}`}
            style={{ "--_translateX": `${translateX}px`, "--_translateY": `${translateY}px` }}
        >
            <h3 className="card-heading">About</h3>
            <div>
                <p>Stuff about me here</p>
                <p>Stuff about me here</p>
            </div>
        </div>
    );
}