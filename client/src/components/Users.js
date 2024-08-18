import React from "react";
import { Link } from "react-router-dom";

import Grid from "./DataGrid";
import { ToastContainer } from "react-toastify";

const Users = () => {
  return (
    <div>
      <div className="dashboard">
        <div className="dashboard-main">
          <h1 style={{ padding: "2% 24%" }}>Users</h1>
          <Link to={"/admin/users/create"}>
            <button className="create-user-btn">+ CREATE USER</button>
          </Link>
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
