import React from 'react';
import { AppBar, Toolbar, Button, Grid, Paper, Typography, Box, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import Header from '../HomePage/Header';

const useStyles = makeStyles({
  paper: {
    padding: '20px',
    textAlign: 'center',
    transition: 'transform 0.3s, box-shadow 0.3s',
    boxShadow: '#4b0082',
    '&:hover': {
      transform: 'translateY(-10px)',
      boxShadow: '#4b0082',
    },
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  profile: {
    position: 'absolute',
    top: '10px',
    right: '10px',
  },
  avatar: {
    width: '60px',
    height: '60px',
    cursor: 'pointer',
  },
});

const sections = [
  { title: 'Appointment', link: '/appointment' },
  { title: 'Personal Information', link: '/Patients' },
  { title: 'Medical Records', link: '/document' },
  { title: 'Prescription', link: '/doctorprescription' },
  { title: 'Billing & Payments', link: '/billing' },
  { title: 'Health Track', link: '/analytics' },
];

const PatientPage = () => {
  const classes = useStyles();
  return (
    <div>
      <Header />
      <Box p={3}>
        <Typography variant="h4" gutterBottom style={{ color: '#c71585', textAlign: 'center', marginBottom: '4%' }}>
          Welcome to Vaidhya Health Care
        </Typography>
        <Grid container spacing={10}>
          {sections.map((section, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Paper className={classes.paper} elevation={3}>
                <Link to={section.link} className={classes.link}>
                  <Typography variant="h6" style={{color:'#b22222',backgroundColor:'#8fbc8f'}}>{section.title} </Typography>
                </Link>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <div className={classes.profile} style={{marginTop:'5%'}}>
          <Link to="/myprofile">
            <Avatar className={classes.avatar} src="/path/to/profile-picture.jpg" /> 
          </Link>        </div>
      </Box>
    </div>
  );
};

export default PatientPage;
