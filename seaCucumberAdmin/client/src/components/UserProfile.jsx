import axios from "axios";
import React from "react";
import { useGetAdminsQuery } from "state/api";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../UserContext";
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { useTheme } from "@mui/material";
import Swal from "sweetalert2";


import Profile from "./Profile";

const UserProfile = ({ user = {} }) => {
    const navigate = useNavigate();

    console.log(user)


    const { pathname } = useLocation();
    const [userName, setUserName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState(user.password);
    const [city, setCity] = useState(user.city);
    const [country, setCountry] = useState(user.country);
    const [occupation, setOccupation] = useState(user.occupation);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const [redirect, setRedirect] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { setUser } = useContext(UserContext);
    const theme = useTheme();

    const defaultTheme = createTheme();
    async function handleLoginSubmit(e) {
        e.preventDefault();

        navigate('/userProfileEdit');


    }

    async function back(e) {
        e.preventDefault();
        
        const { isConfirmed } = await Swal.fire({
            title: "Are you sure?",
            text: "Are you want go back to the dashboard?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3644C5",
            confirmButtonText: "Yes",
            cancelButtonText: "No"
          });
      
          if (!isConfirmed) {
            return;
          }
            try {
                navigate('/dashboard');
            } catch (error) {
              console.error("Error Going Back");
            }
          
    }


    return (
        
            <ThemeProvider theme={defaultTheme} >
                {/* <Paper elevation={3} sx={{ margin: "2rem", padding: "2rem" }}> */}
                <Box
                    sx={{
                        width: '1642.4580168846821px',
                        height: '1208.7139954549539px',
                        zIndex: 0,
                        top: '-890.66748046875px',
                        left: '-806px',
                        borderRadius: '50px',
                        transform: 'rotate(48.24deg)',
                        backgroundColor: '#909CFF',
                        position: 'relative',
                    }}
                />




                <Box component="form" noValidate onSubmit={handleLoginSubmit}>
                    <Grid container component="main" sx={{ marginTop: '-86vh', position: 'relative', zIndex: 1, left: '-12vw' }}>
                        <CssBaseline />
                        <Grid
                        // component={Paper}
                        // item
                        // xs={false}
                        // sm={4}
                        // md={7}
                        // sx={{
                        //     display: 'flex',
                        //     alignItems: 'center',
                        //     justifyContent: 'center',
                        //     boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
                        //     // backgroundColor: theme.palette.secondary[600]
                        // }}
                        >
                            <Box
                            // sx={{
                            //     width: '100%',
                            //     height: '100%',
                            //     display: 'flex',
                            //     justifyContent: 'center',
                            //     alignItems: 'center',
                            //     borderRadius: '50px',
                            //     overflow: 'hidden',
                            // }}
                            >
                                {user.image && (
                                    <img
                                        src={require(`../../../server/uploads/${user.image}`)} // Use user's imagePath if available
                                        alt="Profile"
                                        style={{
                                            marginLeft: '11vw',
                                            width: '438px',
                                            marginTop: '-22vh',
                                            height: '438px',
                                            objectFit: 'cover',
                                            borderRadius: '100%',
                                            top: '-23vh',
                                            left: '177px',
                                            position: 'relative'

                                        }}
                                    />
                                )}

                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={8} md={5} elevation={6} square>
                            <Box
                                sx={{
                                    my: -68,
                                    mx: 4,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography
                                    component="h1"
                                    variant="h5"
                                    sx={{ marginTop: "5rem", marginBottom: "5rem", color: "#fff", fontWeight: "bold", marginLeft: '-45vw' }}
                                >
                                    User Profile
                                </Typography>

                                <Box sx={{ mt: -2, marginLeft: '30vw' }}>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>
                                                    <Typography sx={{ fontWeight: "bold" }}>User ID </Typography>
                                                </TableCell>
                                                <TableCell>{user._id}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <Typography sx={{ fontWeight: "bold" }}>User Name </Typography>
                                                </TableCell>
                                                <TableCell>{user.name}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <Typography sx={{ fontWeight: "bold" }}>Email </Typography>
                                                </TableCell>
                                                <TableCell>{user.email}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <Typography sx={{ fontWeight: "bold" }}>City </Typography>
                                                </TableCell>
                                                <TableCell>{user.city}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <Typography sx={{ fontWeight: "bold" }}>Country </Typography>
                                                </TableCell>
                                                <TableCell>{user.country}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <Typography sx={{ fontWeight: "bold" }}>Occupation </Typography>
                                                </TableCell>
                                                <TableCell>{user.occupation}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <Typography sx={{ fontWeight: "bold" }}>Phone Number </Typography>
                                                </TableCell>
                                                <TableCell>{user.phoneNumber}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>

                                </Box>
                            </Box>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: -20, marginLeft: '65vw', px: 5, fontWeight: "bold", height: '60px', width: '165px', border: '2px solid #3644C5', borderRadius: '28px', backgroundColor: 'white', color: '#3644C5' }}
                        >

                            EDIT USER
                        </Button>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: -20, marginLeft: '78vw', px: 5, fontWeight: "bold", height: '60px', width: '160px', border: '2px solid #3644C5', borderRadius: '28px', backgroundColor: 'white', color: '#3644C5' }}
                            onClick={back}
                        >

                            Back
                        </Button>
                    </Grid>

                </Box>
                {/* </Paper> */}
            </ThemeProvider>
        


        //------------------
    );
}
export default UserProfile;
