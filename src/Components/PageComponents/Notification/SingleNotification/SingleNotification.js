import CancelIcon from "@mui/icons-material/Cancel";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { Box, Grid, Paper } from "@mui/material";
import axios from "axios";
import React from "react";
import Moment from "react-moment";
import { AuthContext, LoaderContext, ToastContext } from "../../../../App";
export default function SingleNotification(props) {
  const { body, createdAt, read, _id } = props.notification;
  const [url, , , token] = React.useContext(AuthContext);
  const [, setLoader] = React.useContext(LoaderContext);
  const [handleToast] = React.useContext(ToastContext);
  //delete notifications
  const deleteNotification = async () => {
    setLoader(true);

    if (token) {
      const res = await axios({
        url: `${url}/notification/delete/${_id}`,
        headers: {
          authorization: `bearer ${token}`,
        },
        method: "delete",
      });
      console.log(res);
      if (res.data.status === 200) {
        props.setTrigger(!props.trigger);
        handleToast("success", res.data.message);
      } else {
        handleToast("error", res.data.message);
      }
    }
    setLoader(false);
  };
  //console.log(props.notification);
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

            <div className="notification_delete" onClick={deleteNotification}>
              <CancelIcon style={{ color: "red" }} />
            </div>
          </div>
        </Paper>
      </Box>
    </Grid>
  );
}
