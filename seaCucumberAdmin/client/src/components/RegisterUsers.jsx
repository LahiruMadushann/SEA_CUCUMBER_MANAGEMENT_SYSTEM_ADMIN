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


const RegisterUsers = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);


   


    const { pathname } = useLocation();
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [occupation, setOccupation] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [role, setRole] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
   

    const defaultTheme = createTheme();
    async function handleLoginSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: userName,
            email: email,
            password: password,
            city: city,
            country: country,
            occupation: occupation,
            phoneNumber: phoneNumber,
            role: role,
        };

        try {
            const response = await axios.post('http://localhost:5001/general/add', newUser);

            if (response.status === 201) {
                const addedUser = response.data; // Assuming the server returns the added user data with an ID
            console.log('New user added:', addedUser);
                // Profile add successful
                alert("Profile added successfully!");
                navigate('/'); // Redirect to login page after successful registration
            } else {
                alert("Profile add failed. Please try again.");
            }
        } catch (error) {
            console.error("Error adding profile:", error);
            alert("An error occurred while adding the profile. Please try again later.");
        }

        


        // try {
        //     const addUser = {
        // name: userName,
        // email: email,
        // password: password,
        // city: city,
        // country: country,
        // occupation: occupation,
        // phoneNumber: phoneNumber,
        // role: role,
        //     };

        //     // Update the base URL to match your backend server
        //     const response = await axios.post(`http://localhost:5001/general/user`, addUser);

        //     if (response.status === 200) {
        //         // Profile update successful
        //         alert("Profile updated successfully!");
        //         // You might want to update the user context or any other necessary state
        //     } else {
        //         alert("Profile update failed. Please try again.");
        //     }
        // } catch (error) {
        //     console.error("Error updating profile:", error);
        //     alert("An error occurred while updating the profile. Please try again later.");
        // }


    }


    return (

        <ThemeProvider theme={defaultTheme} >

            <Grid container component="main" sx={{ height: '100vh', marginTop: '6vh' }}>
                <CssBaseline />
                <Grid component={Paper}
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        display: 'flex', // Display the Box and Grid contents as flex
                        alignItems: 'center', // Align items vertically
                        justifyContent: 'center', // Center items horizontally
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%', // Set height to fill the container
                            display: 'flex', // Display the image container as flex
                            justifyContent: 'center', // Center items horizontally
                            alignItems: 'center', // Center items vertically
                            borderRadius: '50px', // Add border radius to the image container
                            overflow: 'hidden', // Hide any overflow content
                        }}
                    >
                        {/* <img
                            src={require('../assets/profile.jpeg')}
                            alt="Profile"
                            style={{
                                width: '40%',
                                marginTop: '-72vh',
                                height: '40%',
                                objectFit: 'cover', // Maintain aspect ratio and cover container
                                borderRadius: '50px', // Add border radius to the image
                            }}
                        /> */}




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
                            REGISTER USER
                        </Typography>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <Person2OutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleLoginSubmit} sx={{ mt: 1 }}>
                            <Typography >
                                User ID 
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
                            <TextField
                                margin="normal"
                                name="Role"
                                label="Role"
                                fullWidth
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            />


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
export default RegisterUsers;
