import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Root from './view/Root';
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
      </Routes>
    </Router>
  );
}
