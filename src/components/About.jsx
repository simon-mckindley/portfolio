import { useState, useEffect } from "react";

export default function About(closed = true) {
    const [isClosed, setIsClosed] = useState(true);

    useEffect(() => {
        setIsClosed(closed);
    }, [closed]);

    const handleReadMore = () => {
        setIsClosed(prev => !prev);
    };

    return (
        <>
            <div className={`text-outer ${isClosed ? "" : "open"}`}>
                <h3 className="card-heading">About</h3>
                
                <div className="text">
                    <p>
                        I'm a Melbourne-based front-end developer working primarily
                        with TypeScript and React.js. I enjoy building intuitive, responsive web experiences
                        and bringing ideas to life through thoughtful design and code.
                    </p>
                    <br />
                    <p>
                        With a background in software engineering, digital design,
                        and team leadership, I bring a collaborative, practical approach
                        to solving problems and creating useful products.
                    </p>
                </div>

                <button
                    type="button"
                    className="more-button"
                    onClick={() => handleReadMore()}
                >
                    {isClosed ? "Read More" : "Read Less"}
                </button>
            </div>
        </>
    );
}