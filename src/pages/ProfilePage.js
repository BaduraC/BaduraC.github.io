import React from 'react';
import { Container, Typography, Avatar, Button, Box, TextField } from '@mui/material';
import Header from '../components/Header';
import FooterNav from '../components/Footer';

const ProfilePage = ({ colorTheme, setColorTheme }) => {
  const handleEditProfile = () => {
    // Hier kannst du die Logik zum Bearbeiten des Profils hinzufügen
    alert('Profil bearbeiten');
  };

  const handleColorChange = (event) => {
    setColorTheme(event.target.value);
  };

  return (
    <div className="main-container">
      <Header colorTheme={colorTheme} />
      <Container>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="calc(100vh - 112px)" // Höhe des Viewports minus Höhe von Header und Footer
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Profil
          </Typography>
          <Avatar alt="User Name" src="/static/images/avatar/1.jpg" sx={{ width: 100, height: 100, marginBottom: 2 }} />
          <Typography variant="h6" component="h2">
            Benutzername
          </Typography>
          <Typography variant="body1" component="p">
            benutzer@example.com
          </Typography>
          <Button variant="contained" color="primary" onClick={handleEditProfile} sx={{ marginTop: 2 }}>
            Profil bearbeiten
          </Button>
          <Button
            variant="contained"
            component="label"
            sx={{ marginTop: 2 }}
          >
            Farbthema bearbeiten
            <input
              type="color"
              value={colorTheme}
              onChange={handleColorChange}
              hidden
            />
          </Button>
        </Box>
      </Container>
      <FooterNav colorTheme={colorTheme} />
    </div>
  );
};

export default ProfilePage;