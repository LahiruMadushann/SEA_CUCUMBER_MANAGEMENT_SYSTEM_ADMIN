import axios from "axios";
import React from "react";
import { useGetAdminsQuery } from "state/api";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../UserContext";
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import { Link, Navigate, useLocation, useNavigate  } from "react-router-dom";
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
import Profile from "./Profile";

const UserProfile = ({ user={} }) => {
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

    const defaultTheme = createTheme();
    async function handleLoginSubmit(e) {
        e.preventDefault();
  try {
    const updatedUserData = {
      name: userName,
      email: email,
      password: password,
      city: city,
      country: country,
      occupation: occupation,
      phoneNumber: phoneNumber,
    };

    // Update the base URL to match your backend server
    const response = await axios.put(`http://localhost:5001/general/user/${user._id}`, updatedUserData);

    if (response.status === 200) {
      // Profile update successful
      alert("Profile updated successfully!");
      // You might want to update the user context or any other necessary state
    } else {
      alert("Profile update failed. Please try again.");
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    alert("An error occurred while updating the profile. Please try again later.");
  }
       

    }


    return (

        <ThemeProvider theme={defaultTheme} >

            <Grid container component="main" sx={{ height: '100vh', marginTop: '6vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${require('../assets/profile.jpeg')})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
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
                        <Typography component="h1" variant="h5">
                            User
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleLoginSubmit} sx={{ mt: 1 }}>
                            <Typography >
                                User ID : {user._id}
                            </Typography>

                            <TextField
                                margin="normal"
                        
                                name="name"
                                label="Name"
                                fullWidth
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                               
                                name="email"
                                label="Email"
                                fullWidth
                                value={email}
                                inputProps={{ autoComplete: "off" }}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                            
                                name="password"
                                label="Password"
                                fullWidth
                                type="password"
                                value={password}
                                inputProps={{ autoComplete: "off" }}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                name="city"
                                label="City"
                                fullWidth
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />

                            <TextField
                                margin="normal"
                                name="country"
                                label="Country"
                                fullWidth
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                name="occupation"
                                label="Occupation"
                                fullWidth
                                value={occupation}
                                onChange={(e) => setOccupation(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                name="phone"
                                label="Phone Number"
                                fullWidth
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                            {/* <TextField
                                margin="normal"
                                name="Role"
                                label="Role"
                                fullWidth
                                value={user.role}
                                onChange={(e) => setRo(e.target.value)}
                            /> */}


                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, fontWeight: "bold" }}
                            >
                                Save
                            </Button>


                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>



        //------------------
    );
}
export default UserProfile;
