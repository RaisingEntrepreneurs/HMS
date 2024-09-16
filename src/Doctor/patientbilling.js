import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const PatientBilling = () => {
  // Mock billing data
  const billingData = [
    {
      id: 1,
      service: 'Consultation',
      date: '2024-08-01',
      amount: 50,
      status: 'Paid'
    },
    {
      id: 2,
      service: 'Lab Tests',
      date: '2024-08-10',
      amount: 100,
      status: 'Unpaid'
    }
  ];

  return (
    <Box p={3}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Patient Billing Information
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Service</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {billingData.map((bill) => (
                <TableRow key={bill.id}>
                  <TableCell>{bill.service}</TableCell>
                  <TableCell>{bill.date}</TableCell>
                  <TableCell>{bill.amount}</TableCell>
                  <TableCell>{bill.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default PatientBilling;
