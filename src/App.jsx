import { useState, useEffect } from 'react'

import './App.css'
import Header from './components/Header'
import Contact from './components/Contact'
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
  const [showAbout, setShowAbout] = useState(false);

  const handleContactClick = () => {
    setShowContact(prev => !prev);
    setShowAbout(false);
  }

  const handleAboutClick = () => {
    setShowAbout(prev => !prev);
    setShowContact(false);
  }

  return (
    <>
      <ThemeButton onClick={() => setDarkMode(prev => !prev)} />
      <Header 
        onContactClick={handleContactClick}
        showContact={showContact}
        onAboutClick={handleAboutClick}
        showAbout={showAbout}
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
            <div className="bento-card about-card">
              <h3 className="card-heading">About</h3>
              <p>Stuff about me here</p>
            </div>
          </div>

          <div id="skills">
            <Skills onSkillClick={handleSkillClick} />
          </div>

          <div id="contact">
            <Contact 
            
            />
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
