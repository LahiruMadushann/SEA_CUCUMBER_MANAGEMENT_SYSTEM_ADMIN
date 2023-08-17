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
import {useTheme} from "@mui/material";

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


    return (

        <ThemeProvider theme={defaultTheme} >
            <Box component="form" noValidate onSubmit={handleLoginSubmit}>
                <Grid container component="main" sx={{ height: '100vh', marginTop: '6vh' }}>
                    <CssBaseline />
                    <Grid
                        component={Paper}
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
                            backgroundColor: theme.palette.secondary[600]
                        }}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '50px',
                                overflow: 'hidden',
                            }}
                        >
                           
                            <img
                                src={require(`../../../server/uploads/${user.image}`)} // Use user's imagePath if available
                                alt="Profile"
                                style={{
                                    marginLeft: '11vw',
                                    width: '60%',
                                    marginTop: '-22vh',
                                    height: '60%',
                                    objectFit: 'cover',
                                    borderRadius: '50px',
                                }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 63, mb: 2, ml: -38, mr: 38, px: 5, fontWeight: "bold" }}
                            >
                                {console.log("Image Name",user.image)}
                                EDIT USER
                            </Button>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Typography
                                component="h1"
                                variant="h5"
                                sx={{ marginTop: "1rem", marginBottom: "5rem", color: "#1976D2", fontWeight: "bold" }}
                            >
                                User Profile
                            </Typography>
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <Person2OutlinedIcon />
                            </Avatar>
                            <Typography component="h4" variant="h6">
                                User Details
                            </Typography>
                            <Box sx={{ mt: 1 }}>
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
                </Grid>
            </Box>
        </ThemeProvider>



        //------------------
    );
}
export default UserProfile;
