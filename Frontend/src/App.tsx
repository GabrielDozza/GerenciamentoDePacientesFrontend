import { Routes, Route } from "react-router-dom";

import { Dashboard } from "./pages/Dashboard";
import { Patients } from "./pages/Patients";
import { PatientDetails } from "./pages/PatientDetails";
import { NewPatient } from "./pages/NewPatient";
import { EditPatient } from "./pages/EditPatient";
import { NewEvent } from "./pages/NewEvent";
import { NewEvolution } from "./pages/NewEvolution";
import { Login } from "./pages/Login";
import { Agenda } from "./pages/Agenda";
import { Evolutions } from "./pages/Evolutions";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/patients" element={<Patients />} />
      <Route path="/patient-details" element={<PatientDetails />} />
      <Route path="/new-patient" element={<NewPatient />} />
      <Route path="/edit-patient" element={<EditPatient />} />
      <Route path="/new-event" element={<NewEvent />} />
      <Route path="/evolutions" element={<Evolutions />} />
      <Route path="/new-evolution" element={<NewEvolution />} />
      <Route path="/agenda" element={<Agenda />} />
    </Routes>
  );
}

export default App;
