import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Charts = () => {
  // Mock data for the chart
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Blood Pressure',
        data: [120, 122, 121, 125, 118, 124],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      }
    ]
  };

  return (
    <Box p={3}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Patient Health Charts
        </Typography>
              </Paper>
    </Box>
  );
};

export default Charts;
