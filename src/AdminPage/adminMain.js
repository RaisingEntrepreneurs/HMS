import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import Header from '../HomePage/Header';
import bcrypt from 'bcryptjs';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import SessionValidationHOC from '../HomePage/sessionvalidationHoc';
import { checkInactivity } from '../HomePage/sessionservice';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const AdminPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [action, setAction] = useState(''); // State to manage the select value
  const apiurl = process.env.React_App_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      checkInactivity(navigate); // Pass navigate to the checkInactivity function
    }, 60 * 1000); // Check every minute

    return () => clearInterval(intervalId);
  }, [navigate]);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get(`${apiurl}/users`);
      const userData = response.data.data.rows;
      // Filter out Admin, Pharmacist, and Pharma Assistant users
      const filteredUserData = userData.filter(user => !['A', 'P', 'PA'].includes(user.typ));
      setUsers(filteredUserData);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }, [apiurl]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleCreateUser = async () => {
    try {
      // Check if username already exists
      const existingUserResponse = await axios.get(`${apiurl}/users?username=${username}`);
      if (existingUserResponse.data.exists) {
        toast.error('User already exists!'); // Show error message
        return;
      }

      // Hash the password and create the user if no duplicate found
      const hashedPassword = await bcrypt.hash(password, 10);
      await axios.post(`${apiurl}/users`, { username, password: hashedPassword, userType });
      setUsername('');
      setPassword('');
      setUserType('');
      fetchUsers();
      toast.success('User created successfully!');
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error('Failed to create user.');
    }
  };

  const handleDeleteUser = async (username) => {
    try {
      await axios.delete(`${apiurl}/users/${username}`);
      fetchUsers();
      toast.success('Deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleUpdatePassword = async (username, newPassword) => {
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10); // Hash the new password before sending it
      await axios.put(`${apiurl}/users/${username}`, { usrnme: username, pswd: hashedPassword });
      fetchUsers();
      toast.success('Password updated successfully!');
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error('Failed to update password.');
    }
  };

  const filteredUsers = users.filter(user =>
    user.usrnme.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header />
      <ToastContainer />
      <div style={{ marginTop: '20px', marginLeft: '10px' }}>
        <h2 style={{ color: '#18B7BE', fontSize: '24px', display: 'inline-block' }}>Create User</h2>
        <div style={{ marginTop: '40px' }}>
          <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} style={{ marginLeft: '30px' }} />
          <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ marginLeft: '30px' }} />
          <FormControl>
            <InputLabel style={{ marginLeft: '30px' }}>User Type</InputLabel>
            <Select style={{ width: '300px', marginLeft: '30px' }} value={userType} onChange={(e) => setUserType(e.target.value)} >
              <MenuItem value="">Select User Type</MenuItem>
              <MenuItem value="N">Nurse</MenuItem>
              <MenuItem value="FD">Front Desk</MenuItem>
              <MenuItem value="D">Doctor</MenuItem>
            </Select>
          </FormControl>
          <Button onClick={handleCreateUser} variant="contained" style={{ marginLeft: '30px', color: 'primary', background: '#178CA4' }}>Create User</Button>
        </div>
      </div>
      <hr style={{ width: '100%', color: '#005493', backgroundColor: '#18B7BE', height: '1px', border: 'none' }} />
      <h2 style={{ color: '#18B7BE', fontSize: '24px', display: 'inline-block', marginLeft: '10px' }}>Users</h2>
      <TextField
        label="Search "
        style={{ marginTop: '30px', marginBottom: '20px' }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>User Type</TableCell>
              <TableCell style={{ width: '300px' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map(user => (
              <TableRow key={user.usrnme}>
                <TableCell>{user.usrnme}</TableCell>
                <TableCell>
                  {user.typ === 'N' && 'Nurse'}
                  {user.typ === 'FD' && 'Front Desk'}
                  {user.typ === 'D' && 'Doctor'}
                </TableCell>
                <TableCell>
                  <FormControl>
                    <Select
                      value={action}
                      style={{ width: '300px' }}
                      onChange={(e) => {
                        const selectedAction = e.target.value;
                        if (selectedAction === 'delete') {
                          handleDeleteUser(user.usrnme);
                        } else if (selectedAction === 'updatePassword') {
                          const newPassword = prompt('Enter new password:');
                          if (newPassword !== null) {
                            handleUpdatePassword(user.usrnme, newPassword);
                          }
                        }
                      }}
                    >
                      <MenuItem value="delete">Delete</MenuItem>
                      <MenuItem value="updatePassword">Update Password</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SessionValidationHOC(AdminPage);
