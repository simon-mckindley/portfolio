import { useState, useEffect, useRef, useLayoutEffect } from 'react'

import './App.css'
import Header from './components/Header'
import TranslateCard from './components/TranslateCard'
import Contact from './components/Contact'
import About from './components/About'
import Headline from './components/Headline'
import ProjectList from './components/Projects'
import ProjectCard from "./components/ProjectCard"
import Skills from './components/Skills'
import ThemeButton from './components/ThemeButton'
import apiRequest from './api/apiRequest'
import { Project } from './types/dataTypes'

type Coords = {
    x: number;
    y: number;
}

const THEME_KEY = "portfolio-theme";

function App() {
    const [theme, setTheme] = useState<"light" | "dark" | null>(() => {
        const dataTheme = document.body.getAttribute('data-theme');
        return dataTheme === "light" ? "light" : dataTheme === "dark" ? "dark" : null;
    });
    const [projects, setProjects] = useState<Project[]>([]);
    const [projectsError, setProjectsError] = useState<boolean>(false);
    const [featuredProject, setFeaturedProject] = useState<Project | null>(null);
    const [projectSkills, setProjectSkills] = useState<string[]>([]);
    const [filters, setFilters] = useState<string[]>([]);
    const [showContact, setShowContact] = useState<boolean>(false);
    const contactRef = useRef<HTMLButtonElement | null>(null);
    const [contactMoving, setContactMoving] = useState<boolean>(false);
    const [showAbout, setShowAbout] = useState<boolean>(false);
    const aboutRef = useRef<HTMLButtonElement | null>(null);
    const [aboutMoving, setAboutMoving] = useState<boolean>(false);
    const [buttonCoords, setButtonCoords] = useState<Coords>({ x: 0, y: 0 });

    useEffect(() => {
        apiRequest({ projects: true })
            .then((data) => {
                const filteredProjects = (data as Project[]).filter(project => !project.hide);
                setProjects(filteredProjects);
                setProjectSkills([...new Set(filteredProjects.flatMap(project => project.technologies || []))]);
            })
            .catch((error) => {
                console.error("Error fetching projects:", error.message);
                setProjectsError(true);
            });
    }, []);

    useEffect(() => {
        if (projects && projects.length > 0) {
            const featuredList = projects.filter(project => project.isFeatured);
            const randomIndex = Math.floor(Math.random() * featuredList.length);

            setFeaturedProject(featuredList[randomIndex] || null);
        }
    }, [projects]);

    useEffect(() => {
        if (theme === null) return;

        document.body.setAttribute("data-theme", theme);
        localStorage.setItem(THEME_KEY, theme);
    }, [theme]);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = (e: MediaQueryListEvent) => setTheme(e.matches ? "dark" : "light");

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const handleHeaderClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setButtonCoords({ x: rect.left, y: rect.bottom });

        const buttonId = event.currentTarget.id;

        if (buttonId === "contact-button") {
            setShowContact(prev => !prev);
            setShowAbout(false);
        } else if (buttonId === "about-button") {
            setShowAbout(prev => !prev);
            setShowContact(false);
        }
    };

    useLayoutEffect(() => {
        setContactMoving(true);
        const timeOut = setTimeout(() => {
            setContactMoving(false);
        }, 300);

        if (!showContact || !contactRef.current) return (() => { clearTimeout(timeOut) });

        const rect = contactRef.current.getBoundingClientRect();
        setButtonCoords({ x: rect.left, y: rect.bottom });
        setContactMoving(true);
        return (() => { clearTimeout(timeOut) });
    }, [showContact]);

    useLayoutEffect(() => {
        setAboutMoving(true);
        const timeOut = setTimeout(() => {
            setAboutMoving(false);
        }, 300);

        if (!showAbout || !aboutRef.current) return (() => { clearTimeout(timeOut) });

        const rect = aboutRef.current.getBoundingClientRect();
        setButtonCoords({ x: rect.left, y: rect.bottom });
        return (() => { clearTimeout(timeOut) });
    }, [showAbout]);

    useEffect(() => {
        const handleScroll = () => {
            setShowAbout(false);
            setShowContact(false);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSkillClick = (skill: string) => {
        setFilters((prevFilters) => {
            if (prevFilters.includes(skill)) {
                return prevFilters.filter((filter) => filter !== skill);
            } else {
                return [...prevFilters, skill];
            }
        });
    };

    const handleClearFilters = () => {
        setFilters([]);
    }

    return (
        <>
            <ThemeButton onClick={() => setTheme(theme === "dark" ? "light" : "dark")} />
            <Header
                onHeaderClick={handleHeaderClick}
                showContact={showContact}
                contactRef={contactRef}
                showAbout={showAbout}
                aboutRef={aboutRef}
            />
            <main>
                <Headline />

                <section className="main-grid">

                    <div id="feature">
                        <ProjectCard
                            heading={"Featured project"}
                            isFeature={true}
                            error={projectsError}
                            project={featuredProject}
                            show={true}
                        />
                    </div>

                    <div id="about">
                        <TranslateCard
                            content={
                                <About moving={aboutMoving} />
                            }
                            contentClass={'about-card'}
                            show={showAbout}
                            buttonX={buttonCoords.x}
                            buttonY={buttonCoords.y}
                        />
                    </div>

                    <div id="contact">
                        <TranslateCard
                            content={
                                <Contact moving={contactMoving} />
                            }
                            contentClass={'contact-card'}
                            show={showContact}
                            buttonX={buttonCoords.x}
                            buttonY={buttonCoords.y}
                        />
                    </div>

                    <div id="skills">
                        <Skills
                            onSkillClick={handleSkillClick}
                            filters={filters}
                            projectSkills={projectSkills}
                        />
                    </div>

                </section>

                <ProjectList
                    projects={projects}
                    error={projectsError}
                    filters={filters}
                    onClearFilters={handleClearFilters}
                />
            </main>
        </>
    )
}

export default App
