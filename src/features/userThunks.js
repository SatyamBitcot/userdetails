import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/employees");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteUsers = createAsyncThunk(
  "user/deleteUsers",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`employee/delete/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addUser = createAsyncThunk(
  "user/addUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/employee/add", userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const editUser = createAsyncThunk(
    "user/editUser",
    async ({ id, userData }, thunkAPI) => {
      try {
        const response = await axiosInstance.put(`/employee/update/${id}`, userData);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
  

  export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (loginCredentials, thunkAPI) => {
      console.log('login credentials',loginCredentials)
      try {
        const response = await axiosInstance.post(`/employee/login`, loginCredentials);
        localStorage.setItem('token', response.data.token);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );