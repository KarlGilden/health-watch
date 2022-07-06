import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import Login from './Pages/Login';
import PatientDashboard from "./Pages/PatientDashboard";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
          <Route path="/patientDashboard" element={<PatientDashboard/>}/>
            <Route path="/" element={<Login/>}/>
          </Routes>
        </div>
      </Router>

    </div>
  );
}

export default App;