import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Analytics from './pages/Analytics';
import Goals from './pages/Goals';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import { getSetting, saveSetting } from './utils/db';


const App = () => {
  const [colorTheme, setColorTheme] = useState('#3f51b5'); // Standardfarbe

  useEffect(() => {
    const fetchColorTheme = async () => {
      const savedColorTheme = await getSetting('colorTheme');
      if (savedColorTheme) {
        setColorTheme(savedColorTheme.value);
      }
    };
    fetchColorTheme();
  }, []);

  const handleColorThemeChange = async (newColorTheme) => {
    setColorTheme(newColorTheme);
    await saveSetting('colorTheme', newColorTheme);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home colorTheme={colorTheme} />} />
        <Route path="/analytics" element={<Analytics colorTheme={colorTheme} />} />
        <Route path="/goals" element={<Goals colorTheme={colorTheme} />} />
        <Route path="/profile" element={<ProfilePage colorTheme={colorTheme} setColorTheme={handleColorThemeChange} />} />
      </Routes>
    </Router>
  );
};

export default App;