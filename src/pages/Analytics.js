import React from 'react';
import { Container, Typography } from '@mui/material';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Analytics = ({colorTheme}) => {
  return (
    <div className="main-container">
        <Header colorTheme={colorTheme}/>
        <Container>
        <Typography variant="h4" component="h1" gutterBottom>
            Analytics
        </Typography>
        {/* Hier können Diagramm-Komponenten eingefügt werden */}
        <Footer colorTheme={colorTheme}/>
        </Container>
    </div>
  );
};

export default Analytics;