import { useState, useEffect, useRef } from 'react'

import './App.css'
import Header from './components/Header'
import Contact from './components/Contact'
import About from './components/About'
import Headline from './components/Headline'
import ProjectList from './components/Projects'
import ProjectCard from "./components/ProjectCard";
import Skills from './components/Skills'
import ThemeButton from './components/ThemeButton'

function App() {
  const [filters, setFilters] = useState([]); // State to track selected filters
  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(sessionStorage.getItem("portfolio-dark")) || false;
  });

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    sessionStorage.setItem("portfolio-dark", JSON.stringify(darkMode));
  }, [darkMode]);

  // Function to add a filter
  const handleSkillClick = (skill) => {
    setFilters((prevFilters) => {
      if (prevFilters.includes(skill)) return prevFilters; // Avoid duplicates
      return [...prevFilters, skill]; // Add new filter
    });
  };

  // Function to remove a filter
  const handleFilterClick = (skill) => {
    setFilters((prevFilters) => prevFilters.filter((filter) => filter !== skill));
  };

  // Function to clear all filters
  const handleClearFilters = () => {
    setFilters([]);
  }

  const [showContact, setShowContact] = useState(false);
  const contactRef = useRef(null);
  const [showAbout, setShowAbout] = useState(false);
  const aboutRef = useRef(null);
  const [buttonCoords, setButtonCoords] = useState({ x: 0, y: 0 })

  const handleContactClick = () => {
    setShowContact(prev => !prev);
    setShowAbout(false);
  }

  useEffect(() => {
    if (showContact) {
      const rect = contactRef?.current.getBoundingClientRect();
      setButtonCoords({ x: rect.x, y: rect.bottom });
      // console.log({ x: rect.x, y: rect.y, width: rect.width, height: rect.height });
    }
  }, [showContact]);

  const handleAboutClick = () => {
    setShowAbout(prev => !prev);
    setShowContact(false);
  }

  useEffect(() => {
    if (showAbout) {
      const rect = aboutRef?.current.getBoundingClientRect();
      setButtonCoords({ x: rect.x, y: rect.bottom });
      console.log({ x: rect.x, y: rect.y, width: rect.width, height: rect.height });
    }
  }, [showAbout]);

  return (
    <>
      <ThemeButton onClick={() => setDarkMode(prev => !prev)} />
      <Header 
        onContactClick={handleContactClick}
        showContact={showContact}
        contactRef={contactRef}
        onAboutClick={handleAboutClick}
        showAbout={showAbout}
        aboutRef={aboutRef}
      />
      <main>
        <Headline />
        
        <section className="main-grid">

          <div id="feature">
            <ProjectCard 
              heading={"Featured project"} 
              project={ {title: "Feature prohject", description: "Project description", technologies: ["React", "CSS"], link: "link", code: "link"}} 
            />
          </div>

          <div id="about">
            <About
              showAbout={showAbout}
              buttonX={buttonCoords.x}
              buttonY={buttonCoords.y}
            />
          </div>

          <div id="contact">
            <Contact 
              showContact={showContact}
              buttonX={buttonCoords.x}
              buttonY={buttonCoords.y} 
            />
          </div>

          <div id="skills">
            <Skills onSkillClick={handleSkillClick} />
          </div>
          
        </section>

        <ProjectList
          filters={filters}
          onFilterClick={handleFilterClick}
          onClearFilters={handleClearFilters}
        />
      </main>
    </>
  )
}

export default App
