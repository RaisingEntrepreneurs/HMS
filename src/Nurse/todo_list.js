import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const NurseTasks = ({ nurseId }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasksForNurse();
  }, []);

  const fetchTasksForNurse = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/tasks/nurse/${nurseId}`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks for nurse:', error);
    }
  };

  const formatIndianDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <Box p={3}>
      <Typography variant="h6" gutterBottom>Tasks Assigned to You</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Date Assigned</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.status}</TableCell> {/* Read-only status display */}
                <TableCell>{task.message}</TableCell>
                <TableCell>{formatIndianDate(task.date_assigned)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default NurseTasks;
