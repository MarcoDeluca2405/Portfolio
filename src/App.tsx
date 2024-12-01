import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './Components/NavBar/NavBar'
import HeroSection from './Components/HeroSection/HeroSection'
import styled from 'styled-components'


const DivCenter = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`

function App() {
 

  return (
    <>
      <NavBar />
      <DivCenter>

      <HeroSection />
      </DivCenter>
    </>
  )
}

export default App
