import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { updateTimeTracker, deleteTimeTracker, getTimeTrackers } from '../utils/db';

const TimeTrackerButton = ({ id, name, color, initialStartTime, initialEndTime,initialAccumulatedTime, onDelete }) => {
  const [startTime, setStartTime] = useState(initialStartTime);
  const [endTime, setEndTime] = useState(initialEndTime);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [accumulatedTime, setAccumulatedTime] = useState(initialAccumulatedTime || 0);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        const now = new Date();
        const start = new Date(startTime);
        setElapsedTime(Math.floor((now - start) / 1000));
      }, 1000);
    } else if (!isRunning && startTime && endTime) {
      const start = new Date(startTime);
      const end = new Date(endTime);
      setElapsedTime(Math.floor((end - start) / 1000));
    }
    return () => clearInterval(interval);
  }, [isRunning, startTime, endTime]);


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

  const handleStart = async () => {
    const now = new Date().toISOString();
    setStartTime(now);
    setIsRunning(true);
    setElapsedTime(0); // Reset elapsedTime when starting

    await updateTimeTracker({ id, name, color, startTime: startTime || now, endTime: null });
  };

  const handleStop = async () => {
    const now = new Date().toISOString();
    setEndTime(now);
    setIsRunning(false);
    const newAccumulatedTime = accumulatedTime + elapsedTime;
    setAccumulatedTime(newAccumulatedTime);
    await updateTimeTracker({ id, name, color, startTime, endTime: now, accumulatedTime: newAccumulatedTime });
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

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', margin: '10px' }}>
      <Button
        variant="contained"
        style={{ backgroundColor: color, width: '150px', height: '150px', margin: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
        onClick={isRunning ? handleStop : handleStart}
      >
        {name} {isRunning ? 'Stop' : 'Start'}<br />
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <span>Aktuell:</span>
          <span>{formatTime(elapsedTime)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <span>Gesamt:</span>
          <span>{formatTime(accumulatedTime)}</span>
        </div>
      </Button>
      <IconButton onClick={handleDelete} color="secondary">
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default TimeTrackerButton;