import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomeMessages from "./pages/HomeMessages";
import ChatMessages from "./pages/ChatMessage";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Redireciona de "/" para "/chats" */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/chats" element={<HomeMessages />} />
          <Route path="/:username" element={<ChatMessages />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
