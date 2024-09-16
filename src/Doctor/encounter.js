import React, { useState, useEffect } from 'react';
import { Paper, Typography, Box, List, ListItem, ListItemText, Button, TextField } from '@mui/material';

const Encounters = () => {
  const [pastAppointments, setPastAppointments] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    reason: '',
    symptoms: '',
    investigation: '',
    prescription: '',
    diagnosisExpected: '',
    diagnosisActual: ''
  });

  // Function to fetch past and upcoming appointments from the API
  const fetchAppointments = async () => {
    try {
      // Replace 'patientId' with the actual patient ID
      const patientId = 1;

      // Fetch past appointments
      const pastResponse = await fetch(`http://localhost:5000/api/pastAppointments/${patientId}`);
      const pastData = await pastResponse.json();
      setPastAppointments(pastData);

      // Fetch upcoming appointments
      const upcomingResponse = await fetch(`http://localhost:5000/api/upcomingAppointments/${patientId}`);
      const upcomingData = await upcomingResponse.json();
      setUpcomingAppointments(upcomingData);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
    setIsEditing(false); // Initially, we don't want the doctor to be in edit mode
  };

  const handleUpcomingAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
    setIsEditing(true); // Enable doctor to edit for upcoming appointments
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const appointmentId = selectedAppointment.id;
      await fetch(`http://localhost:5000/api/appointments/${appointmentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log('Saved appointment data:', formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving appointment:', error);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Patient History & Upcoming Appointments
      </Typography>
      
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h5" gutterBottom>Past Appointments</Typography>
        <List>
          {pastAppointments.map(appointment => (
            <ListItem button key={appointment.id} onClick={() => handleAppointmentClick(appointment)}>
              <ListItemText primary={`Date: ${appointment.date}`} secondary={`Reason: ${appointment.reason}`} />
            </ListItem>
          ))}
        </List>
      </Paper>
      
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h5" gutterBottom>Upcoming Appointments</Typography>
        <List>
          {upcomingAppointments.map(appointment => (
            <ListItem button key={appointment.id} onClick={() => handleUpcomingAppointmentClick(appointment)}>
              <ListItemText primary={`Date: ${appointment.date}`} secondary={`Doctor: ${appointment.doctor}`} />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Display selected appointment details */}
      {selectedAppointment && (
        <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
          <Typography variant="h5" gutterBottom>Appointment Details</Typography>
          <Typography>
            Date: {selectedAppointment.date} <br />
            Time: {selectedAppointment.time}
          </Typography>

          {!isEditing ? (
            <Box mt={3}>
              <Typography variant="h6">Reason of Visit: {selectedAppointment.reason}</Typography>
              <Typography>Doctor's Suggestions: {selectedAppointment.suggestions}</Typography>
              <Typography>Prescription: {selectedAppointment.prescription}</Typography>
            </Box>
          ) : (
            <Box mt={3}>
              <TextField
                label="Reason for Visit"
                name="reason"
                value={formData.reason}
                onChange={handleFormChange}
                margin="normal"
                fullWidth
              />
              <TextField
                label="Symptoms"
                name="symptoms"
                value={formData.symptoms}
                onChange={handleFormChange}
                margin="normal"
                fullWidth
              />
              <TextField
                label="Investigation"
                name="investigation"
                value={formData.investigation}
                onChange={handleFormChange}
                margin="normal"
                fullWidth
              />
              <TextField
                label="Prescription"
                name="prescription"
                value={formData.prescription}
                onChange={handleFormChange}
                margin="normal"
                fullWidth
              />
              <TextField
                label="Diagnosis (Expected)"
                name="diagnosisExpected"
                value={formData.diagnosisExpected}
                onChange={handleFormChange}
                margin="normal"
                fullWidth
              />
              <TextField
                label="Diagnosis (Actual)"
                name="diagnosisActual"
                value={formData.diagnosisActual}
                onChange={handleFormChange}
                margin="normal"
                fullWidth
              />
              <Button variant="contained" color="primary" onClick={handleSave} style={{ marginTop: '20px' }}>
                Save
              </Button>
            </Box>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default Encounters;
