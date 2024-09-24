import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from "../features/UserSlice";
import { Typography } from '@mui/material';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleLogout=()=>{
        dispatch(logout());
    navigate("/");
    }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark" style={{display:'flex' , justifyContent:'space-around'}}>
      <Typography variant="h3" align="center" sx={{ color: "white"}}>
          User Dashboard
        </Typography>
   <button className='btn btn-danger' onClick={handleLogout} ><LogoutIcon/>Logout</button>
</nav>
    </div>
  )
}

export default Navbar
