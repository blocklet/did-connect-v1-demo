import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@arcblock/ux/lib/Theme';

import { SessionProvider } from './contexts/session';

import './app.css';
import Home from './pages/home';
import About from './pages/about';

// While the blocklet is deploy to a sub path, this will be work properly.
const apiPrefix = window?.blocklet?.prefix || '/';

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/home" element={<Home />} />
          <Route element={<Navigate to="/" />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default () => {
  return (
    <SessionProvider serviceHost={apiPrefix}>
      <Router basename={apiPrefix}>
        <App />
      </Router>
    </SessionProvider>
  );
};
