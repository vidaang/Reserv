import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import CardPage from './pages/CardPage';
import SignUpPage from './pages/SignUpPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/CreateAccount" element={<SignUpPage />} />
        <Route path="/cards" element={<CardPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
