import { createSlice } from "@reduxjs/toolkit";
import Dashboard from "../components/Dashboard";
import Users from "../components/Users";
import Jobs from "../components/Jobs";
import CreateJob from "../components/CreateJob";
import CreateUser from "../components/CreateUser";
import EditJob from "../components/EditJob";
import EditUser from "../components/EditUser";

const initialValue = { component: <Dashboard />, id: null };

export const componentSlice = createSlice({
  name: "component",
  initialState: { value: initialValue },
  reducers: {
    changeComponent: (state, action) => {
      const { componentName, id } = action.payload;
      if (componentName === "dashboard") {
        state.value = initialValue;
      } else if (componentName === "users") {
        state.value = { component: <Users />, id: null };
      } else if (componentName === "jobs") {
        state.value = { component: <Jobs />, id: null };
      } else if (componentName === "createJob") {
        state.value = { component: <CreateJob />, id: null };
      } else if (componentName === "createUser") {
        state.value = { component: <CreateUser />, id: null };
      } else if (componentName === "editJob") {
        state.value = { component: <EditJob />, id };
      } else if (componentName === "editUser") {
        state.value = { component: <EditUser />, id };
      } else {
        state.value = initialValue;
      }
    },
  },
});

export const { changeComponent } = componentSlice.actions;

export default componentSlice.reducer;
