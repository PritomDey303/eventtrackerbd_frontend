import LoopIcon from "@mui/icons-material/Loop";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import React from "react";
import { AuthContext, LoaderContext, NotificationContext } from "../../../App";
import "./Notification.css";
import SingleNotification from "./SingleNotification/SingleNotification";
export default function Notification() {
  const [url, , , token] = React.useContext(AuthContext);
  const [, setLoader] = React.useContext(LoaderContext);
  const [trigger, setTrigger] = React.useState(false);
  const [, setNotifyCount] = React.useContext(NotificationContext);
  const [loadState, setLoadState] = React.useState(3);
  const [page, setPage] = React.useState(1);
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
  const [notifications, setNotifications] = React.useState([]);
  React.useEffect(() => {
    const getNotifications = async () => {
      setLoader(true);
      setLoadState(3);
      if (token) {
        //console.log(`${token}`);
        const res = await axios.get(`${url}/notification/${page}`, {
          headers: {
            authorization: `bearer ${token}`,
          },
          withCredentials: true,
        });
        console.log(res.data);
        if (res.data.status === 200) {
          if (res.data.data.length < 10) {
            setLoadState(2);
          } else {
            setLoadState(1);
          }
          setNotifications([...notifications, ...res.data.data]);
        } else {
          setLoadState(1);
        }
      }
      setLoader(false);
    };
    getNotifications();
  }, [trigger, token, url, page]);

  //update notification
  React.useEffect(() => {
    if (notifications) {
      const updateNotifications = async () => {
        if (token) {
          const res = await axios({
            url: `${url}/notification/updatestatus`,
            headers: {
              authorization: `bearer ${token}`,
            },
            method: "put",
          });
          console.log(res);
          if (res.data.status === 200) {
            console.log(res.data);
            setNotifyCount(0);
          }
        }
      };
      updateNotifications();
    }
  }, [notifications, token, url, setNotifyCount]);

  //handle Pagination
  const handlePagination = () => {
    setPage(page + 1);
    setTrigger(!trigger);
  };
  console.log(notifications.length);
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
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <SingleNotification
                key={notification._id}
                notification={notification}
                trigger={trigger}
                setTrigger={setTrigger}
              />
            ))
          ) : (
            <div className="no_notification">
              <Typography component="h1" variant="h5">
                No Notifications
              </Typography>
            </div>
          )}
        </Grid>
        <div
          className="load-more-button"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "40px",
          }}
        >
          {loadState === 1 && (
            <Button
              onClick={handlePagination}
              variant="outlined"
              color="success"
              startIcon={<LoopIcon />}
            >
              Load More
            </Button>
          )}{" "}
          {loadState === 2 && (
            <Button
              disabled
              variant="outlined"
              color="success"
              startIcon={<LoopIcon />}
            >
              Load More
            </Button>
          )}
          {loadState === 3 && (
            <LoadingButton
              loading
              loadingIndicator="Loading…"
              variant="outlined"
            >
              Fetch data
            </LoadingButton>
          )}
        </div>
      </Container>
    </ThemeProvider>
  );
}
