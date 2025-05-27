// App.jsx
import { useState, useEffect } from 'react'
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
import ProtectedRoute from './ProtectedRoute'
import Store from './Components/Store'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { UserProvider, useUserContext } from './UserContext'

// Create a component to handle conditional navbar rendering
function AppContent() {
  const { isAuthenticated, isLoading } = useUserContext();

  if (isLoading) {
    return (
      <div className="app-loading">
        <div className="loading-container">
          <h2>Loading ChoreChampions...</h2>
          <div className="loading-spinner">Please wait...</div>
        </div>
      </div>
    );
  }

  return (
    <div className='App'>
      {/* Only show navbar when authenticated */}
      {isAuthenticated && (
        <div className="Navbar">
          <NavBar />
        </div>
      )}

      <div className='MainContent'>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/chorelist" element={
            <ProtectedRoute>
              <ChoreList />
            </ProtectedRoute>
          } />
          
          <Route path="/challenge" element={
            <ProtectedRoute>
              <Challenge />
            </ProtectedRoute>
          } />
          
          <Route path="/battle" element={
            <ProtectedRoute>
              <Battle />
            </ProtectedRoute>
          } />
          
          <Route path="/store" element={
            <ProtectedRoute>
              <Store />
            </ProtectedRoute>
          } />

        

          {/* Default redirect */}
          <Route path="*" element={
            isAuthenticated ? <Navigate to="/" replace /> : <Navigate to="/login" replace />
          } />
        </Routes>
      </div>

      {/* Only show footer when authenticated */}
      {isAuthenticated && (
        <div className='Footer'>
          <Footer />
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
  )
}

export default App