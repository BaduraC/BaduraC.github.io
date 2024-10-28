// src/components/AddButton.js
import React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

const AddButton = ({ onClick }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      style={{ width: '100px', height: '100px', margin: '10px' }}
    >
      <AddIcon />
    </Button>
  );
};

export default AddButton;