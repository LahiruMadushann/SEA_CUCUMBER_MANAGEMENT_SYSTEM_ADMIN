import React, { useState ,useContext} from "react";
import { Box, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "state/api";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { UserContext } from "../../UserContext";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Profile from "components/UserProfile";




const UserProfile = () =>{
  const userId = useSelector((state) => state.global.userId);
  const { data } = useGetUserQuery(userId);

  // console.log("data",data);
  // const { data, isLoading } = useGetAdminsQuery();
  // // console.log("data", data);
  // console.log(user._id)

  return (
    
    <Box m="1.5rem 2.5rem">
      <Profile
        user={data || {}} 
      />


    </Box>
  );
}
export default UserProfile;
