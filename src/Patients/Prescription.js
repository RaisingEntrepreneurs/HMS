import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import Header from '../HomePage/login';
import axios from 'axios';

const DoctorPrescription = () => {
  const [currentMedications, setCurrentMedications] = useState([]);
  const [prescriptionHistory, setPrescriptionHistory] = useState([]);
  const [refillRequests, setRefillRequests] = useState([]);
  const [newMedication, setNewMedication] = useState('');

  useEffect(() => {
    // Fetch data from the server
    const fetchData = async () => {
      try {
        const currentResponse = await axios.get('/api/current-medications');
        setCurrentMedications(currentResponse.data);

        const historyResponse = await axios.get('/api/prescription-history');
        setPrescriptionHistory(historyResponse.data);

        const refillResponse = await axios.get('/api/refill-requests');
        setRefillRequests(refillResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddMedication = async () => {
    try {
      const response = await axios.post('/api/current-medications', { medication: newMedication });
      setCurrentMedications([...currentMedications, response.data]);
      setNewMedication('');
    } catch (error) {
      console.error('Error adding medication:', error);
    }
  };

  return (
    <div>
      <Header />
      <Container>
        <Typography variant="h4" gutterBottom style={{marginTop:'2%', marginBottom:'2%'}}>
          Doctor's Prescription
        </Typography>
        
        <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
          <Typography variant="h5" gutterBottom>
            Current Medication
          </Typography>
          <List>
            {currentMedications.map((med, index) => (
              <ListItem key={index}>
                <ListItemText primary={med.name} />
              </ListItem>
            ))}
          </List>
          <Box display="flex" alignItems="center">
            <TextField
              label="Add New Medication"
              value={newMedication}
              onChange={(e) => setNewMedication(e.target.value)}
              fullWidth
            />
            <Button variant="contained" color="primary" onClick={handleAddMedication} style={{ marginLeft: '10px' }}>
              Add
            </Button>
          </Box>
        </Paper>
        
        <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
          <Typography variant="h5" gutterBottom>
            Prescription History
          </Typography>
          <List>
            {prescriptionHistory.map((history, index) => (
              <ListItem key={index}>
                <ListItemText primary={`${history.date} - ${history.medication}`} />
              </ListItem>
            ))}
          </List>
        </Paper>
        
        <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
          <Typography variant="h5" gutterBottom>
            Refill Requests
          </Typography>
          <List>
            {refillRequests.map((request, index) => (
              <ListItem key={index}>
                <ListItemText primary={`${request.patient} requested refill for ${request.medication}`} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </div>
  );
};

export default DoctorPrescription;
