import Swal from "sweetalert2";
import {
  fetchUsers,
  deleteUsers,
  addUser,
  editUser,
  loginUser,
} from "../features/userThunks";

export const fetchUsersCases = (builder) => {
  builder
    .addCase(fetchUsers.pending, (state) => {
      state.loader = true;
      state.status = "loading";
    })
    .addCase(fetchUsers.fulfilled, (state, action) => {
      state.loader = false;
      state.status = "succeeded";
      state.users = action.payload || [];
      console.log(state.users);
    })
    .addCase(fetchUsers.rejected, (state, action) => {
      state.loader = false;
      state.status = "failed";
      state.error = action.payload;
    });
};

export const deleteUsersCases = (builder) => {
  builder
    .addCase(deleteUsers.pending, (state) => {
      state.loader = true;
    })
    .addCase(deleteUsers.fulfilled, (state, action) => {
      state.loader = false;

      if (Array.isArray(state.users.employees)) {
        state.users.employees = state.users.employees.filter(
          (user) => user._id !== action.payload.id
        );
      }

      Swal.fire({
        icon: "success",
        title: "User deleted successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    })
    .addCase(deleteUsers.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload;

      Swal.fire({
        icon: "error",
        title: "Failed to delete user",
        text: action.payload || "An error occurred",
      });
    });
};

export const addUserCases = (builder) => {
  builder
    .addCase(addUser.pending, (state) => {
      state.loader = true;
    })
    .addCase(addUser.fulfilled, (state, action) => {
      state.loader = false;
      state.users.employees.push(action.payload);
      Swal.fire({
        icon: "success",
        title: "Employee added successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    })
    .addCase(addUser.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload;

      Swal.fire({
        icon: "error",
        title: "Failed to add employee",
        text: action.payload || "An error occurred",
      });
    });
};

export const editUserCases = (builder) => {
  builder
    .addCase(editUser.pending, (state) => {
      state.loader = true;
    })
    .addCase(editUser.fulfilled, (state, action) => {
      console.log(action.payload);

      state.loader = false;
      const updatedUser = action.payload;
      const index = state.users.employees.findIndex(
        (user) => user._id === updatedUser._id
      );
      if (index !== -1) {
        state.users.employees[index] = updatedUser;
      }
      Swal.fire({
        icon: "success",
        title: "User updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    })
    .addCase(editUser.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload;
      Swal.fire({
        icon: "error",
        title: "Failed to update user",
        text: action.payload || "An error occurred",
      });
    });
};

export const loginUserCases = (builder) => {
  builder
    .addCase(loginUser.pending, (state) => {
      state.loader = true;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      console.log(action.payload);
      state.token = action.payload.token;
      state.loader = false;

      Swal.fire({
        icon: "success",
        title: "Login User successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload;
      Swal.fire({
        icon: "error",
        title: "Failed to Login user",
        text: action.payload || "An error occurred",
      });
    });
};
