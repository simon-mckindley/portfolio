import { useState, useEffect, useRef } from 'react'

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

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(sessionStorage.getItem("portfolio-dark")) || false;
  });
  const [filters, setFilters] = useState([]);
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
    }
  }, [showAbout]);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    sessionStorage.setItem("portfolio-dark", JSON.stringify(darkMode));
  }, [darkMode]);

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

  // Function to clear all filters
  const handleClearFilters = () => {
    setFilters([]);
  }

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
              isFeature={true}
              project={ {title: "ClanCalendar", image: "/Screenshot.png", description: "Project description", technologies: ["React", "CSS"], link: "link", code: "link"}} 
            />
          </div>

          <div id="about">
            <TranslateCard
              content={<About />}
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
          filters={filters}
          onClearFilters={handleClearFilters}
        />
      </main>
    </>
  )
}

export default App
