import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import Pagination from "./Pagination";
import Span from "./Span";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Section = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(2);
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://ethio-jobs.vercel.app/api/job/${
            category ? `getJob?category=${category}` : "get"
          }`
        );
        setJobs(res.data.job);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [category]);

  if (loading) {
    return <Loading />;
  }

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = jobs.slice(firstPostIndex, lastPostIndex);
  const token = localStorage.getItem("token");

  return (
    <section className="section">
      <div className="section-left">
        <div className="filter-container">
          <div className="section-category">
            <p>Filter job by:</p>
            <fieldset>
              <legend>category</legend>
              <select
                name="category"
                id=""
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">All</option>
                <option value="frontend">frontend</option>
                <option value="backend">backend</option>
                <option value="fullstack">fullstack</option>
              </select>
            </fieldset>
          </div>
          <div className="section-location">
            <p>Filter job by location</p>
            <Link to="/location/Addis Ababa" style={{ textDecoration: "none" }}>
              <li>
                <Span /> <span>Addis Ababa</span>
              </li>
            </Link>
            <Link to="/location/Dire Dawa" style={{ textDecoration: "none" }}>
              <li>
                <Span />
                <span>Dire Dawa</span>
              </li>
            </Link>
            <Link to="/location/Gondar" style={{ textDecoration: "none" }}>
              <li>
                <Span /> <span>Gondar</span>
              </li>
            </Link>
            <Link to="/location/Mekelle" style={{ textDecoration: "none" }}>
              <li>
                <Span /> <span>Mekelle</span>
              </li>
            </Link>
            <Link to="/location/Bahir Dar" style={{ textDecoration: "none" }}>
              <li>
                <Span /> <span>Bahir Dar</span>
              </li>
            </Link>
            <Link to="/location/Jimma" style={{ textDecoration: "none" }}>
              <li>
                <Span /> <span>Jimma</span>
              </li>
            </Link>
            <Link to="/location/Gambella" style={{ textDecoration: "none" }}>
              <li>
                <Span /> <span>Gambella</span>
              </li>
            </Link>
            <Link to="/location/Harar" style={{ textDecoration: "none" }}>
              <li>
                <Span /> <span>Harar</span>
              </li>
            </Link>
          </div>
        </div>
      </div>

      <div className="section-right">
        {currentPost.map((job) => {
          const { _id, title, description, jobType, category } = job;
          return (
            <div className="jobs" key={_id}>
              <p style={{ color: "#2996F0", fontSize: "0.9rem" }}>
                <LocationOnIcon
                  fontSize="very small"
                  style={{ position: "relative", top: "1px", color: "#2996F0" }}
                />{" "}
                {jobType}
              </p>
              <h2>{title}</h2>
              <span>{category}</span>
              <h5>
                <b>Description</b>: {description.substring(0, 70)}...
              </h5>
              <a href={token ? `/job/${_id}` : "/login"}>
                <button>+ More Details</button>
              </a>
            </div>
          );
        })}
        <Pagination
          totalPost={jobs.length}
          postPerPage={postPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          category={category}
        />
      </div>
      <ToastContainer />
    </section>
  );
};

export default Section;
