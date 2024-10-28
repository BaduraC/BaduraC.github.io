// src/components/ButtonGrid.js
import React from 'react';
import Grid from '@mui/material/Grid';
import DataButton from './DataButton';

const ButtonGrid = ({ buttons }) => {
  return (
    <Grid container spacing={2}>
      {buttons.map((button, index) => (
        <Grid item key={index}>
          <DataButton name={button.name} color={button.color} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ButtonGrid;