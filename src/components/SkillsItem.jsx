import { useState, useEffect, useLayoutEffect, useRef } from "react";
import LeftIcon from '../assets/circle-chevron-left-solid-full.svg';

export default function SkillsItem({ skillItem, onSkillClick, filters }) {
    const scrollContRef = useRef(null);
    const [isOverflow, setIsOverflow] = useState(undefined);
    const [isAtEnd, setIsAtEnd] = useState(false);
    const [isAtStart, setIsAtStart] = useState(true);

    useLayoutEffect(() => {
        const { current } = scrollContRef;
        if (!current) return;

        const trigger = () => {
            const hasOverflow = current.scrollWidth > current.clientWidth;
            setIsOverflow(hasOverflow);
        };

        new ResizeObserver(trigger).observe(current);
        trigger();
    }, [scrollContRef]);

    useEffect(() => {
        const { current } = scrollContRef;
        if (!current) return;

        const handleScrollEnd = () => {
            const { scrollLeft, scrollWidth, clientWidth } = current;
            const isEnd = Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 1;
            setIsAtEnd(isEnd);
            setIsAtStart(scrollLeft <= 1);
        };

        current.addEventListener('scrollend', handleScrollEnd);
        return () => current.removeEventListener('scrollend', handleScrollEnd);
    }, []);

    const handleScrollClick = (isLeft) => {
        const { current } = scrollContRef;
        if (!current) return;

        let scroll = 150;
        if (isLeft) scroll *= -1;

        current.scrollBy({ left: scroll, behavior: 'smooth' });
    }
    
    return (
        <li className="skill-item">
            <div className="title">{skillItem.title}</div>
            <div className="item-list">
                <div ref={scrollContRef} className={`scroll-container ${isOverflow ? "overflow" : ""}`}>
                    {skillItem.skills.map((skill, i) => (
                        <>
                            <input
                                key={i + 100}
                                type="checkbox"
                                id={skill}
                                name="skill-check"
                                value={skill}
                                checked={filters.includes(skill)}
                                onClick={() => onSkillClick(skill)}
                                onChange={() => {}}
                            />

                            <label 
                                key={i} 
                                htmlFor={skill}
                                title="Click to filter projects"
                            >
                                {skill}
                            </label>
                        </>
                    ))}

                </div>

                {isOverflow && (
                    <>
                        <button 
                            type="button" 
                            className={`left-button ${isAtStart ? "hide" : ""}`} 
                            title="Scroll left"
                            onClick={() => handleScrollClick(true)}
                        >
                            <img src={LeftIcon} alt="<" width="24" />
                        </button>

                        <button 
                            type="button" 
                            className={`right-button ${isAtEnd ? "hide" : ""}`}  
                            title="Scroll right"
                            onClick={() => handleScrollClick(false)}
                        >
                            <img src={LeftIcon} alt=">" width="24" />
                        </button>
                    </>
                )}

            </div>
        </li>
    );
    
}
