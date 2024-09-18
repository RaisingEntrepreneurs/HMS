import AdminPage from "./AdminPage/adminMain";
import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Doctorhome from "./Doctor/Doctorhome";
import Dashboard from "./Doctor/Dashboard";
import Patients from "./Doctor/Patients";
import Appointments from "./Doctor/Calendar";
import Billing from "./Doctor/Billing";
import Todo from "./Doctor/Todo";
import Reports from "./Doctor/Reports";
import PatientPage from "./Patients/Patienthome";
import Appointment from "./Patients/Appointment";
import MyProfile from "./Patients/MyProfile";
import Document from "./Patients/Medical_Report";
import DoctorPrescription from "./Patients/Prescription";
import NurseTasks from "./Nurse/todo_list";
import Nursehome from "./Nurse/nursehome";
import Encounters from "./Doctor/encounter";
import Charts from "./Doctor/charts";
import PatientBilling from "./Doctor/patientbilling";
import PatientReports from "./Doctor/patientreports";
import Snapshot from "./Doctor/snapshot";
import HomePage from "./HomePage/home";
import Forntdeskhome from "./front_desk/fdhome";
function Vaidhya() {
  return (
    <Router>
      <Routes>
       {/*home page */}
       <Route path="/home" element={<HomePage />} />
        {/* Patient-related routes */}
        <Route path="/patientpage" element={<PatientPage />} /> 
        <Route path="appointment" element={<Appointment />} />
        <Route path="myprofile" element={<MyProfile />} />
        <Route path="document" element={<Document />} />
        <Route path="doctorprescription" element={<DoctorPrescription />} />

        {/* Doctor-related routes */}
        <Route path="/Doctorhome" element={<Doctorhome />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="patients" element={<Patients />} />
          <Route path="billing" element={<Billing />} />
          <Route path="calendar" element={<Appointments />} />
          <Route path="todo" element={<Todo />} />
          <Route path="reports" element={<Reports />} />
          <Route path="encounter" element={<Encounters />} />
          <Route path="charts" element={<Charts />} />
          <Route path="patientbilling" element={<PatientBilling />} />
          <Route path="patientreports" element={<PatientReports />} />
          <Route path="snapshot" element={<Snapshot />} />
        </Route>

        {/* Nurse-related routes */}
        <Route path="/nursehome" element={<Nursehome />}>
          <Route path="nursetask" element={<NurseTasks />} />
        </Route>
        {/*front desk routes*/}
        <Route path="/frontdeskhome" element={<Forntdeskhome />} />
        {/* Admin routes can be added similarly */}
        <Route path="/adminpage" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

ReactDOM.render(<Vaidhya />, document.getElementById("root"));
