import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import DatePicker from 'react-datepicker';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-datepicker/dist/react-datepicker.css';
import { Grid, Typography, Box, Button, TextField, MenuItem, Select, FormControl, InputLabel , InputAdornment } from '@mui/material';
import axios from 'axios';
import { FaCalendarAlt } from 'react-icons/fa';
import Header from '../HomePage/login';
const locales = {
  'en-IN': require('date-fns/locale/en-IN'), // Using the Indian English locale
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [patientName, setPatientName] = useState('');
  const [reason, setReason] = useState('');

  useEffect(() => {
    // Fetch doctors from the backend
    axios.get('/api/doctors')
      .then(response => setDoctors(response.data))
      .catch(error => console.error('Error fetching doctors:', error));
  }, []);

  useEffect(() => {
    // Fetch existing appointments from the server
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/api/appointments');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const handleBookAppointment = async () => {
    // Logic to book an appointment
    const appointmentData = {
      doctorId: selectedDoctor,
      date: appointmentDate,
      patientName,
      reason,
      start: appointmentDate,
      end: appointmentDate,
    };

    try {
      const response = await axios.post('/api/bookAppointment', appointmentData);
      setAppointments([...appointments, response.data]);
      alert('Appointment booked successfully!');
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Error booking appointment. Please try again.');
    }
  };

  const generateTimes = () => {
    const times = [];
    for (let i = 8; i <= 20; i++) {
      times.push(new Date().setHours(i, 0));
      times.push(new Date().setHours(i, 30));
    }
    return times;
  };

  const now = new Date();
  const previousAppointments = appointments.filter(app => new Date(app.start) < now);
  const upcomingAppointments = appointments.filter(app => new Date(app.start) >= now);

  return (
    
    <Box >
        < Header />
      <Box elevation={3} style={{ padding: '2%', textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Book an Appointment
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Select Doctor</InputLabel>
              <Select
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
              >
                {doctors.map((doctor) => (
                  <MenuItem key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Patient Name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Reason for Appointment"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
          <div className="date-picker-container">
              <DatePicker
                selected={appointmentDate}
                onChange={(date) => setAppointmentDate(date)}
                showTimeSelect
                includeTimes={generateTimes()}
                dateFormat="dd-MM-yyyy h:mm aa"
                placeholderText="Select date and time"
                customInput={
                  <TextField
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <FaCalendarAlt />
                        </InputAdornment>
                      ),
                    }}
                  />
                }
              />
            </div>
          </Grid>
          <Grid item xs={8} sm={4} md={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleBookAppointment}
              fullWidth
              style={{ marginTop: '20%' , backgroundColor:'#20b2aa'}}
            >
              Book Appointment
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box style={{ padding: '20px', maxWidth: '1000px', margin: '50px auto' }}>
        <Typography variant="h5" gutterBottom style={{ color: '#000080', marginTop: '20px' }}>
          Previous Appointments
        </Typography>
        {previousAppointments.map((appointment, index) => (
          <Button
            key={index}
            variant="outlined"
            fullWidth
            style={{ margin: '10px 0' }}
          >
            <Typography variant="body1" style={{ textAlign: 'left', width: '100%' }}>
              Doctor: {appointment.doctorName} | Date: {new Date(appointment.start).toLocaleString()} | Patient: {appointment.patientName} | Reason: {appointment.reason}
            </Typography>
          </Button>
        ))}
      </Box>

      <Box style={{ padding: '20px', maxWidth: '1000px', margin: '50px auto' }}>
        <Typography variant="h5" gutterBottom style={{ color: '#000080', marginTop: '20px' }}>
          Upcoming Appointments
        </Typography>
        {upcomingAppointments.map((appointment, index) => (
          <Button
            key={index}
            variant="outlined"
            fullWidth
            style={{ margin: '10px 0' }}
          >
            <Typography variant="body1" style={{ textAlign: 'left', width: '100%' }}>
              Doctor: {appointment.doctorName} | Date: {new Date(appointment.start).toLocaleString()} | Patient: {appointment.patientName} | Reason: {appointment.reason}
            </Typography>
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default Appointment;
