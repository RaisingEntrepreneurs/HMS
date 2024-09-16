import React, {useState} from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Avatar, Typography, Divider, Box } from '@mui/material';
import { Link,Outlet } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Home, Assignment, CalendarToday, Payment, Report, People, ExitToApp } from '@mui/icons-material';

const useStyles = makeStyles({
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
    backgroundColor: '#f5f5f5', // Light background for appeal
    borderRight: '1px solid #ddd',
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px 0',
  },
  avatar: {
    width: 80,
    height: 80,
  },
  profileName: {
    marginTop: 10,
    fontWeight: 500,
    color: '#000080',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  content: {
    flexGrow: 1,
    padding: '20px',
    marginLeft: 240, // Shift content to accommodate sidebar
  },
  listItem: {
    '&:hover': {
      backgroundColor: '#afeeee',
    },
  },
});

const sections = [
  { title: 'Dashboard', link: '/Doctorhome/dashboard', icon: 'home' },
  { title: 'To-do', link: '/Doctorhome/todo', icon: 'assignment' },
  { title: 'Calendar', link: '/Doctorhome/calendar', icon: 'calendar' },
  { title: 'Patients Management', link: '/Doctorhome/patients', icon: 'people' },
  { title: 'Billing & Payments', link: '/Doctorhome/billing', icon: 'payment' },
  { title: 'Reports', link: '/Doctorhome/reports', icon: 'report' },
  { title: 'Logout', link: '/logout', icon: 'logout' },
];


const Doctorhome = () => {
  const classes = useStyles();
  const [pageTitle, setPageTitle] = useState('Welcome to Clinic Management System');
  return (
    <div>
     
      
      {/* Sidebar Drawer */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        {/* Profile Section */}
        <Box className={classes.profileContainer}>
          <Avatar className={classes.avatar} src="/path/to/profile-picture.jpg" />
          <Typography variant="h6" className={classes.profileName}>Dr. John Doe</Typography>
        </Box>
        <Divider />
        
        {/* Navigation List */}
        <List>
          {sections.map((section, index) => (
            <ListItem button component={Link} to={section.link} key={index} className={classes.listItem} onClick={() => setPageTitle(section.title)} >
             <ListItemIcon>{getIcon(section.icon)}</ListItemIcon>
              <ListItemText primary={section.title} />
            </ListItem>
          ))}
        </List>          
      </Drawer>
      <Box className={classes.content}>
        {/* Dynamic Page Title */}
        <Typography
          variant="h4"
          gutterBottom
          style={{ color: '#000080', marginTop: '2%', marginBottom: '2%' }}
        >
          {pageTitle}
        </Typography>
        {/* Outlet for the dynamic page content */}
        <Outlet />
      </Box>
      </div>        
  );
};

// Function to get icons for the sections
function getIcon(iconName) {
  switch (iconName) {
    case 'home':
      return <Home />;
    case 'assignment':
      return <Assignment />;
    case 'calendar':
      return <CalendarToday />;
    case 'people':
      return <People />;
    case 'payment':
      return <Payment />;
    case 'report':
      return <Report />;
    case 'logout':
      return <ExitToApp />;
    default:
      return <Home />;
  }
}

export default Doctorhome;
