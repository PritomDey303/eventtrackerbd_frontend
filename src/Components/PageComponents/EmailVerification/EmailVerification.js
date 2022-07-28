import { Button, Container } from "@mui/material";
import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext, LoaderContext, ToastContext } from "../../../App";

function EmailVerification() {
  const navigate = useNavigate();
  const [url] = React.useContext(AuthContext);
  const [, setLoader] = React.useContext(LoaderContext);
  const [handleToast] = React.useContext(ToastContext);
  const [show, setShow] = React.useState(true);
  const { token } = useParams();
  //uupdate user verification state
  const handleClick = async () => {
    setLoader(true);

    try {
      const res = await axios.post(`${url}/auth/verification`, {
        token: token,
      });
      if (res.data.status !== 200) {
        console.log(res.data.message);
        handleToast("error", res.data.message);
        setLoader(false);
        //navigate to home page
      } else {
        console.log(res.data);
        handleToast("success", res.data.message);
        setLoader(false);
        setShow(false);
        //navigate to home page
      }
    } catch (error) {
      console.log(error);
      handleToast("error", error.message);
      setLoader(false);
      //navigate to home page
    }
    //settimeout to navigate to home page
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 3000);
  };

  return (
    <div style={{ marginTop: "150px", paddingBottom: "140px" }}>
      <Container maxWidth="sm">
        <h2 style={{ color: "green", textAlign: "center" }}>
          Verify your email.......
        </h2>
        {show && (
          <Button
            variant="outlined"
            color="success"
            onClick={handleClick}
            style={{
              marginTop: "20px",
              display: "block",
              margin: "0 auto",
              width: "80px",
              height: "50px",
            }}
          >
            {" "}
            Verify
          </Button>
        )}
      </Container>
    </div>
  );
}

export default EmailVerification;
