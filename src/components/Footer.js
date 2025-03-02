import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, AppBar, Toolbar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import FlagIcon from '@mui/icons-material/Flag';

const FooterNav = ({ colorTheme }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    if (location.pathname === '/goals') {
      setValue(0);
    } else if (location.pathname === '/home') {
      setValue(1);
    } else if (location.pathname === '/analytics') {
      setValue(2);
    } else if (location.pathname === '/profile') {
      setValue(3); // Setze einen Wert für das Profil
    }
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      navigate('/goals');
    } else if (newValue === 1) {
      navigate('/home');
    } else if (newValue === 2) {
      navigate('/analytics');
    }
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

  const getInverseColor = (color) => {
    return color === '#000000' ? '#FFFFFF' : '#000000';
  };

  const inverseColor = getInverseColor(textColor);

  
  return (
    <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, backgroundColor: colorTheme }}>
      <Toolbar>
        <BottomNavigation value={value} onChange={handleChange} sx={{ width: '100%', backgroundColor: colorTheme }}>
          <BottomNavigationAction label="Goals" icon={<FlagIcon />} 
          sx={{backgroundColor: value === 0 ? textColor : colorTheme, 
                color: value === 0 ? inverseColor : textColor, 
                '&.Mui-selected': {color: inverseColor,},
                borderRadius: 6, 
                height: '40px', 
                top: 7}} />
          <BottomNavigationAction label="Home" icon={<HomeIcon />} 
          sx={{backgroundColor: value === 1 ? textColor : colorTheme, 
                color: value === 1 ? inverseColor : textColor, 
                '&.Mui-selected': {color: inverseColor,},
                borderRadius: 6, 
                height: '40px', 
                top: 7}}/>
          <BottomNavigationAction label="Analytics" icon={<BarChartIcon />} 
          sx={{backgroundColor: value === 2 ? textColor : colorTheme, 
                color: value === 2 ? inverseColor : textColor, 
                '&.Mui-selected': {color: inverseColor,},
                borderRadius: 6, 
                height: '40px', 
                top: 7 }} />
        </BottomNavigation>
      </Toolbar>
    </AppBar>
  );
};

export default FooterNav;