import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import PatientDashboard from './Pages/PatientDashboard.js';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/patientDashboard" element={<PatientDashboard/>}/>
          </Routes>
        </div>
      </Router>

    </div>
  );
}

export default App;
