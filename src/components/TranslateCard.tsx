import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

interface TranslateCardProps {
    content: ReactNode;
    contentClass: string;
    show: boolean;
    buttonX: number;
    buttonY: number;
}

export default function TranslateCard({ content, contentClass, show, buttonX, buttonY }: TranslateCardProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [translateX, setTranslateX] = useState(0);
    const [translateY, setTranslateY] = useState(0);

    useEffect(() => {
        const getContainerPosition = () => {
            const rect = containerRef?.current?.getBoundingClientRect();
            return rect ? { x: rect.x, y: rect.y } : null;
        }

        if (!show) {
            setTranslateX(0);
            setTranslateY(0);
            return;
        }

        const position = getContainerPosition();
        if (!position) return;

        setTranslateX(buttonX - position.x);
        setTranslateY(buttonY - position.y);
    }, [show, buttonX, buttonY, containerRef]);

    return (
        <div
            ref={containerRef}
            className={`bento-card translate-card ${contentClass} ${show ? "show" : ""}`}
            style={{ "--_translateX": `${translateX}px`, "--_translateY": `${translateY}px` } as CSSProperties}
        >
            {content}
        </div>
    );
}