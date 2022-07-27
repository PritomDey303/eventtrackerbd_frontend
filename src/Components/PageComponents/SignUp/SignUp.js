import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, LoaderContext, ToastContext } from "../../../App";

const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#212121",
    },
  },
});

export default function SignUp() {
  const navigate = useNavigate();
  //getting AuthContext from App.js
  const [url] = React.useContext(AuthContext);
  //loader context
  const [, setLoader] = React.useContext(LoaderContext);
  //toast context
  const [handleToast] = React.useContext(ToastContext);

  const handleSubmit = async (event) => {
    setLoader(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userObj = {
      username: data.get("firstName") + " " + data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
    };
    //axios async call to sign up
    try {
      const res = await axios.post(`${url}/auth/signup`, userObj);
      if (res.data.status !== 200) {
        console.log(res.data);
        handleToast("error", "Sorry! Invalid Name or Email or Password..");
        setLoader(false);
      } else {
        console.log(res.data);
        handleToast("success", res.data.message);
        setLoader(false);
      }
    } catch (err) {
      console.log(err);
      setLoader(false);
      handleToast("error", "Sorry! Something went wrong.");
    }
  };

  //link click handler to navigate to sign in page
  function linkClickHandler() {
    navigate("/signin", { replace: true });
  }

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{ marginTop: "150px", paddingBottom: "80px" }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#212121" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  color="secondary"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  color="secondary"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  color="secondary"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  color="secondary"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#212121" }}
              color="secondary"
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  onClick={linkClickHandler}
                  sx={{ cursor: "pointer" }}
                  variant="body2"
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
