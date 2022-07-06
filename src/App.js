import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import Login from './Pages/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/login" element={<Login/>}/>
          </Routes>
        </div>
      </Router>

    </div>
  );
}

export default App;