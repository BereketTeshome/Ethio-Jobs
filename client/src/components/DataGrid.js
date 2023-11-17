import React, { useEffect, useState } from 'react'
import {DataGrid, GridToolbar} from '@mui/x-data-grid'
import axios from 'axios';
import moment from 'moment'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Loading from './Loading';

const Grid = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    
    
    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true)
            const res = await axios.get("https://ethio-jobs.vercel.app/api/user/users")
            setUsers(res.data.users)
            setLoading(false)
      }
      fetchUsers()
    }, [])

    if (loading) {
        return <Loading />
    }

    const handleDelete =async (id) => {
        await axios.delete(`https://ethio-jobs.vercel.app/api/user/delete/${id}`)
        window.location.reload()
    }
    
    const columns = [
        {field: "_id", headerName: "User ID", width: 150, editable: true,headerClassName: 'datagrid-header'},
        {field: "email", headerName: "Email", width: 180, headerClassName: 'datagrid-header'},
        {field: "createdAt", headerName: "Created Date",headerClassName: 'datagrid-header', width: 170, renderCell:(params) => (
            moment(params.row.createdAt).format('YYYY-MM-DD HH:MM:SS')
        )},
        {field:"userStatus", headerName:'User Status', width:110, headerClassName: 'datagrid-header', renderCell:(params)=>(
            params.row.userStatus==="true" ? 'Admin' : 'User'
        )},
        {
            field: "Actions",
            headerAlign: 'center',
            headerClassName: 'datagrid-header',
            width: 150,
            renderCell: (values) => (
                <Box sx={{ display: "flex", justifyContent: "space-evenly", width: "130px" }}>
                    <Button><Link style={{ color: "#00ff00", position:'relative', top:'3px'}} to={`/admin/user/edit/${values.row._id}`}> <EditIcon /> </Link> </Button>
                    <Button color='error' onClick={()=> handleDelete(values.row._id)}> <DeleteForeverIcon /> </Button>
                </Box>
            )
        }       
    ]
    
    const rows = users.map((user) => ({
        id: user._id,
        _id: user._id,
        email: user.email,
        createdAt: user.createdAt,
        userStatus: user.isAdmin
    }))


    return (
        <div>
      <DataGrid 
        sx={{color:'white', fontSize:'0.8rem', background:'#023164'}}
        rows={rows}
        columns={columns}
        pageSize={[2]}
        rowsPerPageOptions={[2]}
        // pageSizeOptions={[1,2,5]}
        slots={{toolbar: GridToolbar}}
      />
    </div>
  )
}

export default Grid
