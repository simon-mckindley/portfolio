import { useState, useEffect } from 'react'

import './App.css'
import Header from './components/Header'
import ProjectList from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import ThemeButton from './components/ThemeButton'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(sessionStorage.getItem("portfolio-dark")) || false;
  });

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    sessionStorage.setItem("portfolio-dark", JSON.stringify(darkMode));
  }, [darkMode]);


  return (
    <>
      <ThemeButton onClick={() => setDarkMode(prev => !prev)} />
      <Header />
      <main>
        <Contact />
        <Skills />
        <ProjectList />
      </main>
    </>
  )
}

export default App
