import React, { useState ,useContext} from "react";
import { Box, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "state/api";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { UserContext } from "../../UserContext";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import RegisterUsers from "components/RegisterUsers";





const RegisterManagementUsers = () =>{

  return (
    
    <Box m="1.5rem 2.5rem">
        <RegisterUsers  />
      


    </Box>
  );
}
export default RegisterManagementUsers;
