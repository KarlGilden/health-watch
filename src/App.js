import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import Login from './Pages/Login';
import AuthProvider from "./context/AuthContext";
import PatientDashboard from './Pages/PatientDashboard.js';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<PatientDashboard/>}/>
          </Routes>
        </AuthProvider>
      </Router>

    </div>
  );
}

export default App;