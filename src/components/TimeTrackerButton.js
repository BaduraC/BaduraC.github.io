import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Box, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import PauseIcon from '@mui/icons-material/Pause';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import DeleteIcon from '@mui/icons-material/Delete';
import { updateTimeTracker, deleteTimeTracker, getTimeTrackers } from '../utils/db';

const TimeTrackerButton = ({ id, name, color, initialAccumulatedTime, onDelete }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [accumulatedTime, setAccumulatedTime] = useState(initialAccumulatedTime || 0);
  
    useEffect(() => {
      let interval;
      if (isRunning) {
        interval = setInterval(() => {
          setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
        }, 1000);
      } else if (!isRunning && elapsedTime !== 0) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }, [isRunning, elapsedTime]);


  useEffect(() => {
    const loadAccumulatedTime = async () => {
      const trackers = await getTimeTrackers();
      const tracker = trackers.find(t => t.id === id);
      if (tracker) {
        setAccumulatedTime(tracker.accumulatedTime || 0);
      }
    };
    loadAccumulatedTime();
  }, [id]);

  const handleStartPause = async () => {
    setIsRunning(!isRunning);
  };

  const handleStop = async () => {
    setIsRunning(false);
    setAccumulatedTime(accumulatedTime + elapsedTime);
    setElapsedTime(0);
    await updateTimeTracker({ id, name, color, accumulatedTime: accumulatedTime + elapsedTime });
  };

  const handleReset = async () => {
    setIsRunning(false);
    setElapsedTime(0);
    setAccumulatedTime(0);
    await updateTimeTracker({ id, name, color, accumulatedTime: 0 });
  };

  const handleDelete = async () => {
    if (window.confirm('Möchten Sie diesen Tracker wirklich löschen?')) {
      try {
        await deleteTimeTracker(id);
        onDelete(id);
      } catch (error) {
        console.error('Fehler beim Löschen des Trackers:', error);
      }
    }
  };

  const handleSkipBack = () => {
    setElapsedTime((prevElapsedTime) => Math.max(prevElapsedTime - 10, 0));
  };

  const handleSkipForward = () => {
    setElapsedTime((prevElapsedTime) => prevElapsedTime + 10);
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
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
        <Typography variant="body2" component="p" sx={{ fontSize: '1.3rem', position: 'absolute', top: 40, color: textColor }}>
          {formatTime(elapsedTime)}
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center" width="100%" gap={0.5} sx={{ position: 'absolute', bottom: 15 }}>
          <IconButton onClick={handleSkipBack} color="primary" size="small" sx={{ padding: 0, margin: 0, color: textColor }}>
            <SkipPreviousIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={handleStartPause} color="primary" size="small" sx={{ padding: 0, margin: 0, color: textColor }}>
            {isRunning ? <PauseIcon fontSize="small" /> : <PlayArrowIcon fontSize="small" />}
          </IconButton>
          <IconButton onClick={handleStop} color="error" size="small" sx={{ padding: 0, margin: 0, color: textColor }}>
            <StopIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={handleSkipForward} color="primary" size="small" sx={{ padding: 0, margin: 0, color: textColor }}>
            <SkipNextIcon fontSize="small" />
          </IconButton>
        </Box>
        <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.5rem', position: 'absolute', bottom: 4, color: textColor }}>
          Gesamt: {formatTime(accumulatedTime)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TimeTrackerButton;