// App.jsx
import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './Components/NavBar/NavBar'
import Footer from './Components/Footer/Footer'
import HomePage from './Views/HomePage'
import ChoreList from './Views/ChoreList'
import Dashboard from './Views/Dashboard'
import Challenge from './Views/Challenge'
import Battle from './Views/Battle'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import { UserProvider } from './UserContext'

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className='App'>
          <div className="Navbar">
            <NavBar />
          </div>

          <div className='MainContent'>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/ChoreList" element={<ChoreList />} />
              <Route path="/Challenge" element={<Challenge/>} />
              <Route path="/Battle" element={<Battle/> }/>
            </Routes>
          </div>

          <div className='Footer'>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App