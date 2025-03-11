import React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/AddCircleOutline';

const AddButton = ({ onClick }) => {
  return (
    <Button
      
      
      onClick={onClick}
      sx={{
        width: 100,
        height: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
      }}
    >
      <AddIcon sx={{fontSize: 80}} />
    </Button>
  );
};

export default AddButton;