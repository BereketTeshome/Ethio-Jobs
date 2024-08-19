import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Box, Button } from "@mui/material";
import Loading from "./Loading";
import { useDispatch } from "react-redux";
import { changeComponent } from "../features/Components";

const JobsDataGrid = () => {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const res = await axios.get("https://ethio-jobs.vercel.app/api/job/get");
      setJobs(res.data.job);
      setLoading(false);
    };
    fetchJobs();
  }, []);

  if (loading) {
    return <Loading />;
  }
  const handleDelete = async (id) => {
    await axios.delete(`https://ethio-jobs.vercel.app/api/job/delete/${id}`);
    window.location.reload();
  };

  const columns = [
    {
      field: "_id",
      headerName: "User ID",
      width: 150,
      editable: true,
      headerClassName: "datagrid-header",
    },
    {
      field: "jobName",
      headerName: "Job Name",
      width: 160,
      headerClassName: "datagrid-header",
    },
    {
      field: "category",
      headerName: "Category",
      width: 160,
      headerClassName: "datagrid-header",
    },
    {
      field: "jobSalary",
      headerName: "Salary",
      width: 130,
      headerClassName: "datagrid-header",
      renderCell: (params) => `$ ${params.row.jobSalary}`,
    },
    {
      field: "Actions",
      headerAlign: "center",
      headerClassName: "datagrid-header",
      width: 150,
      renderCell: (values) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "130px",
          }}
        >
          <Button
            onClick={() =>
              dispatch(
                changeComponent({
                  componentName: "editJob",
                  id: values.row._id,
                })
              )
            }
            style={{ color: "#00FF00" }}
          >
            <EditIcon />
          </Button>
          <Button color="error" onClick={() => handleDelete(values.row._id)}>
            <DeleteForeverIcon />
          </Button>
        </Box>
      ),
    },
  ];

  const data = jobs.map((job) => ({
    id: job._id,
    _id: job._id,
    jobName: job.title,
    category: job.category,
    jobSalary: job.salary,
  }));

  return (
    <div>
      <DataGrid
        sx={{ color: "white", fontSize: "0.8rem", background: "#023164" }}
        rows={data}
        columns={columns}
        slots={{ toolbar: GridToolbar }}
      />
    </div>
  );
};

export default JobsDataGrid;
