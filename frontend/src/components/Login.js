// Login.js
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Link, Paper } from '@mui/material';
import axios from 'axios'
const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    axios.post('')
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    // Perform login logic here
    onLogin();
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      background: 'linear-gradient(90deg, rgba(44,44,44,.2), rgba(20,130,201,.4))' 
    }}>
      <Paper elevation={3} style={{ padding: 20, width: '100%', maxWidth: 400 }}>
        <Typography variant="h4" gutterBottom align="center">
          Logo
        </Typography>
        <TextField
          label="Email Address"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={handleEmailChange}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={handlePasswordChange}
        />
        <Box mt={2} textAlign="center">
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
          <Box mt={1}>
            <Link href="#" variant="body2">
              Use another account
            </Link>
          </Box>
        </Box>
        <Box mt={4} textAlign="center">
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default Login;
