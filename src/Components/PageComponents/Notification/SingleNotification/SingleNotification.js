import CancelIcon from "@mui/icons-material/Cancel";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { Box, Grid, Paper } from "@mui/material";
import React from "react";
import Moment from "react-moment";
export default function SingleNotification(props) {
  const { body, createdAt, read } = props.notification;
  console.log(props.notification);
  return (
    <Grid item xs={12}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: "100%",
            height: "auto",
            padding: "20px 15px",
            position: "relative",
          },
        }}
      >
        <Paper elevation={6}>
          <div className="notification_content">
            <div className="notification_icon">
              {!read ? (
                <NotificationsActiveIcon style={{ color: "#7DCE13" }} />
              ) : (
                <NotificationsActiveIcon />
              )}
            </div>
            <div className="notification_content_text">
              <p>{body}</p>
              <span style={{ fontSize: "12px", color: "blue" }}>
                <Moment fromNow>{createdAt}</Moment>
              </span>
            </div>

            <div className="notification_delete">
              <CancelIcon style={{ color: "red" }} />
            </div>
          </div>
        </Paper>
      </Box>
    </Grid>
  );
}
