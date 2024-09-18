import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Avatar, Box, Button, TextField, Grid } from '@mui/material';
import Header from '../HomePage/login';

const MyProfile = () => {
  const [patientData, setPatientData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [userRole, setUserRole] = useState(''); // State for storing user role

  useEffect(() => {
    const apiUrl = 'http://127.0.0.1:3010';
    const requestData = {
      "patients_id": 5
    };

    // Simulate fetching the user's role from an API or local storage
    const fetchUserRole = () => {
      // This is just a mock, replace it with your actual role fetching logic
      const role = 'patient'; // Replace this with the actual user role (e.g., from session/local storage or API)
      setUserRole(role);
    };

    fetchUserRole();

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Received data:', data);
        setPatientData(data[0]);
        setFormData(data[0]);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const handleEditToggle = () => {
    if (userRole === 'patient') {
      setIsEditing(!isEditing);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    // Save the updated profile information
    const apiUrl = 'http://127.0.0.1:3010/updateProfile';
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Profile updated successfully:', data);
        setPatientData(formData);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <Container>
        <Typography variant="h4" gutterBottom>
           Profile
        </Typography>
        <Paper elevation={3}>
          <Box
            p={3}
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Avatar
              alt="Patient Image"
              src={patientData?.img || 'default_image.jpg'}
              sx={{ width: 100, height: 100 }}
            />
            <Box>
              {isEditing ? (
                <>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      name="firstname"
                      label="First Name"
                      value={formData.firstname || ''}
                      onChange={handleChange}
                      margin="normal"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      name="lastname"
                      label="Last Name"
                      value={formData.lastname || ''}
                      onChange={handleChange}
                      margin="normal"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      name="dob"
                      label="Date of Birth"
                      type="date"
                      value={formData.dob || ''}
                      onChange={handleChange}
                      margin="normal"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      name="gender"
                      label="Gender"
                      value={formData.gender || ''}
                      onChange={handleChange}
                      margin="normal"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      name="martial_sts"
                      label="Marital Status"
                      value={formData.martial_sts || ''}
                      onChange={handleChange}
                      margin="normal"
                      fullWidth
                    />
                  </Grid>
                </>
              ) : (
                <>
                  <Typography variant="h6">
                    {`${patientData?.firstname} ${patientData?.lastname}`}
                  </Typography>
                  <Typography>
                    Date of Birth: {new Date(patientData?.dob).toLocaleDateString()}
                  </Typography>
                  <Typography>
                    Username: {patientData?.username}
                  </Typography>
                  <Typography>
                    Gender: {patientData?.gender}
                  </Typography>
                  <Typography>
                    Marital Status: {patientData?.martial_sts}
                  </Typography>
                </>
              )}
            </Box>
            <Box>
              {isEditing ? (
                <>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      name="address"
                      label="Address"
                      value={formData.address || ''}
                      onChange={handleChange}
                      margin="normal"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      name="city"
                      label="City"
                      value={formData.city || ''}
                      onChange={handleChange}
                      margin="normal"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      name="sts"
                      label="State"
                      value={formData.sts || ''}
                      onChange={handleChange}
                      margin="normal"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      name="zip_code"
                      label="Zip Code"
                      value={formData.zip_code || ''}
                      onChange={handleChange}
                      margin="normal"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      name="ph_no"
                      label="Phone Number"
                      value={formData.ph_no || ''}
                      onChange={handleChange}
                      margin="normal"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      name="alt_phn_no"
                      label="Alternate Phone Number"
                      value={formData.alt_phn_no || ''}
                      onChange={handleChange}
                      margin="normal"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      name="prmy_phyn"
                      label="Primary Physician"
                      value={formData.prmy_phyn || ''}
                      onChange={handleChange}
                      margin="normal"
                      fullWidth
                    />
                  </Grid>
                </>
              ) : (
                <>
                  <Typography>
                    Address: {patientData?.address}
                  </Typography>
                  <Typography>
                    City: {patientData?.city}
                  </Typography>
                  <Typography>
                    State: {patientData?.sts}
                  </Typography>
                  <Typography>
                    Zip Code: {patientData?.zip_code}
                  </Typography>
                  <Typography>
                    Phone Number: {patientData?.ph_no}
                  </Typography>
                  <Typography>
                    Alternate Phone Number: {patientData?.alt_phn_no}
                  </Typography>
                  <Typography>
                    Primary Physician: {patientData?.prmy_phyn}
                  </Typography>
                </>
              )}
            </Box>
          </Box>
          <Box p={3} display="flex" justifyContent="flex-end">
            {/* Conditionally render the Edit/Save buttons based on user role */}
            {userRole === 'patient' && (
              isEditing ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                  style={{ backgroundColor: '#20b2aa' }}
                >
                  Save
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleEditToggle}
                  style={{ backgroundColor: '#20b2aa' }}
                >
                  Edit
                </Button>
              )
            )}
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default MyProfile;
