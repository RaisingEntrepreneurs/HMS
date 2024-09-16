import React from 'react';
import { Box, Typography, Paper, Grid, List, ListItem, ListItemText } from '@mui/material';

const Snapshot = () => {
  // Mock data for the snapshot
  const patientVitals = {
    bloodPressure: '120/80 mmHg',
    heartRate: '72 bpm',
    temperature: '98.6°F',
    oxygenSaturation: '98%'
  };

  const recentMedications = [
    { name: 'Paracetamol', dose: '500mg', frequency: '2 times/day' },
    { name: 'Ibuprofen', dose: '200mg', frequency: 'as needed' }
  ];

  const recentLabResults = [
    { name: 'Blood Test', date: '2024-08-15', result: 'Normal' },
    { name: 'X-ray', date: '2024-08-12', result: 'No Issues' }
  ];

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Patient Snapshot
      </Typography>

      {/* Vitals Section */}
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Recent Vitals
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography>Blood Pressure: {patientVitals.bloodPressure}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Heart Rate: {patientVitals.heartRate}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Temperature: {patientVitals.temperature}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Oxygen Saturation: {patientVitals.oxygenSaturation}</Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Medications Section */}
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Recent Medications
        </Typography>
        <List>
          {recentMedications.map((med, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`${med.name} - ${med.dose}`}
                secondary={`Frequency: ${med.frequency}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Lab Results Section */}
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Recent Lab Results
        </Typography>
        <List>
          {recentLabResults.map((result, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`${result.name} - Date: ${result.date}`}
                secondary={`Result: ${result.result}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Snapshot;
