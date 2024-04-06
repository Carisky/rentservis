import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter and other necessary components
import './index.css';
import reportWebVitals from './reportWebVitals';
import Clients from './pages/clients/Clients';
import LandLords from './pages/landlords/LandLords';
import Apartments from './pages/apartments/Apartments';
import Rents from './pages/rents/Rents';

const root = createRoot(document.getElementById('root'));

root.render(
  <Router>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<Clients />} />
        <Route path="/landlords" element={<LandLords />} />
        <Route path="/apartments" element={<Apartments />} />
        <Route path="/rents" element={<Rents />} />
      </Routes>
    </React.StrictMode>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
