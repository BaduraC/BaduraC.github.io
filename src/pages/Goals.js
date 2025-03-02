import React from 'react';
import { Container, Typography } from '@mui/material';
import FooterNav from '../components/Footer';
import Header from '../components/Header';

const Goals = ({colorTheme}) => {
  return (
    <div className="main-container">
      <Header colorTheme={colorTheme} />
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Goals
        </Typography>
        {/* Hier können Ziele-Komponenten eingefügt werden */}
        <FooterNav colorTheme={colorTheme} />
      </Container>
    </div>
  );
};

export default Goals;