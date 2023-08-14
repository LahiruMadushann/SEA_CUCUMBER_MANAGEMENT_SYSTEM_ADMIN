import axios from "axios";
import React from "react";
import { useGetAdminsQuery } from "state/api";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
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

const Login = ({ user }) => {

  console.log(user.name)


  const { pathname } = useLocation();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useContext(UserContext);
  const defaultTheme = createTheme();
  async function handleLoginSubmit(e) {
    e.preventDefault();
    try {
      if (user.name === userName && user.password === password) {
        alert("Login successful");
        setRedirect(true);
      } else {
        alert("Login failed");
        setUserName('');
        setPassword('');
      }

    } catch (e) {
      alert("Login failed");
    }
  }

  if (redirect) {
    return <Navigate to={"/dashboard"} />;
  }

  return (

    <ThemeProvider theme={defaultTheme} >
      <Grid container component="main" sx={{ height: '95vh',marginTop: '6vh'}}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://th.bing.com/th/id/OIGP.GVeSzJPF6h6X2UueFH9Z?pid=ImgGn)',
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
             sx={{ marginTop: "1rem", marginBottom: "5rem", color: "#1976D2",fontWeight: "bold" }}
             >
              User Profile
            </Typography>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleLoginSubmit} sx={{ mt: 1 }}>
            <TextField
                    required
                    name="id"
                    label="ID"
                    fullWidth
                    value={user.id}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <TextField
                    required
                    name="name"
                    label="Name"
                    fullWidth
                    value={user.name}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <TextField
                    required
                    name="email"
                    label="Email"
                    fullWidth
                    value={user.email}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <TextField
                    required
                    name="password"
                    label="Password"
                    fullWidth
                    type="password"
                    value={user.password}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <TextField
                    name="city"
                    label="City"
                    fullWidth
                    value={user.city}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <TextField
                    name="state"
                    label="State"
                    fullWidth
                    value={user.state}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <TextField
                    name="country"
                    label="Country"
                    fullWidth
                    value={user.country}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <TextField
                    name="occupation"
                    label="Occupation"
                    fullWidth
                    value={user.occupation}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <TextField
                    name="phone"
                    label="Phone Number"

                    value={user.phone}
                    onChange={(e) => setUserName(e.target.value)}
                />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={showPassword}
                    onChange={(e) => setShowPassword(e.target.checked)}
                    color="primary"
                  />
                }
                label="Show password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2,fontWeight: "bold" }}
              >
                Sign In
              </Button>


            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>



    //------------------
  );
}
export default Login;
