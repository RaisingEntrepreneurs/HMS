import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import {useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../HomePage/sessionservice';

function Header() {
  
     const navigate = useNavigate();
    const location = useLocation();
    const [logoutConfirmationOpen, setLogoutConfirmationOpen] = useState(false);

    const handleLogout = () => {
        // Open the logout confirmation dialog
        setLogoutConfirmationOpen(true);
    };

    const handleConfirmLogout = async () => {
       
        // Call the logout function to perform logout and redirect
        await logout(navigate);
    };

    const handleCancelLogout = () => {
        // Close the logout confirmation dialog
        setLogoutConfirmationOpen(false);
    };
    
  return (
        <div>
        <AppBar position="static" style={{ height: '2%', backgroundColor: '#66cdaa' }}>
       <Toolbar>
    <Typography variant="h8" component="div" sx={{ flexGrow: 1, color: 'white' }}>
    Vaidhya Health Care
  </Typography>                                     
                    <Button color="inherit" onClick={handleLogout} style={{ color: location.pathname === '/logout' ? '#072A40' : 'white' }}>
                        Logout
                    </Button>
          </Toolbar>
        </AppBar>      
      <Dialog open={logoutConfirmationOpen} onClose={handleCancelLogout}>
                <DialogTitle>Confirm Logout</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to logout?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelLogout} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmLogout} color="primary">
                        Logout
                    </Button>
                </DialogActions>
            </Dialog>
      </div>
      
  );
};

export default Header;