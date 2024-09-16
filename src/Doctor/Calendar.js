import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [date, setDate] = useState('');
  useEffect(() => {
    // Fetch appointments from API
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3010/api/appointments');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const handleSelectEvent = (appointment) => {
    setSelectedAppointment(appointment);
    setOpenDialog(true);
  };

  const handleCancelAppointment = async () => {
    try {
      await axios.delete(`http://127.0.0.1:3010/api/appointments/${selectedAppointment.id}`);
      setAppointments(appointments.filter((appt) => appt.id !== selectedAppointment.id));
      setOpenDialog(false);
      setSelectedAppointment(null);
      alert('Appointment canceled successfully');
    } catch (error) {
      console.error('Error canceling appointment:', error);
      alert('Error canceling appointment. Please try again.');
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedAppointment(null);
  };

  return (
    <div>
           <Box p={3}>
        
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Calendar
            localizer={localizer}
            events={appointments}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            onSelectEvent={handleSelectEvent}
          />
        </Paper>
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Appointment Details</DialogTitle>
        <DialogContent>
          {selectedAppointment && (
            <>
              <Typography variant="body1">Doctor: {selectedAppointment.doctorName}</Typography>
              <Typography variant="body1">Date: {new Date(selectedAppointment.start).toLocaleString()}</Typography>
              <Typography variant="body1">Patient: {selectedAppointment.patientName}</Typography>
              <Typography variant="body1">Reason: {selectedAppointment.reason}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Close</Button>
          <Button onClick={handleCancelAppointment} color="secondary">Cancel Appointment</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Appointments;
