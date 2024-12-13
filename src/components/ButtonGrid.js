// src/components/ButtonGrid.js
import React from 'react';
import Grid2 from '@mui/material/Grid2';
import DataButton from './DataButton';

const ButtonGrid = ({ buttons, onDelete }) => {
  return (
    <Grid2 container spacing={2}>
      {buttons.map((button) => (
        <Grid2 item key={button.id}>
          <DataButton
            id={button.id}
            name={button.name}
            color={button.color}
            initialCount={button.count || 0}
            onDelete={onDelete}
          />
        </Grid2>
      ))}
    </Grid2>
  );
};

export default ButtonGrid;