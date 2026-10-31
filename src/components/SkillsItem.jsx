import { useState, useLayoutEffect, useRef } from "react";

export default function SkillsItem({ skillItem, onSkillClick }) {
    const scrollContRef = useRef(null);
    const [isOverflow, setIsOverflow] = useState(undefined);

    useLayoutEffect(() => {
        const { current } = scrollContRef;

        const trigger = () => {
            const hasOverflow = current.scrollWidth > current.clientWidth;
            setIsOverflow(hasOverflow);
        };

        if (current) {
            new ResizeObserver(trigger).observe(current);
            trigger();
        }
    }, [scrollContRef]);

    const handleScroll = (isLeft) => {
        const { current } = scrollContRef;
        if (!current) return;
        
        let scroll = 150;
        if (isLeft) scroll*=-1;

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
                                title="Add filter"
                                onClick={() => onSkillClick(skill)}
                            />

                            <label key={i} htmlFor={skill}>{skill}</label>
                        </>
                    ))}

                </div>

                {isOverflow && (
                    <>
                        <button 
                            type="button" 
                            className="left-button" 
                            title="Scroll left"
                            onClick={() => handleScroll(true)}
                        >
                            <img src="/circle-chevron-left-solid-full.svg" alt="<" width="24" />
                        </button>

                        <button 
                            type="button" 
                            className="right-button" 
                            title="Scroll right"
                            onClick={() => handleScroll(false)}
                        >
                            <img src="/circle-chevron-right-solid-full.svg" alt=">" width="24" />
                        </button>
                    </>
                )}

            </div>
        </li>
    );
    
}
