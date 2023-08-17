import React, { useState } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { useGetCustomersQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const RemoveFarmers = () => {
  const theme = useTheme();
  const [data, setData] = useState([]); // Initialize data state
  const { data: customersData, isLoading } = useGetCustomersQuery();


  React.useEffect(() => {
    if (customersData) {
      setData(customersData);
    }
  }, [customersData]);


  const handleDeleteRow = async (rowId) => {
    const isConfirmed = window.confirm("Are You Sure You Want To Delete This User?");
  if (!isConfirmed) {
    return;
  }else{
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
    {
        field: "actions",
        headerName: "Delete Farmer",
        flex: 0.5,
        renderCell: (params) => (
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
      <Header title="REMOVE FARMERS" subtitle="List of Farmers" />
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
          rows={data || []}
          columns={columns}
        />
        
      </Box>
    </Box>
  );
};

export default RemoveFarmers;
