import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUsers } from "../features/userThunks";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users, status, loader } = useSelector((state) => state.user);
  const employees = users.employees;

  const handleEdit = (user) => {
    navigate(`/edit/${user.id}`);
  };

  const handleAdd = () => {
    navigate("/add");
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUsers(id)).then(() => {
          dispatch(fetchUsers());
        });
      }
    });
  };

  

  React.useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  const rows =
    employees
      ?.map((employee) => ({
        id: employee._id || employee.id,
        name: employee.name,
        email: employee.email,
        password: employee.password,
        city: employee.city,
        phoneNumber: employee.phoneNumber,
      }))
      .filter((employee) => employee.id) || [];

  const paginationModel = { page: 0, pageSize: 5 };

  const columns = [
    { field: "id", headerName: "ID", width: 230 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "password", headerName: "Password", width: 100 },
    { field: "city", headerName: "City", width: 130 },
    { field: "phoneNumber", headerName: "Phone No", width: 150 },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <>
          <button
             className="btn btn-primary"
            onClick={() => handleEdit(params.row)}
          >
          <EditIcon/>
          </button>
          &nbsp;&nbsp;
          <button
          
            onClick={() => handleDelete(params.row.id)}
            style={{ marginLeft: 8 }}
            className="btn btn-danger"
          >
           <DeleteIcon/>
          </button>
        </>
      ),
    },
  ];

  if (loader) {
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1300,
        }}
      >
        <CircularProgress size={70} />
      </Box>
    );
  }

  return (
    <>
      <div
        className="d-flex justify-content-center gap-5"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        
        <div>
          <Button
            variant="contained"
            onClick={handleAdd}
            sx={{ mt: 5, bgcolor: "#6439FF" }}
          > <AddCircleIcon/>
            Add Employee
          </Button>
        </div>
        
      </div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        <Paper
          sx={{ height: 400,  borderRadius: 2, boxShadow: 3 }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.id}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            sx={{ border: 0 }}
          />
        </Paper>
      </Box>
    </>
  );
}
