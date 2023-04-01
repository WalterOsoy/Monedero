import React, { useState } from "react";
import LockIcon from '@mui/icons-material/Lock';
import { Avatar, Button, Checkbox, Container, FormControlLabel, Grid, Link, TextField, Typography } from "@mui/material";
import walletLogin from '../../assets/walletLogin.png'
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    // Handle login logic here
    navigate('/Accounts', { state: { userName } });
  };

  return (
    <div style={{ backgroundImage: `url(${walletLogin})`, width: '100%', height: '100vh', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Container component="main" maxWidth="xs" style={{ background: 'rgba(255, 255, 255, 0.7)', height: '400px', padding: '20px', borderRadius: '8px' }}>
        <div >
          <Grid container direction="column" justifyContent="center" alignItems="center" >
            <Avatar>
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form onSubmit={handleLogin}>
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
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </div>
      </Container>
    </div>
  );
}
