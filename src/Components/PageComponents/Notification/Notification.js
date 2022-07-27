import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import {
  Avatar,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import React from "react";
import { AuthContext, LoaderContext } from "../../../App";
import "./Notification.css";
import SingleNotification from "./SingleNotification/SingleNotification";
export default function Notification() {
  const [url, user, , token] = React.useContext(AuthContext);
  const [, setLoader] = React.useContext(LoaderContext);
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

  //getting notifications from database
  const [notifications, setNotifications] = React.useState(null);
  React.useEffect(() => {
    const getNotifications = async () => {
      setLoader(true);
      if (token) {
        //console.log(`${token}`);
        const res = await axios.get(`${url}/notification`, {
          headers: {
            authorization: `bearer ${token}`,
          },
          withCredentials: true,
        });
        console.log(res.data);
        if (res.data.status === 200) {
          setNotifications(res.data.data);
        }
      }
      setLoader(false);
    };
    getNotifications();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="sm"
        sx={{ marginTop: "150px", paddingBottom: "80px" }}
      >
        <CssBaseline />
        <div className="notification_heading">
          <Avatar sx={{ m: 1, bgcolor: "#212121" }}>
            <NotificationsActiveIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Notifications
          </Typography>
        </div>
        <Grid container spacing={0}>
          {notifications &&
            notifications.map((notification) => (
              <SingleNotification
                key={notification._id}
                notification={notification}
              />
            ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
