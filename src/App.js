import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/home';
import Signup from './pages/Auth/signup';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/signup' element={<Signup />} />
        {/* Add other routes as needed */}
      </Routes>
      </Router>
  );
}

export default App;
