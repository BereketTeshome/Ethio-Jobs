import React from "react";
import { Link } from "react-router-dom";

import JobsDataGrid from "./JobsDataGrid";
import { ToastContainer } from "react-toastify";

const Jobs = () => {
  return (
    <div>
      <div className="dashboard">
        <div className="dashboard-main">
          <h1 style={{ padding: "2% 24%" }}>Jobs</h1>

          <Link to="/admin/jobs/create">
            <button className="create-user-btn">+ CREATE JOB</button>
          </Link>
          <div className="sub-dashboard-main">
            <JobsDataGrid />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Jobs;
