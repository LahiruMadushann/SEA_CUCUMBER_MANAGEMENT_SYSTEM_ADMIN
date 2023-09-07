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
import { useTheme } from "@mui/material";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from "components/Header";
import Swal from "sweetalert2";


const KnowledgeCenter = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const [image, setImage] = useState(null);
    const [speciesType, setSpeciesType] = useState("");
    const [scientificName, setScientificName] = useState("");
    const [description, setDescription] = useState("");
    const [habitats, setHabitats] = useState("");
    const [feeding, setFeeding] = useState("");
    const [reproduction, setReproduction] = useState("");
    const [lifecycle, setLifecycle] = useState("");
    const [fishingmethods, setFishingmethods] = useState("");
    
    const [redirect, setRedirect] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const defaultTheme = createTheme();

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };
    async function back(e) {
        e.preventDefault();
        const { isConfirmed } = await Swal.fire({
            title: "Are you sure?",
            text: "Are you sure you want to cancel?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3644C5",
            confirmButtonText: "Yes, cancel it!",
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

    async function handleLoginSubmit(e) {
        e.preventDefault();
        const formData = new FormData();

        formData.append("speciesType", speciesType);
        formData.append("scientificName", scientificName);
        formData.append("description", description);
        formData.append("habitats", habitats);
        formData.append("feeding", feeding);
        formData.append("reproduction", reproduction);
        formData.append("lifecycle", lifecycle);
        formData.append("fishingmethods",fishingmethods);
        formData.append("image", image);

        try {

            // const response = await axios.post("http://localhost:5001/general/add", formData);

            const response = await axios.post("http://localhost:5001/general/addKnowledge", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });


            if (response.status === 201) {

            //--------------------------
            const { isConfirmed } = await Swal.fire({
                title: "Success?",
                text: "Knowledge Added Successfuly",
                icon: "success",
                showCancelButton: false,
                confirmButtonColor: "#d33",
                // cancelButtonColor: "#3644C5",
                confirmButtonText: "Ok!",
                // cancelButtonText: "No"
              });
          
              if (!isConfirmed) {
                return;
              }
                try {
                    navigate("/enterknowledgecenterdata");
                } catch (error) {
                  console.error("Error Going Back");
                }
            //--------------------------




                
                // alert("Knowledge added successfully!");
                navigate("/enterknowledgecenterdata");
            } else {
                alert("Knowledge add failed. Please try again.");
            }
        } catch (error) {
            console.error("Error adding Knowledge:", error);
            alert("An error occurred while adding the Knowledge. Please try again later.");
        }



    }


    return (


        //-----------------

        <ThemeProvider theme={defaultTheme} >
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
            <Grid container component="main" sx={{ marginTop: '-86vh', position: 'relative', zIndex: 1, left: '-12vw' }}>
                <CssBaseline />
                <Grid
              
                >
                    <Box
                    
                    >
                        <img
                            src={require(`../assets/knowledge.png`)}
                            alt="Profile"
                            style={{
                                marginLeft: '11vw',
                                width: '35vw',
                                marginTop: '-22vh',
                                height: '35vw',
                                objectFit: 'cover',
                                borderRadius: '100%',
                                top: '-23vh',
                                left: '177px',
                                position: 'relative'

                            }}
                        />
                      
                    </Box>
                </Grid>

                <Grid item xs={12} sm={8} md={5} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography
                            component="h1"
                            variant="h3"
                            sx={{ marginTop: "-32rem", marginBottom: "5rem", color: "#3644C5", fontWeight: "bold", marginLeft: 'auto',marginRight:'auto' }}
                        >
                            KNOWLEDGE CENTER
                        </Typography>
                       
                        

                        <Box component="form" noValidate onSubmit={handleLoginSubmit} sx={{ mt: -2, marginRight: '-25vw',width:'36vw' }}>

                        <TextField
                                    margin="normal"

                                    name="speciesType"
                                    label="Species Type"
                                    fullWidth
                                    value={speciesType}
                                    onChange={(e) => setSpeciesType(e.target.value)}
                                />
                                <TextField
                                    margin="normal"

                                    name="scientificName"
                                    label="Scientific Name"
                                    fullWidth
                                    value={scientificName}
                                    inputProps={{ autoComplete: "off" }}
                                    onChange={(e) => setScientificName(e.target.value)}
                                />
                                <TextField
                                    margin="normal"

                                    name="description"
                                    label="Description"
                                    fullWidth
                                    
                                    value={description}
                                    inputProps={{ autoComplete: "off" }}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <TextField
                                    margin="normal"
                                    name="habitats"
                                    label="Habitats"
                                    fullWidth
                                    value={habitats}
                                    onChange={(e) => setHabitats(e.target.value)}
                                />

                                <TextField
                                    margin="normal"
                                    name="feeding"
                                    label="Feeding"
                                    fullWidth
                                    value={feeding}
                                    onChange={(e) => setFeeding(e.target.value)}
                                />
                                <TextField
                                    margin="normal"
                                    name="reproduction"
                                    label="Reproduction"
                                    fullWidth
                                    value={reproduction}
                                    onChange={(e) => setReproduction(e.target.value)}
                                />
                                <TextField
                                    margin="normal"
                                    name="lifecycle"
                                    label="Life Cycle"
                                    fullWidth
                                    value={lifecycle}
                                    onChange={(e) => setLifecycle(e.target.value)}
                                />
                                <TextField
                                    margin="normal"
                                    name="fishingmethods"
                                    label="Fishingmethods"
                                    fullWidth
                                    value={fishingmethods}
                                    onChange={(e) => setFishingmethods(e.target.value)}
                                />

                                <TextField
                                    margin="normal"
                                    type="file"
                                    label="Sea Cucumber Image"
                                    fullWidth
                                    onChange={handleImageChange}
                                />


                                {/* <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    // sx={{ mt: 3, mb: 2, fontWeight: "bold" }}
                                    sx={{ mt: 3,  px: 5, fontWeight: "bold", height: '60px', width: '200px', border: '2px solid #3644C5', borderRadius: '28px', backgroundColor: 'white', color: '#3644C5' }}
                                >
                                    Save
                                </Button> */}


                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 1.5, marginLeft: '-55vw', px: 5, fontWeight: "bold", height: '60px', width: '200px', border: '2px solid #3644C5', borderRadius: '28px', backgroundColor: 'white', color: '#3644C5' }}
                            >
                                Add Data
                            </Button>
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 1.5, marginLeft: '-28vw', px: 5, fontWeight: "bold", height: '60px', width: '200px', border: '2px solid #E71010', borderRadius: '28px', backgroundColor: 'white', color: '#E71010' }}
                                onClick={back}
                            >
                                Cancel
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

        //-----------------



        //------------------
    );
}
export default KnowledgeCenter;
