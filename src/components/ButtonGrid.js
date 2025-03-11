// src/components/ButtonGrid.js
import React from 'react';
import Grid2 from '@mui/material/Grid2';
import CounterTrackerButton from './CounterTrackerButton';
import TimeTrackerButton from './TimeTrackerButton';
import AddButton from './AddButton';

const ButtonGrid = ({ buttons, onDelete, onAddButtonClick }) => {
  return (
    <Grid2 container spacing={1} sx={{width: '100%'}}>
      {buttons.map((button) => (
        <Grid2 item="true" xs={12} sm={6} md={4} key={button.id}>
          {button.type === 'counter' ? (
            <CounterTrackerButton
              id={button.id}
              name={button.name}
              color={button.color}
              initialCount={button.count || 0}
              onDelete={onDelete}
            />
          ) : button.type === 'time' ? (
            <TimeTrackerButton
              id={button.id}
              name={button.name}
              color={button.color}
              initialStartTime={button.startTime}
              initialEndTime={button.endTime}
              initialAccumulatedTime={button.accumulatedTime || 0}
              onDelete={onDelete}
            />
          ) : null}
        </Grid2>
      ))}
          <Grid2 item="true" xs={12} sm={6} md={4}>
            <AddButton onClick={onAddButtonClick} />
          </Grid2>
    </Grid2>
  );
};

export default ButtonGrid;