import axios from "axios";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { useParams } from "react-router";
import { setUserId } from "../../src/state/index"; 
import Swal from "sweetalert2";

const Login = ({ user }) => {

  console.log(user.name)

  const { userId } = useParams();
  const dispatch = useDispatch(); 
  const { pathname } = useLocation();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useContext(UserContext);
  const defaultTheme = createTheme();
  async function handleLoginSubmit(e) {
    e.preventDefault();
  try {
    const { data } = await axios.post('http://localhost:5001/login', { name, password });
    setUser(data);
    dispatch(setUserId(data._id)); // Dispatch the setUserId action
   
    const { isConfirmed } = await Swal.fire({
      title: "Successfull",
      text: "Login successful!",
      icon: "success",
      showCancelButton: false,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3644C5",
      confirmButtonText: "Ok!",
      
    });

    if (!isConfirmed) {
      return;
    }
    setRedirect(true);
  } catch (error) {
    console.error("Login failed:", error.response.data);
    const { isConfirmed } = await Swal.fire({
      title: "Failed",
      text: "Login failed",
      icon: "error",
      showCancelButton: false,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3644C5",
      confirmButtonText: "Ok!",
      
    });

    if (!isConfirmed) {
      return;
    }
    
    
  }



    // e.preventDefault();
    //     try {
       
    //         const {data} = await axios.post('http://localhost:5001/login', { name, password });
    //         setUser(data);
    //         alert('Login successful');
    //         setRedirect(true);

    //     } catch (error) {
    //       console.error("Login failed:", error.response.data); // Log the error response
    //       alert('Login failed');
    //     }
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
              SEACUCUMBER ADMIN
            </Typography>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleLoginSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="User Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
                autoComplete="name"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="password"
                autoFocus
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