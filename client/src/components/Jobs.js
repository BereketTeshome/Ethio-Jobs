import React from "react";
import { useDispatch } from "react-redux";
import { changeComponent } from "../features/Components";
import JobsDataGrid from "./JobsDataGrid";
import { ToastContainer } from "react-toastify";

const Jobs = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <div className="dashboard">
        <div className="dashboard-main">
          <h1 style={{ padding: "2% 24%" }}>Jobs</h1>

          <button
            className="create-user-btn"
            onClick={() => dispatch(changeComponent("createJob"))}
          >
            + CREATE JOB
          </button>
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
