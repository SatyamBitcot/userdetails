import './App.css';
import AddEmployee from './pages/AddEmployee';
import Dashboard from './pages/Dashboard';
import EditUser from './pages/EditEmployee';
import Login from './pages/Login';
import PrivateLayout from './components/Layout/privatelayout';
import PublicLayout from './components/Layout/publiclayout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';

function App() {
 
  
  return (
    <Router>
      <Routes>
      
      
          <Route element={<PublicLayout />}>
            <Route path='/' element={<Login />} />
          </Route>
      
          <Route element={<PrivateLayout />}>
        
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/add' element={<AddEmployee />} />
            <Route path='/edit/:id' element={<EditUser />} />
          </Route>
       
      </Routes>
    </Router>
  );
}

export default App;
