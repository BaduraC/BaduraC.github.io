// src/components/ButtonGrid.js
import React from 'react';
import Grid from '@mui/material/Grid';
import DataButton from './DataButton';

const ButtonGrid = ({ buttons, onDelete }) => {
  return (
    <Grid container spacing={2}>
      {buttons.map((button, index) => (
        <Grid item key={button.id}>
        <DataButton
          id={button.id}
          name={button.name}
          color={button.color}
          initialCount={button.count || 0}
          onDelete={onDelete}
        />
      </Grid>
      ))}
    </Grid>
  );
};

export default ButtonGrid;