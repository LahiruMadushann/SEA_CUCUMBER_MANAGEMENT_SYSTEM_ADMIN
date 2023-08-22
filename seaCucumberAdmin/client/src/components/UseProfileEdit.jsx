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
import Profile from "./Profile";
import { useTheme } from "@mui/material";
import Cookies from 'js-cookie';


const UserProfileEdit = ({ user = {} }) => {
    const navigate = useNavigate();
    const theme = useTheme();

    const { pathname } = useLocation();
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [occupation, setOccupation] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [image, setImage] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { setUser } = useContext(UserContext);

    const defaultTheme = createTheme();

    useEffect(() => {
        const userDataFromCookies = {
          name: Cookies.get("name") || user.name || "",
          email: Cookies.get("email") || user.email || "",
          password: Cookies.get("password") || user.password || "",
          city: Cookies.get("city") || user.city || "",
          country: Cookies.get("country") || user.country || "",
          occupation: Cookies.get("occupation") || user.occupation || "",
          phoneNumber: Cookies.get("phoneNumber") || user.phoneNumber || "",
        };
    
        setUserName(userDataFromCookies.name);
        setEmail(userDataFromCookies.email);
        setPassword(userDataFromCookies.password);
        setCity(userDataFromCookies.city);
        setCountry(userDataFromCookies.country);
        setOccupation(userDataFromCookies.occupation);
        setPhoneNumber(userDataFromCookies.phoneNumber);
      }, [user]);



    // useEffect((e) => {
    //      // Set the image state 
    //     console.log("Image state updated:", image);
    // }, [image]); 
    const handleImageChange = async (e) => {
        const selectedImage = e.target.files[0];

        setImage(e.target.files[0]);


        if (!selectedImage) {
            return;
        }
        console.log("File selected:", selectedImage);
        setImage(selectedImage);

        try {

            // const updatedImage = {
            //     image: image,
            // };

            const formData = new FormData();
            formData.append('image', selectedImage);


            const response = await axios.put(`http://localhost:5001/general/user/image/${user._id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                console.log("Image successfully updated in the database.");
                // Profile update successful
                alert("Profile Picture Updated Successfully!");
                // Reload the page
                window.location.reload();
            } else {
                console.log("Failed to update image in the database.");
                alert("Profile Picture Update Failed. Please Try Again.");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("An error occurred while uploading the profile picture. Please try again later.");
        }
    };

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

            Object.keys(updatedUserData).forEach((key) => {
                Cookies.set(key, updatedUserData[key]);
              });

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


   

    // When user logs out or clears form data
// Object.keys(formData).forEach(key => {
//     Cookies.remove(key);
// });

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
                        backgroundColor: theme.palette.secondary[600]
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
                    >{user.image && (
                        <img
                            src={require(`../../../server/uploads/${user.image}`)}
                            alt="Profile"
                            style={{
                                marginLeft: '11vw',
                                width: '60%',
                                marginTop: '-22vh',
                                height: '60%',
                                objectFit: 'cover', // Maintain aspect ratio and cover container
                                borderRadius: '50px', // Add border radius to the image
                            }}
                        />)}
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 63, mb: 2, ml: -38, mr: 38, fontWeight: "bold" }}
                            onClick={() => document.getElementById('fileInput').click()}
                        >
                            UPLOAD IMAGE
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
                        <Typography component="h1" variant="h5">
                            User
                        </Typography>

                        <Box component="form" noValidate onSubmit={handleLoginSubmit} sx={{ mt: 1 }}>

                            {user.name && (
                                <TextField
                                    margin="normal"

                                    name="name"
                                    label="Name"
                                    fullWidth
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />)}
                            {user.image && (
                                <TextField
                                    margin="normal"

                                    name="email"
                                    label="Email"
                                    fullWidth
                                    value={email}
                                    inputProps={{ autoComplete: "off" }}
                                    onChange={(e) => setEmail(e.target.value)}
                                />)}
                            {user.image && (
                                <TextField
                                    margin="normal"

                                    name="password"
                                    label="Password"
                                    fullWidth
                                    type="password"
                                    value={password}
                                    inputProps={{ autoComplete: "off" }}
                                    onChange={(e) => setPassword(e.target.value)}
                                />)}
                            {user.image && (
                                <TextField
                                    margin="normal"
                                    name="city"
                                    label="City"
                                    fullWidth
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />)}
                            {user.image && (

                                <TextField
                                    margin="normal"
                                    name="country"
                                    label="Country"
                                    fullWidth
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                />)}

                            {user.image && (
                                <TextField
                                    margin="normal"
                                    name="occupation"
                                    label="Occupation"
                                    fullWidth
                                    value={occupation}
                                    onChange={(e) => setOccupation(e.target.value)}
                                />)}
                            {user.image && (
                                <TextField
                                    margin="normal"
                                    name="phone"
                                    label="Phone Number"
                                    fullWidth
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />)}

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
                                UPDATE DETAIL
                            </Button>


                        </Box>

                    </Box>
                </Grid>
            </Grid>
            <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
            />
        </ThemeProvider>



        //------------------
    );
}
export default UserProfileEdit;
