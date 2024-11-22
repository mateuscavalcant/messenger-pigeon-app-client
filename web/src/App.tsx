import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Redireciona de "/" para "/chats" */}
          <Route path="/" element={<Navigate to="/chats" />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
