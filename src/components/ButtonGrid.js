// src/components/ButtonGrid.js
import React from 'react';
import Grid2 from '@mui/material/Grid2';
import CounterTrackerButton from './CounterTrackerButton';
import TimeTrackerButton from './TimeTrackerButton';

const ButtonGrid = ({ buttons, onDelete }) => {
  return (
    <Grid2 container spacing={2}>
      {buttons.map((button) => (
        <Grid2 item="true" xs={12} key={button.id}>
          {button.type === 'counter' ? (
            <CounterTrackerButton
              id={button.id}
              name={button.name}
              color={button.color}
              initialCount={button.count || 0}
              onDelete={onDelete}
            />
          ) : (
            <TimeTrackerButton
              id={button.id}
              name={button.name}
              color={button.color}
              initialStartTime={button.startTime}
              initialEndTime={button.endTime}
              initialAccumulatedTime={button.accumulatedTime || 0}
              onDelete={onDelete}
            />
          )}
        </Grid2>
      ))}
    </Grid2>
  );
};

export default ButtonGrid;