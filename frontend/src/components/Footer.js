// src/components/Footer.js
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, Typography, Box } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#1976D2',
        padding: '10px 0',
        position: 'fixed',
        bottom: 0,
        left: 0,
      }}
    >
      <Container maxWidth="md">
        <Typography variant="body2" color="white" align="center">
          © {new Date().getFullYear()} Arthu👑. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
