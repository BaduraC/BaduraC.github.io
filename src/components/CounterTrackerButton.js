// src/components/DataButton.js
import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { updateCounterTracker, deleteCounterTracker } from '../utils/db';

const CounterTrackerButton = ({ id, name, color, initialCount, onDelete }) => {
  const [count, setCount] = useState(initialCount);

  const handleIncrement = async () => {
    const newCount = count + 1;
    setCount(newCount);
    await updateCounterTracker({ id, name, color, count: newCount, type: 'counter' });
  };

  const handleDecrement = async () => {
    const newCount = count - 1;
    setCount(newCount);
    await updateCounterTracker({ id, name, color, count: newCount, type: 'counter' });
  };

  const handleDelete = async () => {
    if(window.confirm('Möchten SIe diesen Tracker wirklich löschen?')){
      try {
        await deleteCounterTracker(id);
      onDelete(id);
      } catch (error) {
        console.error('Fehler beim Löschen des Trackers:', error);
      }
    }
  };

  const getContrastColor = (hexColor) => {
    hexColor = hexColor.replace('#', '');
    const r = parseInt(hexColor.substring(0, 2), 16);
    const g = parseInt(hexColor.substring(2, 4), 16);
    const b = parseInt(hexColor.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#FFFFFF';
  };
  
  const getFontSize = (name) => {
    const length = name.length;
    if (length > 20) {
      return '0.3rem'; 
    } else if (length > 15) {
      return '0.6rem'; 
    } else if (length > 10) {
      return '0.8rem'; 
    } else if (length > 8) {
      return '0.9rem'; 
    } else if (length > 6) {
      return '1.3rem'; 
    } else if (length > 4) {
      return '1.5rem'; 
    } else {
      return '1.7rem'; 
    }
  };

  const getTopPosition = (fontSize) => {
    switch (fontSize) {
      case '0.3rem':
        return 16;
      case '0.6rem':
        return 14;
      case '0.8rem':
        return 12;
      case '0.9rem':
        return 10;
      case '1.3rem':
        return 8;
      case '1.5rem':
        return 6;
      case '1.7rem':
        return 4;
      default:
        return 10;
    }
  };

  const textColor = getContrastColor(color);
  const truncatedName = name.length > 20 ? name.substring(0, 20) + '...' : name;
  const fontSize = getFontSize(truncatedName);
  const topPosition = getTopPosition(fontSize);

  return (
    <Card sx={{ backgroundColor: color, marginBottom: 2, width: 100, height: 100, position: 'relative', borderRadius: 4, boxShadow: '0px 0px 4px 0px #000' }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 0, height: '100%', justifyContent: 'center' }}>
        <Typography variant="subtitle2" component="h2" sx={{ fontSize: fontSize, position: 'absolute', top: topPosition, color: textColor }}>
          {name}
        </Typography>
        <Typography variant="body2" component="p" sx={{ fontSize: '1.8rem', position: 'absolute', top: 30, color: textColor }}>
          {count}
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center" width="100%" gap={1} sx={{ position: 'absolute', bottom: 8 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 28, height: 28, backgroundColor: '#F9DEDC', borderRadius: 2,  boxShadow: '0px 0px 2px 0px #000' }}>
            <IconButton onClick={handleDecrement} color="primary" size="small" sx={{ padding: 0, margin: 0, color: color }}>
              <RemoveIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 28, height: 28, backgroundColor:'#DDE692', borderRadius: 2,  boxShadow: '0px 0px 2px 0px #000' }}>
            <IconButton onClick={handleIncrement} color="primary" size="small" sx={{ padding: 0, margin: 0, color: color }}>
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CounterTrackerButton;