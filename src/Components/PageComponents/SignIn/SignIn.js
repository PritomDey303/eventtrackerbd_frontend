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
import { useLocation, useNavigate } from "react-router-dom";
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

function SignIn() {
  const [handleToast] = React.useContext(ToastContext);
  //getting AuthContext from App.js
  const auth = React.useContext(AuthContext);
  const [url, user, setUser, , triggerToken, setTriggerToken] = auth;
  const [, setLoader] = React.useContext(LoaderContext);
  //intialize the navigate function
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    console.log(location);
    if (user) {
      navigate("/");
    }
  }, [user, navigate, location]);

  //link click handler to navigate to sign in page
  function linkClickHandler() {
    navigate("/signup", { replace: true });
  }

  const handleSubmit = async (event) => {
    setLoader(true);
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    //axios call to sign in
    try {
      const res = await axios.post(
        `${url}/auth/signin`,
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res);
      if (res.data.status !== 200) {
        handleToast("error", "Invalid email or password.");
      } else {
        setUser(res.data.data);
        handleToast("success", res.data.message);
        sessionStorage.setItem("event_token", JSON.stringify(res.data.token));
        setTriggerToken(!triggerToken);
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 2000);
      }
      setLoader(false);
    } catch (error) {
      console.log(error.message);
      setLoader(false);
      handleToast("error", "Sorry! Something went wrong.");
    }
  };

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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              color="secondary"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              color="secondary"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#212121" }}
              color="secondary"
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
                <Link
                  href="#"
                  onClick={linkClickHandler}
                  sx={{ cursor: "pointer" }}
                  variant="body2"
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;
