import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Messages from './pages/Messages';



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
