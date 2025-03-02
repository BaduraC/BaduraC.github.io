import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from '@mui/material';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/home');
  };

  return (
    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Button variant="contained" color="primary" onClick={handleStart}>
        Start
      </Button>
    </Container>
  );
};

export default LoginPage;