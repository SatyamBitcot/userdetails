
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser,fetchUsers } from "../features/userThunks";
import { useParams, useNavigate } from "react-router-dom";
import { Button, TextField, Box, Paper, Typography } from "@mui/material";

const EditUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { users } = useSelector((state) => state.user);
  const employees = users.employees;
  const existingUser = Array.isArray(employees) ? employees.find((user) => user._id === id) : null;
  console.log(users._id)
  console.log(id)
  const [formData, setFormData] = useState({
    name: existingUser?.name || "",
    email: existingUser?.email || "",
    password: existingUser?.password || "",
    city: existingUser?.city || "",
    phoneNumber: existingUser?.phoneNumber || "",
  });

  useEffect(() => {
    if (!existingUser) {
      navigate("/dashboard"); 
    }
  }, [existingUser, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editUser({ id, userData: formData })).then(() => {
      dispatch(fetchUsers())
      navigate("/dashboard");
    });
    
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Paper sx={{ padding: 4, width: "400px" }}>
        <Typography variant="h5" align="center" gutterBottom>Edit User</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="password"
          />
          <TextField
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Box mt={2} sx={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained" color="primary" type="submit">
              Update User
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default EditUser;
