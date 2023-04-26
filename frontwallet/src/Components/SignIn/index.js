import React, { useState, useEffect } from "react";
import LockIcon from '@mui/icons-material/Lock';
import { Avatar, Button, Checkbox, Container, FormControlLabel, Grid, Link, TextField, Typography } from "@mui/material";
import walletLogin from '../../assets/walletLogin.png'
import { useNavigate } from "react-router-dom";
import ApiService from "../../Services/ApiServices";

export default function LoginPage() {
  const apiService = new ApiService();
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    apiService.post(`/Login/login?userName=${userName}&password=${password}`).then(response => {
      if (response.status === 200) {
        sessionStorage.setItem('token', response.data.token);
        navigate('/Accounts', { state: { userName: userName } });
      }
    }).catch(error => {
      console.log(error)
    });
  };

  return (
    <div style={{ backgroundImage: `url(${walletLogin})`, width: '100%', height: '100vh', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Container component="main" maxWidth="xs" style={{ background: 'rgba(255, 255, 255, 0.7)', height: '350px', padding: '20px', borderRadius: '8px' }}>
        <div >
          <Grid container direction="column" justifyContent="center" alignItems="center" >
            <Avatar>
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {/* <form onSubmit={handleLogin}> */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="userName"
              label="userName"
              name="userName"
              autoFocus
              value={userName}
              onChange={(e) => setuserName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleLogin}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/SignUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            {/* </form> */}
          </Grid>
        </div>
      </Container>
    </div>
  );
}

