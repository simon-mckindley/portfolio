// import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import ProjectList from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'

function App() {


  return (
    <>
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
