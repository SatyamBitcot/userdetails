import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser, fetchUsers } from '../features/userThunks';
import { Button, TextField, Box, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    phoneNumber: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    const { name, email, city, phoneNumber, password } = formData;

    if (!name) newErrors.name = 'Name is required***';
    if (!email) newErrors.email = 'Email is required***';
    if (!password) newErrors.password = 'Password is required***';
    if (!city) newErrors.city = 'City is required***';
    if (!phoneNumber) newErrors.phoneNumber = 'Phone Number is required***';
    

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      dispatch(addUser(formData)).then(() => {
        dispatch(fetchUsers());
      });

      setFormData({
        name: '',
        email: '',
        city: '',
        phoneNumber: '',
        password: '',
      });
      navigate('/dashboard');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h5" align="center" sx={{ mb: 2 }}>
          Add Employee
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          <TextField
            label="City"
            name="city"
            fullWidth
            margin="normal"
            value={formData.city}
            onChange={handleChange}
            error={!!errors.city}
            helperText={errors.city}
          />
          <TextField
            label="Phone Number"
            name="phoneNumber"
            fullWidth
            margin="normal"
            value={formData.phoneNumber}
            onChange={handleChange}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Employee
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AddEmployee;
