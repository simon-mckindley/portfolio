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

function App() {
    const [darkMode, setDarkMode] = useState(() => {
        return JSON.parse(sessionStorage.getItem("portfolio-dark")) || false;
    });
    const [projects, setProjects] = useState([]);
    const [projectsError, setProjectsError] = useState(false);
    const [featuredProject, setFeaturedProject] = useState(null);
    const [filters, setFilters] = useState([]);
    const [showContact, setShowContact] = useState(false);
    const contactRef = useRef(null);
    const [showAbout, setShowAbout] = useState(false);
    const aboutRef = useRef(null);
    const [buttonCoords, setButtonCoords] = useState({ x: 0, y: 0 })

    useEffect(() => {
        apiRequest({ projects: true })
            .then((data) => {
                setProjects(data);
            })
            .catch((error) => {
                console.error("Error fetching projects:", error.message);
                setProjectsError(true);
            });
    }, []);

    useEffect(() => {
        if (projects && projects.length > 0) {
            const featured = projects.find(project => project.isFeatured);
            setFeaturedProject(featured || null);
        }
    }, [projects]);

    useEffect(() => {
        document.body.classList.toggle("dark", darkMode);
        sessionStorage.setItem("portfolio-dark", JSON.stringify(darkMode));
    }, [darkMode]);

    const handleHeaderClick = (event) => {
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
        if (!showContact || !contactRef.current) return;

        const rect = contactRef.current.getBoundingClientRect();
        setButtonCoords({ x: rect.left, y: rect.bottom });
    }, [showContact]);

    useLayoutEffect(() => {
        if (!showAbout || !aboutRef.current) return;

        const rect = aboutRef.current.getBoundingClientRect();
        setButtonCoords({ x: rect.left, y: rect.bottom });
    }, [showAbout]);

    useEffect(() => {
        const handleScroll = () => {
            setShowAbout(false);
            setShowContact(false);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Function to toggle a filter
    const handleSkillClick = (skill) => {
        setFilters((prevFilters) => {
            if (prevFilters.includes(skill)) {
                return prevFilters.filter((filter) => filter !== skill); // Remove filter
            } else {
                return [...prevFilters, skill]; // Add new filter
            }
        });
    };

    const handleClearFilters = () => {
        setFilters([]);
    }

    return (
        <>
            <ThemeButton onClick={() => setDarkMode(prev => !prev)} />
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
                            project={featuredProject}
                        />
                    </div>

                    <div id="about">
                        <TranslateCard
                            content={<About closed />}
                            contentClass={'about-card'}
                            show={showAbout}
                            buttonX={buttonCoords.x}
                            buttonY={buttonCoords.y}
                        />
                    </div>

                    <div id="contact">
                        <TranslateCard
                            content={<Contact />}
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
