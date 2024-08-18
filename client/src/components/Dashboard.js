import React, { useEffect, useState } from "react";
import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";
import WorkOutlineTwoToneIcon from "@mui/icons-material/WorkOutlineTwoTone";
import CategoryTwoToneIcon from "@mui/icons-material/CategoryTwoTone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import axios from "axios";

const Dashboard = () => {
  const [jobs, setJobs] = useState("");
  const [users, setUsers] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      const jobs = await axios.get("https://ethio-jobs.vercel.app/api/job/get");
      setJobs(jobs.data.count);
      const users = await axios.get(
        "https://ethio-jobs.vercel.app/api/user/users"
      );
      setUsers(users.data.count);
    };
    fetchJobs();
  }, []);

  return (
    <div>
      <div className="dashboard">
        <div className="dashboard-main">
          <h1 style={{ padding: "2% 24%" }}>Dashboard</h1>

          <div className="sub-dashboard-main">
            <div className="dashboard-panel">
              <WorkOutlineTwoToneIcon className="dashboard-panel-icon" />
              <h3>{jobs}</h3>
              <span>Jobs</span>
            </div>
            <div className="dashboard-panel">
              <PeopleAltTwoToneIcon className="dashboard-panel-icon" />
              <h3>{users}</h3>
              <span>Users</span>
            </div>
            <div className="dashboard-panel">
              <CategoryTwoToneIcon className="dashboard-panel-icon" />
              <h3>3</h3>
              <span>Jobs Categories</span>
            </div>

            <div className="dashboard-panel">
              <LocationOnIcon className="dashboard-panel-icon" />
              <h3>8</h3>
              <span>Job Locations</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
