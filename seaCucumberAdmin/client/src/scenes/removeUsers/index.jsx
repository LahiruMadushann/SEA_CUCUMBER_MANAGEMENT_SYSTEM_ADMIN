import React, { useState } from "react";
import { Box, Button, useTheme, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useGetAllUsersQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const RemoveUsers = () => {
  const theme = useTheme();
  const [data, setData] = useState([]); // Initialize data state
  const { data: allData, isLoading } = useGetAllUsersQuery();
  const [selectedRole, setSelectedRole] = useState("");


  React.useEffect(() => {
    if (allData) {
      setData(allData);
    }
  }, [allData]);

  const handleUpdateRow = (rowId) => {
    // You can navigate to the update user page or open a modal here
    // For example:
    // history.push(`/update-user/${rowId}`);
    // or
    // setEditingUserId(rowId); // To manage the state of the user being edited
  };
  const handleDeleteRow = async (rowId) => {
    const isConfirmed = window.confirm("Are You Sure You Want To Delete This User?");
    if (!isConfirmed) {
      return;
    } else {
      try {
        // Make an API call to delete the row using the rowId
        console.log("Deleting row with ID:", rowId);
        await axios.delete(`http://localhost:5001/general/deleteFarmer/${rowId}`);

        // Refresh the data after deletion (optional)
        refetchData();

        console.log(`Deleted row with ID: ${rowId}`);
      } catch (error) {
        console.error("Error deleting row:", error);
      }
    }
  };

  console.log("data", data);
  const refetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5001/client/customers");
      setData(response.data); // Update the data state with the new data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.4,
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
    // {
    //   field: "update",
    //   headerName: "Update Farmer",
    //   flex: 0.5,
    //   renderCell: (params) => (

    //   <Button
    //     variant="outlined"
    //     color="primary"
    //     onClick={() => handleUpdateRow(params.row._id)}
    //   >
    //     Update
    //   </Button>


    //   ),
    // },
    {
      field: "actions",
      headerName: "Delete Farmer",
      flex: 0.5,
      renderCell: (params) => (

        // <Button
        //   variant="outlined"
        //   color="primary"
        //   onClick={() => handleUpdateRow(params.row._id)}
        // >
        //   Update
        // </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => handleDeleteRow(params.row._id)}
        >
          Delete
        </Button>

      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">

      <Header title="REMOVE USERS" subtitle="List of Users" />
      <Box style={{marginTop:"5vh"}}>
        <FormControl variant="outlined" sx={{ minWidth: 200 }}>
          <InputLabel>Select User Role</InputLabel>
          <Select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            label="Select User Role"
          >
            <MenuItem value=""><em>All Roles</em></MenuItem>
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
           
          </Select>
        </FormControl>
      </Box>
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(selectedRole ? data.filter(user => user.role === selectedRole) : data) || []}
          columns={columns}
        />

      </Box>
    </Box>
  );
};

export default RemoveUsers;
