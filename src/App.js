import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import Login from './Pages/Login';
import AuthProvider from "./context/AuthContext";
import PatientDashboard from './Pages/PatientDashboard.js';
import PrivateRoute from "./Components/PrivateRoute";
import UnauthedRoute from "./Components/UnauthedRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route element={<UnauthedRoute/>}>
              <Route path="/" element={<Login/>}/>
            </Route>
            <Route element={<PrivateRoute/>}>
              <Route path="/dashboard" element={<PatientDashboard/>}/>
            </Route>
          </Routes>
        </AuthProvider>
      </Router>

    </div>
  );
}

export default App;