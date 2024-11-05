import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Profile from './pages/Profile';
import Home from './pages/Home';
import LoginForm from './pages/Login';
import SignupForm from './pages/Signup';
import Messages from './pages/Messages';
import ChatMessages from './pages/ChatMessages';
import Settings from './pages/Settings';
import EditProfile from './pages/EditProfile';
import Search from './pages/Search';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Redirect from root ("/") to "/home" */}
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/chats" element={<Messages />} />
      
        </Routes>
      </div>
    </Router>
  );
}

export default App;
