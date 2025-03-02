import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = ({ colorTheme }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Navigiert zur vorherigen Seite
  };

  const handleProfileClick = () => {
    navigate('/profile'); // Navigiert zur Profilseite
  };

  const getContrastColor = (hexColor) => {
    // Entferne das '#' Zeichen, falls vorhanden
    hexColor = hexColor.replace('#', '');
  
    // Konvertiere die Hex-Farbe in RGB
    const r = parseInt(hexColor.substring(0, 2), 16);
    const g = parseInt(hexColor.substring(2, 4), 16);
    const b = parseInt(hexColor.substring(4, 6), 16);
  
    // Berechne die Helligkeit der Farbe
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
    // Wenn die Helligkeit größer als 128 ist, verwende Schwarz, sonst Weiß
    return brightness > 128 ? '#000000' : '#FFFFFF';
  };

  const textColor = getContrastColor(colorTheme);

  return (
    <AppBar position="fixed" sx={{height: '58px', backgroundColor: colorTheme}}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="back" onClick={handleBackClick} sx={{ color: textColor }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1, color: textColor }}>
          Data-Tracking-App
        </Typography>
        <Button sx={{ color: textColor }} color="inherit" onClick={handleProfileClick}>
          <AccountCircleIcon />
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;