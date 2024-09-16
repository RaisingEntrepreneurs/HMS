import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Paper, Typography, Button, FormControl, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,TextField,InputLabel,Select,MenuItem } from '@mui/material';

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    assignedTo: '',
    status: 'Pending',
    message: ''
  });

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/tasks', newTask);
      setTasks([...tasks, response.data]);
      setNewTask({ title: '', assignedTo: '', status: 'Pending', message: '' });
      alert('Task added successfully!');
    } catch (error) {
      console.error('Error adding task:', error);
      alert('Error adding task. Please try again.');
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
      {/* Task Creation Form */}
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h6">Add New Task</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Task Title"
            name="title"
            value={newTask.title}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Assign To</InputLabel>
            <Select
              name="assignedTo"
              value={newTask.assignedTo}
              onChange={handleInputChange}
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Message"
            name="message"
            value={newTask.message}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Add Task
          </Button>
        </form>
      </Paper>

      {/* Task List in Table Format */}
      <Typography variant="h6" gutterBottom>Task List</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Date Assigned</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.assignedTo}</TableCell>
                <TableCell>{task.status}</TableCell> {/* Display status as read-only */}
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

export default Todo;
