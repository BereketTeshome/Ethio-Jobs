import React from "react";

import Grid from "./DataGrid";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { changeComponent } from "../features/Components";

const Users = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <div className="dashboard">
        <div className="dashboard-main">
          <h1 style={{ padding: "2% 24%" }}>Users</h1>

          <button
            className="create-user-btn"
            onClick={() => dispatch(changeComponent("createUser"))}
          >
            + CREATE USER
          </button>
          <div className="users-container">
            <Grid />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Users;
