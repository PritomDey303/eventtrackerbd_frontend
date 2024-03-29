import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import axios from "axios";
import React from "react";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ".././node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import BackToTop from "./Components/CommonComponents/BackToTop/BackToTop";
import DrawerAppBar from "./Components/CommonComponents/DrawerAppBar/DrawerAppBar";
import Footer from "./Components/CommonComponents/Footer/Footer";
import ProtectedRoute from "./Components/CommonComponents/ProtectedRoute/ProtectedRoute";
import CreateEvent from "./Components/PageComponents/CreateEvent/CreateEvent";
import EmailVerification from "./Components/PageComponents/EmailVerification/EmailVerification";
import EventDetails from "./Components/PageComponents/HomePage/Events/EventDetails/EventDetails";
import HomePage from "./Components/PageComponents/HomePage/HomePage";
import Notification from "./Components/PageComponents/Notification/Notification";
import SignIn from "./Components/PageComponents/SignIn/SignIn";
import SignUp from "./Components/PageComponents/SignUp/SignUp";
import YourEvent from "./Components/PageComponents/YourEvent/YourEvent";
import SimpleBackdrop from "./UtilityFunctions/SimpleBackDrop/SimpleBackDrop";
import SnackBar from "./UtilityFunctions/SnackBar/SnackBar";
export const NotificationContext = React.createContext();
export const AuthContext = React.createContext();
export const ToastContext = React.createContext();
export const LoaderContext = React.createContext();
function App() {
  const [loader, setLoader] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("error");
  const [message, setMessage] = React.useState(null);
  const [token, setToken] = React.useState(null);
  const [triggerToken, setTriggerToken] = React.useState(false);
  const [notifyCount, setNotifyCount] = React.useState(0);
  const [notifyTrigger, setNotifyTrigger] = React.useState(false);
  const url = "http://localhost:5000";
  //const url = "http://localhost:5000";
  React.useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("event_token"));
    if (token) {
      setToken(token);
    }
  }, [triggerToken]);
  //get user
  React.useEffect(() => {
    const getUser = async () => {
      setLoader(true);
      if (token) {
        const res = await axios.get(`${url}/auth/user`, {
          headers: {
            authorization: `bearer ${token}`,
          },
          withCredentials: true,
        });

        if (res.data.status === 200) {
          setUser(res.data.data);
          setLoader(false);
        } else {
          setUser(null);
          setLoader(false);
        }
      } else {
        setLoader(false);
      }
    };
    setLoader(false);
    getUser();
  }, [token]);

  /////////use location

  //handle toast
  const handleToast = (type, msg) => {
    setOpen(true);
    setSeverity(type);
    setMessage(msg);
  };
  // //getting logged in user
  //get notification count
  React.useEffect(() => {
    const getNotifyCount = async () => {
      if (token) {
        const res = await axios.get(`${url}/notification/count/unreadcount`, {
          headers: {
            authorization: `bearer ${token}`,
          },
          withCredentials: true,
        });
        console.log(res.data);
        if (res.data.status === 200) {
          setNotifyCount(res.data.data);
        } else {
          setNotifyCount(0);
        }
      }
    };
    getNotifyCount();
  }, [token, notifyTrigger]);

  return (
    <>
      <AuthContext.Provider
        value={[url, user, setUser, token, triggerToken, setTriggerToken]}
      >
        <ToastContext.Provider value={[handleToast]}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <LoaderContext.Provider value={[loader, setLoader]}>
              <NotificationContext.Provider
                value={[
                  notifyCount,
                  setNotifyCount,
                  notifyTrigger,
                  setNotifyTrigger,
                ]}
              >
                <CookiesProvider>
                  <BrowserRouter>
                    <DrawerAppBar />
                    <Routes>
                      <Route exact path="/" element={<HomePage />} />

                      <Route path="/signup" element={<SignUp />} />
                      <Route path="/event/:id" element={<EventDetails />} />
                      <Route path="/signup" element={<SignUp />} />

                      <Route path="/*" element={<ProtectedRoute />}>
                        <Route path="create-event" element={<CreateEvent />} />
                        <Route path="notification" element={<Notification />} />
                        <Route path="your-events" element={<YourEvent />} />
                      </Route>

                      <Route path="/signin" element={<SignIn />} />

                      <Route
                        path="/auth/verify/:token"
                        element={<EmailVerification />}
                      />
                      <Route
                        path="*"
                        element={
                          <div
                            style={{
                              marginTop: "150px",
                              color: "red",
                              padding: "50px 0",
                              textAlign: "center",
                            }}
                          >
                            <h3 color="red">
                              Sorry! Your requested page not found.
                            </h3>
                          </div>
                        }
                      />
                    </Routes>
                    <Footer />
                    <BackToTop />
                    <SnackBar
                      open={open}
                      setOpen={setOpen}
                      severity={severity}
                      message={message}
                    />
                  </BrowserRouter>
                </CookiesProvider>
              </NotificationContext.Provider>
              <SimpleBackdrop loader={loader} />
              {/* <Ripple background="rgb(231, 234, 229)" color="black" /> */}
            </LoaderContext.Provider>
          </LocalizationProvider>
        </ToastContext.Provider>
      </AuthContext.Provider>
    </>
  );
}

export default App;
