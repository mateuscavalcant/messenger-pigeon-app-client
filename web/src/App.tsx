import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Redireciona de "/" para "/chats" */}
          <Route path="/" element={<Navigate to="/chats" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
