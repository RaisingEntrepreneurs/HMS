import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box, List, ListItem, TextField, Tabs, Tab, Button, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, MenuItem, Modal } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MyProfile from '../Patients/MyProfile';
import Encounters from './encounter';
import PatientBilling from './patientbilling';
import PatientReports from './patientreports';
import Charts from './charts';
import Snapshot from './snapshot';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [patientSearchTerm, setPatientSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [surName, setSurName] = useState('');
  const [name, setName] = useState('');
  const [patientDob, setPatientDob] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [DateOfBirth, setDateOfBirth] = useState('');
  const [Age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [state, setState] = useState('');
  const [Allergies, setAllergies] = useState('');
  const [newPatientDialogOpen, setNewPatientDialogOpen] = useState(false);
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);
  const [emptyFields, setEmptyFields] = useState(false);
  const [emptyFieldsList, setEmptyFieldsList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [givenName, setGivenName] = useState('');
   const navigate = useNavigate();
  const apiurl = process.env.React_App_API_URL || 'http://localhost:5000';

  const handleSearch = async (event) => {
    setPatientSearchTerm(event.target.value);
    try {
      const response = await axios.get(`${apiurl}/api/patients?search=${event.target.value}`);
      setPatients(response.data);
    } catch (error) {
      console.error('Error searching patients:', error);
    }
  };
  const handleDOBChange = (e) => {
    setDateOfBirth(e.target.value);
    // Automatically calculate age when DOB is set
    const today = new Date();
    const birthDate = new Date(e.target.value);
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    setAge(calculatedAge);
  };
  const handlePatientSelect = patient => {
    setSelectedPatient(patient);
    setPatientName(patient.surname);
    setGivenName (patient.given_name);
   setDateOfBirth (patient.dateofbirth );
   setAge (patient.age);
    // Clear search data
  setPatientSearchTerm('');
  setPatients([]);
};
  const handlePatientedit = patient => {
    setSelectedPatient(patient);
    setSurName(patient.surname);
    setName(patient.given_name);
    setDateOfBirth(patient.dateofbirth);
    setAge(patient.age);
    setPhoneNumber(patient.phonenumber);
    setGender(patient.gender);
    setAddress(patient.address);
    setCity(patient.city);
    setPinCode(patient.pincode);
    setState(patient.pt_state);
    setAllergies(patient.allergies);
    setIsEditing(true);
    setNewPatientDialogOpen(true);
  };

  const handleNewPatientDialogOpen = () => {
    setSelectedPatient(null);
    setIsEditing(false);
    setNewPatientDialogOpen(true);
  };

  const handleNewPatientDialogClose = () => {
    setNewPatientDialogOpen(false);
  };

  const handleSavePatient = async () => {
    setEmptyFields(false);
    setEmptyFieldsList([]);
    const emptyFieldsList = [];
  
    // Validate required fields
    if (!surName) emptyFieldsList.push("SurName");
    if (!name) emptyFieldsList.push("Given Name");
    if (!phoneNumber) emptyFieldsList.push("Phone Number");
    if (!DateOfBirth) emptyFieldsList.push("Date of Birth");
    if (!gender) emptyFieldsList.push("Gender");
    if (!address) emptyFieldsList.push("Address");
    if (!city) emptyFieldsList.push("City");
    if (!pinCode) emptyFieldsList.push("Pin code");
    if (!state) emptyFieldsList.push("State");
    if (!Allergies) emptyFieldsList.push("Allergies");
  
    // If there are missing fields, set the error and return
    if (emptyFieldsList.length > 0) {
      setEmptyFields(true);
      setEmptyFieldsList(emptyFieldsList);
      return;
    }
  
    // Prepare the data object
    const data = {
      surName,
      name,
      phoneNumber,
      DateOfBirth: new Date(DateOfBirth).toISOString().split('T')[0], // Format date as YYYY-MM-DD
      Age,
      gender,
      address,
      city,
      pinCode,
      state,
      Allergies: Array.isArray(Allergies) ? Allergies : [Allergies], // Ensure Allergies is an array
    };
  
    console.log("Data being sent to API:", data); // Log the data
  
    try {
      if (isEditing) {
        // Update an existing patient
        await axios.put(`${apiurl}/api/patientsph/${selectedPatient.Patient_Id}`, data);
      } else {
        // Create a new patient
        await axios.post(`${apiurl}/api/patients`, data);
      }
  
      setSuccessMessageOpen(true);  // Show success message
      setNewPatientDialogOpen(false);  // Close the modal
  
    } catch (error) {
      setSuccessMessageOpen(false);
      if (error.response) {
        console.error('Error response from API:', error.response.data); // Log the error response
      } else {
        console.error('Error saving patient:', error); // Log general error
      }
    }
  };
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    };
  const handlePatientdobsearch =  async  event => {
    setPatientDob(event.target.value);
  
    try {
      const response = await axios.get(`${apiurl}/api/patientsdob?search=${event.target.value}`);
      setPatients(response.data);
    } catch (error) {
      console.error('Error searching patients:', error);
    }
  }
  const handleSuccessMessageClose = () => {
    setSuccessMessageOpen(false);
  };

  return (
    <div>
      <Box p={3}>
        <TextField
          label="Search or Enter Patient Name"
          InputLabelProps={{ shrink: true }}
          value={patientSearchTerm}
          onChange={handleSearch}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
      label="Date Of Birth"
      value={patientDob}
      style={{ marginLeft: '40px' }}
      onChange={handlePatientdobsearch}
      InputProps={{
        startAdornment: (
          <InputAdornment position="end">
            <DateRangeIcon />
          </InputAdornment>
        ),
      }}
    />

<hr style={{ width: '100%', color: '#18B7BE', backgroundColor: '#18B7BE', height: '1px', border: 'none' }} />
        
        {patientSearchTerm && patients.length > 0 && (
          <div>
            <h3 style={{ color: '#18B7BE', fontSize: '24px', display: 'inline-block' }}>Patient Details</h3>
          </div>
        )}
        
        {patientSearchTerm && patients.length === 0 && (
          <div>
            <h5 style={{ color: '#18B7BE', fontSize: '24px', display: 'inline-block' }}>Patient not found, create a new patient.</h5>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNewPatientDialogOpen}
              style={{ marginLeft: '10px', color: 'white', background: '#178CA4' }}
            >
              Add New Patient
            </Button>
          </div>
        )}

<List>
        {patients.map(patient => {
       return (
      <ListItem button onClick={() => handlePatientSelect(patient)}>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="patient details">
              <TableHead>
                <TableRow>
                  <TableCell>Surname</TableCell>
                  <TableCell>Given Name</TableCell>
                  <TableCell>Date of Birth</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {patient && patient.Patient_Id && (
                  <TableRow key={patient.Patient_Id}>
                    <TableCell>{patient.surname}</TableCell>
                    <TableCell>{patient.given_name}</TableCell>
                    <TableCell>{new Date(patient.dateofbirth).toLocaleDateString()}</TableCell>
                    <TableCell>{patient.phonenumber}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handlePatientedit(patient)}
                        variant="contained"
                        color="primary"
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          </ListItem>
    );
  })}
        </List>
      
      {selectedPatient && (
          <Box mt={2}>
            <Typography variant="h4" gutterBottom>
              {`${selectedPatient.given_name} ${selectedPatient.surname}`}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              DOB: {new Date(selectedPatient.dateofbirth).toLocaleDateString()} | Gender: {selectedPatient.gender} | Phone: {selectedPatient.phonenumber}
            </Typography>
            <Paper square style={{backgroundColor:'#18B7BE'}}>
              <Tabs value={tabValue} onChange={handleTabChange} centered sx={{  '& .MuiTab-root': { color: 'white' }, '& .Mui-selected': {color: '#072A40' }}}>
                <Tab label="Snapshot" />
                <Tab label="Encounters" />
                <Tab label="Charts" />
                <Tab label="Patient Reports" />
                <Tab label="Patient Billing" />
                <Tab label="Patient Profile" />
              </Tabs>
            </Paper>
            <Box mt={3}>
        {tabValue === 0 && <Snapshot />} 
        {tabValue === 1 && <Encounters />} 
        {tabValue === 2 && <Charts />} 
        {tabValue === 3 && <PatientReports />} 
        {tabValue === 4 && <PatientBilling />} 
        {tabValue === 5 && <MyProfile />} 
      </Box>
    </Box>
        )}
      </Box>

      {/* New/Edit Patient Dialog */}
      <Modal open={newPatientDialogOpen} onClose={handleNewPatientDialogClose}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', border: '2px solid #000', boxShadow: 24, p: 4 }}>
          <h2 style={{ marginLeft: '10px', color: '#005493', marginBottom: '20px' }}>{isEditing ? 'Edit Patient Details' : 'New Patient Details'}</h2>
          {emptyFields && (
            <p style={{ color: 'red', marginLeft: '20px', marginBottom: '20px' }}>
              Please fill in the following fields: {emptyFieldsList.join(", ")}
            </p>
          )}
          <TextField label="SurName" value={surName} onChange={e => setSurName(e.target.value)} style={{ marginLeft: '20px', marginBottom: '20px' }} />
          <TextField label="Given Name" value={name} onChange={e => setName(e.target.value)} style={{ marginLeft: '20px', marginBottom: '20px' }} />
          <TextField label="Phone Number" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} inputProps={{ maxLength: 10 }} style={{ marginLeft: '20px', marginBottom: '20px' }} />
          <TextField label="Date of Birth " InputLabelProps={{ shrink: true }} type="date" value={DateOfBirth} onChange={handleDOBChange} style={{ marginLeft: '20px', marginBottom: '20px' }} />
          <TextField label="Age" value={Age} disabled style={{ marginLeft: '20px', marginBottom: '20px' }} />
          <TextField select label="Gender" value={gender} onChange={e => setGender(e.target.value)} style={{ marginLeft: '20px', marginBottom: '20px', width: '200px' }}>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </TextField>
          <TextField label="Address" value={address} onChange={e => setAddress(e.target.value)} style={{ marginLeft: '20px', marginBottom: '20px' }} />
          <TextField label="City" value={city} onChange={e => setCity(e.target.value)} style={{ marginLeft: '20px', marginBottom: '20px' }} />
          <TextField label="Pin code" value={pinCode} onChange={e => setPinCode(e.target.value)} style={{ marginLeft: '20px', marginBottom: '20px' }} />
          <TextField label="State" value={state} onChange={e => setState(e.target.value)} style={{ marginLeft: '20px', marginBottom: '20px' }} />
          <TextField label="Allergies" value={Allergies} onChange={e => setAllergies(e.target.value)} style={{ marginLeft: '20px', marginBottom: '20px' }} />
          <Button onClick={handleSavePatient} style={{ marginLeft: '20px', color: 'white', background: '#178CA4', marginBottom: '20px' }}>{isEditing ? 'Save Changes' : 'Add Patient'}</Button>
          <Button onClick={handleNewPatientDialogClose} style={{ marginLeft: '20px', color: 'white', background: '#178CA4', marginBottom: '20px' }}>Close</Button>
        </div>
      </Modal>

      {/* Success Message Modal */}
      <Modal open={successMessageOpen} onClose={handleSuccessMessageClose}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', border: '2px solid #000', boxShadow: 24, padding: '20px', borderRadius: '10px' }}>
          <p>Patient successfully {isEditing ? 'updated' : 'added'}.</p>
          <Button onClick={handleSuccessMessageClose} style={{ backgroundColor: 'red', color: 'white' }}>Close</Button>
        </div>
      </Modal>
    </div>
  );
};

export default Patients;
