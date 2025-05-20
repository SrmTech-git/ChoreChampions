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
import Login from './Views/Login'
import Register from './Views/Register'
import StoreView from './Views/StoreView'
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
              <Route path="/Login" element={<Login/> }/>
              <Route path="/Register" element={<Register/> }/>
              <Route path= "/Store" element={<StoreView/> }/>
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