import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

const UserProfile = () => {
    const classes = useStyles();
    const [user, setUser] = useState({
        id: '',
        name: '',
        email: '',
        password: '',
        city: '',
        state: '',
        country: '',
        occupation: '',
        phone: '',
        transactions: '',
        role: '',
    });

    const handleChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Submit form data
    };

    return (
        <form className={classes.root} onSubmit={handleSubmit}>
            <div>
                <TextField
                    required
                    name="id"
                    label="ID"
                    value={user.id}
                    onChange={handleChange}
                />
                <TextField
                    required
                    name="name"
                    label="Name"
                    value={user.name}
                    onChange={handleChange}
                />
                <TextField
                    required
                    name="email"
                    label="Email"
                    value={user.email}
                    onChange={handleChange}
                />
                <TextField
                    required
                    name="password"
                    label="Password"
                    type="password"
                    value={user.password}
                    onChange={handleChange}
                />
                <TextField
                    name="city"
                    label="City"
                    value={user.city}
                    onChange={handleChange}
                />
                <TextField
                    name="state"
                    label="State"
                    value={user.state}
                    onChange={handleChange}
                />
                <TextField
                    name="country"
                    label="Country"
                    value={user.country}
                    onChange={handleChange}
                />
                <TextField
                    name="occupation"
                    label="Occupation"
                    value={user.occupation}
                    onChange={handleChange}
                />
                <TextField
                    name="phone"
                    label="Phone Number"
                    value={user.occupation}
                    onChange={handleChange}
                />
            </div>
            <div>
                <FormControl className={classes.formControl}>
                  <InputLabel id="role-label">Role</InputLabel>
                  <Select
                      labelId="role-label"
                      id="role-select"
                      name="role"
                      value={user.role}
                      onChange={handleChange}>
                      <MenuItem value={"admin"}>Admin</MenuItem>
                      <MenuItem value={"manager"}>Manager</MenuItem>
                      <MenuItem value={"employee"}>Employee</MenuItem>
                  </Select>
              </FormControl>
              <Button variant="contained" color="primary" type="submit">
                  Submit
              </Button>
            </div>
        </form>
);
}

export default UserProfile;
