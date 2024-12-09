// src/components/DataButton.js
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { updateTracker, deleteTracker } from '../utils/db';

const DataButton = ({ id, name, color, initialCount, onDelete }) => {
  const [count, setCount] = useState(initialCount);

  const handleClick = async () => {
    const newCount = count + 1;
    setCount(newCount);
    await updateTracker({ id, name, color, count: newCount });
  };

  const handleDelete = async () => {
    if(window.confirm('Möchten SIe diesen Tracker wirklich löschen?')){
      try {
        await deleteTracker(id);
      onDelete(id);
      } catch (error) {
        console.error('Fehler beim Löschen des Trackers:', error);
      }
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', margin: '10px' }}>
      <Button
        variant="contained"
        style={{ backgroundColor: color, width: '100px', height: '100px', margin: '10px' }}
        onClick={handleClick}
      >
        {name} ({count})
      </Button>
      <IconButton onClick={handleDelete} color="secondary">
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default DataButton;