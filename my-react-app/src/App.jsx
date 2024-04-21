import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Header from './components/Header'
import Footer from './components/Footer'
import Sidebar from './components/SideBar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import EditTaskPage from './pages/EditTaskPage'
import HeatmapPage from './pages/HeatmapPage'
import ShowTasksPage from './pages/showTasksPage';
import './App.css';

function App() {
  const {user} = useAuthContext()

  return (
    <Router>
      <Routes>
        <Route path="/about" element={user ? <AboutPage /> : <Navigate to="/login"/>} />
        <Route path="/edit-task" element={user ? <EditTaskPage /> : <Navigate to="/login"/>} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/"/>} />
        <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/"/>} />
        <Route path="/map" element={user ? <HeatmapPage /> : <Navigate to="/login"/>} />
        <Route path="/show-tasks" element={user ? <ShowTasksPage /> : <Navigate to="/login"/>} />
        <Route path="/" element={user ? <HomePage /> : <Navigate to="/login"/>} />
      </Routes>
    </Router>
  );
}

export default App;