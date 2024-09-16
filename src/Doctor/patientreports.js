import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, Button } from '@mui/material';

const PatientReports = () => {
  // Mock report data
  const reportsData = [
    {
      id: 1,
      name: 'Blood Test',
      date: '2024-08-12',
      status: 'Available'
    },
    {
      id: 2,
      name: 'X-ray',
      date: '2024-08-15',
      status: 'Pending'
    }
  ];

  return (
    <Box p={3}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Patient Reports
        </Typography>
        <List>
          {reportsData.map((report) => (
            <ListItem key={report.id}>
              <ListItemText
                primary={report.name}
                secondary={`Date: ${report.date} - Status: ${report.status}`}
              />
              {report.status === 'Available' && (
                <Button variant="contained" color="primary">
                  Download
                </Button>
              )}
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default PatientReports;
