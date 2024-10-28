// src/components/DataButton.js
import React, { useState } from 'react';
import Button from '@mui/material/Button';

const DataButton = ({ name, color }) => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <Button
      variant="contained"
      style={{ backgroundColor: color, width: '100px', height: '100px', margin: '10px' }}
      onClick={handleClick}
    >
      {name} ({count})
    </Button>
  );
};

export default DataButton;