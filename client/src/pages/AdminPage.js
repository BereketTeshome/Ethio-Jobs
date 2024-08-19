import React, { useState } from "react";
import { Link } from "react-router-dom";
import LOGO from "../Images/logo.png";
import AdminLogo from "../Images/Admin.png";
import DashboardTwoToneIcon from "@mui/icons-material/DashboardTwoTone";
import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";
import WorkOutlineTwoToneIcon from "@mui/icons-material/WorkOutlineTwoTone";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { changeComponent } from "../features/Components";
import { ToastContainer } from "react-toastify";

const AdminPage = () => {
  const dispatch = useDispatch();
  const [slide, setSlide] = useState(false);
  const currentComponent = useSelector((state) => state.component.value);
  return (
    <div>
      <div className="navbar" style={{ background: "#011E3D" }}>
        <Link to="/">
          <img src={LOGO} alt="logo" />
        </Link>
      </div>

      <div className="dashboard">
        <div
          className="dashboard-sidebar"
          style={{ width: slide ? "300px" : "80px" }}
        >
          <button onClick={() => setSlide(!slide)} className="menu-icon">
            <MenuIcon />
          </button>
          <img
            src={AdminLogo}
            alt="admin logo"
            style={{ position: "relative", left: slide ? "0px" : "-33px" }}
          />
          <div
            onClick={() =>
              dispatch(changeComponent({ componentName: "dashboard" }))
            }
          >
            <DashboardTwoToneIcon className="dashboard-icon" />{" "}
            <span style={{ display: slide ? "block" : "none" }}>Dashboard</span>
          </div>

          <div
            onClick={() =>
              dispatch(changeComponent({ componentName: "users" }))
            }
          >
            <PeopleAltTwoToneIcon className="dashboard-icon" />{" "}
            <span style={{ display: slide ? "block" : "none" }}>Users</span>
          </div>

          <div
            onClick={() => dispatch(changeComponent({ componentName: "jobs" }))}
          >
            <WorkOutlineTwoToneIcon className="dashboard-icon" />{" "}
            <span style={{ display: slide ? "block" : "none" }}>Jobs</span>
          </div>
        </div>

        <div>{currentComponent.component}</div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminPage;
