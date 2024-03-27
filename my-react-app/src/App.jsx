import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import EditTaskPage from './pages/EditTaskPage'
import './App.css';

function App() {
  const {user} = useAuthContext()

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={user ? <HomePage /> : <Navigate to="/login"/>} />
        <Route path="/about" element={user ? <AboutPage /> : <Navigate to="/login"/>} />
        <Route path="/edit-task" element={user ? <EditTaskPage /> : <Navigate to="/login"/>} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/"/>} />
        <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/"/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;