import React, { useState } from 'react';
import { Button, Typography, Dialog, DialogContent, DialogTitle, DialogActions, TextField, Grid, Link, FormControlLabel, Checkbox, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { GenerateSession } from './sessionservice'; // Importing GenerateSession function
import loginIcon from '../images/loginbutton.png';

const buttonStyle = {
  padding: 0,
  minWidth: 0,
  background: 'none',
  border: 'none',
};
const LoginEffect = () => {
  const [openCredentialsDialog, setOpenCredentialsDialog] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const navigate = useNavigate();
  const apiurl=process.env.React_App_API_URL;
    
  const handleLoginClick = async () => {
    try {
      const response = await fetch(`${apiurl}/api/vaidhyalogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), // Send the plain text password
      });
      const data = await response.json();
      
      if (response.ok) {
        if (data.success) {
          // Call GenerateSession function to create a session
          await GenerateSession(data.username, navigate);
          localStorage.setItem('username', data.username);
          localStorage.setItem('typ', data.result.rows[0].typ);
          // Redirect the user based on their role
          const userType = data.result.rows[0].typ;
          switch (userType) {
            case 'P':
              navigate('/billingp');
              break;
            case 'A':
              navigate('/Dashboarda');
              break;
              case 'PA':
                navigate('/billingpa');
                break;
            default:
              setLoginFailed(true);
              break;
          }
        } else {
          setLoginFailed(true);
        }
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setLoginFailed(true);
    }
  };
  
  

  const handleCredentialsDialogClose = () => {
    setOpenCredentialsDialog(false);
    setUsername('');
    setPassword('');
    setLoginFailed(false);
  };

  const openCredentialsDialogBox = () => {
    setOpenCredentialsDialog(true);
  };

  const rememberPasswordLabelStyle = {
    marginTop: '10px',
  };

  return (
    <div className="login-button">
      <Typography component="div">
      <IconButton onClick={openCredentialsDialogBox} style={buttonStyle}>
      <img src={loginIcon} alt="Login" style={{ width: '20%', height: '20%', objectFit: 'cover' }} />
    </IconButton>
      </Typography>

      <Dialog open={openCredentialsDialog} onClose={handleCredentialsDialogClose} sx={{ position: 'absolute', top: '0%', left: '0%' }}>
        <DialogContent style={{ backgroundColor: '#18B7BE', borderRadius: '12px', padding: '20px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', marginTop: '20px', padding: '20px' }}>
            <DialogTitle>Login</DialogTitle>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox checked={rememberPassword} onChange={() => setRememberPassword(!rememberPassword)} />}
                  label="Remember Password"
                  style={rememberPasswordLabelStyle}
                />
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', gap: '20px' }}>
              <Typography>
                <Link href="#" color="inherit">
                  Forgot Password?
                </Link>
              </Typography>
              <Typography>
                
              </Typography>
            </Box>
            <DialogActions>
              <Button onClick={handleCredentialsDialogClose} variant="contained" style= {{backgroundColor:"#18B7BE" ,color:"white"}}>
                Close
              </Button>
              <Button onClick={handleLoginClick} variant="contained" style= {{backgroundColor:"#18B7BE" ,color:"white"}}>
                Login
              </Button>
            </DialogActions>
            {loginFailed && <Typography variant="body2" color="error">Login failed. Please check your credentials.</Typography>}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoginEffect ;
