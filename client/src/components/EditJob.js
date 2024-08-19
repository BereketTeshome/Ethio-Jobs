import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";

const EditJob = () => {
  const id = useSelector((state) => state.component.value.id);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      salary: "",
      location: "",
      category: "",
      jobType: "",
      jobDuration: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      salary: Yup.string().required("Required"),
      location: Yup.string().required("Required"),
      category: Yup.string().required("required"),
      jobType: Yup.string().required("Required"),
      jobDuration: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://ethio-jobs.vercel.app/api/job/edit/${id}`,
        formik.values
      );
      toast.success("JOB UPDATED!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login">
      <div className="create-job-container">
        <div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h3 style={{ fontSize: "1.7rem", color: "white" }}>
              <span style={{ color: "#011E3D" }}>Edit</span> Job
            </h3>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div className="register-input-container">
              <label htmlFor="title">Title </label>
              <input
                type="text"
                name="title"
                style={
                  formik.touched.title && formik.errors.title
                    ? { border: "2px solid red", outline: "none" }
                    : { outline: "none" }
                }
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.title && formik.errors.title ? (
                <p>{formik.errors.title}</p>
              ) : null}

              <label htmlFor="description">Description </label>
              <div>
                <textarea
                  cols="70"
                  rows="5"
                  type="textarea"
                  name="description"
                  style={
                    formik.touched.description && formik.errors.description
                      ? { border: "2px solid red", outline: "none" }
                      : { outline: "none" }
                  }
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="create-job-textarea"
                />
              </div>
              {formik.touched.description && formik.errors.description ? (
                <p>{formik.errors.description}</p>
              ) : null}

              <label htmlFor="salary">Salary </label>
              <input
                type="text"
                name="salary"
                style={
                  formik.touched.salary && formik.errors.salary
                    ? { border: "2px solid red", outline: "none" }
                    : { outline: "none" }
                }
                value={formik.values.salary}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.salary && formik.errors.salary ? (
                <p>{formik.errors.salary}</p>
              ) : null}

              <div className="create-job-up">
                <label htmlFor="location">Location</label>
                <select
                  value={formik.values.location}
                  name="location"
                  onChange={formik.handleChange}
                  className="create-user-select"
                >
                  <option value=""></option>
                  <option value="Addis Ababa">Addis Ababa</option>
                  <option value="Dire Dawa">Dire Dawa</option>
                  <option value="Gondar">Gondar</option>
                  <option value="Mekelle">Mekelle</option>
                  <option value="Bahir Dar">Bahir Dar</option>
                  <option value="Jimma">Jimma</option>
                  <option value="Gambella">Gambella</option>
                  <option value="Harar">Harar</option>
                </select>
                {formik.touched.location && formik.errors.location ? (
                  <p>{formik.errors.location}</p>
                ) : null}

                <label htmlFor="category">Category</label>
                <select
                  value={formik.values.category}
                  name="category"
                  onChange={formik.handleChange}
                  className="create-user-select"
                >
                  <option name="All" value="All"></option>
                  <option name="frontend" value="frontend">
                    frontend
                  </option>
                  <option name="backend" value="backend">
                    backend
                  </option>
                  <option name="fullstack" value="fullstack">
                    fullstack
                  </option>
                </select>
                {formik.touched.category && formik.errors.category ? (
                  <p>{formik.errors.category}</p>
                ) : null}
              </div>

              <div className="create-job-up">
                <label htmlFor="jobType">JobType</label>
                <select
                  value={formik.values.jobType}
                  name="jobType"
                  onChange={formik.handleChange}
                  className="create-user-select"
                >
                  <option name="" value=""></option>
                  <option name="remote" value="remote">
                    remote
                  </option>
                  <option name="non-remote" value="non-remote">
                    non-remote
                  </option>
                </select>
                {formik.touched.jobType && formik.errors.jobType ? (
                  <p>{formik.errors.jobType}</p>
                ) : null}

                <label htmlFor="jobDuration">JobDuration</label>
                <select
                  value={formik.values.jobDuration}
                  name="jobDuration"
                  onChange={formik.handleChange}
                  className="create-user-select"
                >
                  <option name="" value=""></option>
                  <option name="Short-Term" value="Short-Term">
                    Short-Term
                  </option>
                  <option name="Long-Term" value="Long-Term">
                    Long-Term
                  </option>
                </select>
                {formik.touched.jobDuration && formik.errors.jobDuration ? (
                  <p>{formik.errors.jobDuration}</p>
                ) : null}
              </div>

              <button
                type="submit"
                onClick={(e) => handleSubmit(e)}
                className="register-container-btn"
                disabled={!(formik.isValid && formik.dirty)}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditJob;
