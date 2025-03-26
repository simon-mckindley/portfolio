import { useState, useEffect } from 'react'

import './App.css'
import Header from './components/Header'
import ProjectList from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
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


  return (
    <>
      <ThemeButton onClick={() => setDarkMode(prev => !prev)} />
      <Header />
      <main>
        <Contact />
        <Skills onSkillClick={handleSkillClick} />
        <ProjectList filters={filters} onFilterClick={handleFilterClick} />
      </main>
    </>
  )
}

export default App
