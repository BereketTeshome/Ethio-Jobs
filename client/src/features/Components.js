import { createSlice } from "@reduxjs/toolkit";
import Dashboard from "../components/Dashboard";
import Users from "../components/Users";
import Jobs from "../components/Jobs";

const initialValue = <Jobs />;

export const componentSlice = createSlice({
  name: "component",
  initialState: { value: initialValue },
  reducers: {
    changeComponent: (state, action) => {
      if (action.payload === "dashboard") {
        state.value = <Dashboard />;
      } else if (action.payload === "users") {
        state.value = <Users />;
      } else {
        state.value = <Jobs />;
      }
    },
  },
});

export const { changeComponent } = componentSlice.actions;

export default componentSlice.reducer;
