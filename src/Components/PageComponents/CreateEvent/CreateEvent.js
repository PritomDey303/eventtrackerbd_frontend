import EventIcon from "@mui/icons-material/Event";
import {
  Autocomplete,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import axios from "axios";
import * as React from "react";
import { useForm } from "react-hook-form";
import {
  AuthContext,
  LoaderContext,
  NotificationContext,
  ToastContext,
} from "../../../App";
import EventCategoryList from "../../../UtilityFunctions/EventCategoryList/EventCategoryList";

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

export default function CreateEvent() {
  //get all context apis
  const [url, , , token] = React.useContext(AuthContext);
  const [, setLoader] = React.useContext(LoaderContext);
  const [handleToast] = React.useContext(ToastContext);
  const [tempPlace, setTempPlace] = React.useState([]);
  const [resetForm, setResetForm] = React.useState(false);
  const [, , notifyTrigger, setNotifyTrigger] =
    React.useContext(NotificationContext);
  //react form hook
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    setLoader(true);
    const locationInfo = tempPlace.find(
      (place) => place.address === data.event_location
    );
    const locationArr = [locationInfo];
    //setLoader(true);
    const formData = new FormData();
    formData.append("event_name", data.event_name);
    formData.append("event_date", data.event_date);
    formData.append("event_time", data.event_time);

    formData.append("event_location", JSON.stringify(locationArr));
    formData.append("event_description", data.event_description);
    formData.append("event_banner_image", data.event_banner_image[0]);
    formData.append("event_category", data.event_category);
    formData.append("event_type", data.event_type);
    formData.append("event_organizer", data.event_organizer);
    formData.append("event_organizer_email", data.event_organizer_email);
    formData.append("event_organizer_mobile", data.event_organizer_mobile);
    formData.append("event_organizer_website", data.event_organizer_website);
    formData.append("event_organizer_facebook", data.event_organizer_facebook);

    //axios multipart form data post with credentials
    try {
      if (token) {
        const response = await axios.post(`${url}/event/create`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `bearer ${token}`,
          },
          withCredentials: true,
        });
        console.log(response);
        if (response.data.status !== 200) {
          handleToast("error", "Error creating event.");
          setLoader(false);
          return;
        }
        setResetForm(!resetForm);
        handleToast("success", "Event Created Successfully.");
        setNotifyTrigger(!notifyTrigger);
        setLoader(false);
      } else {
        console.log("no token");
        setLoader(false);
      }
    } catch (error) {
      handleToast("error", "Error creating event.");
      setLoader(false);
    }
  };
  //datepicker
  const [value, setValue] = React.useState(new Date());

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  let x_timer = "";
  //onKeyUp delay
  const onKeyUpDelay = (e) => {
    setTempPlace([]);
    console.log(e.target.value);
    clearTimeout(x_timer);
    x_timer = setTimeout(() => {
      locationHandler(e);
    }, 500);
  };
  /////////////////
  //location handler
  const locationHandler = async (e) => {
    let value = e.target.value.trim();
    let tempArr = [];
    if (value === "") {
      value = "dhaka";
    }
    const { data, error } = await axios.get(
      `https://barikoi.xyz/v1/api/search/autocomplete/MzU4MzpBVkRFMklQNjdS/place?q=${value}`
    );
    console.log(Object.keys(data));
    if (Object.keys(data).includes("places")) {
      data.places.map((place) => {
        let temp = {
          id: Math.random(),
          label: place.address,

          place_id: place.id,
          address: place.address,
          lat: place.latitude,
          lng: place.longitude,
          city: place.city,
          area: place.area,
          post_code: place.pCode,
        };
        tempArr.push(temp);
        return null;
      });

      setTempPlace(tempArr);
      console.log(tempArr);
    }
    if (error) {
      console.log(error);
    }
  };
  ////////reset form value
  const resetAsyncForm = React.useCallback(async () => {
    const result = await fetch("./api/formValues.json"); // result: { firstName: 'test', lastName: 'test2' }
    reset(result); // asynchronously reset your form values
  }, [reset]);

  React.useEffect(() => {
    resetAsyncForm();
  }, [resetForm, resetAsyncForm]);

  //////////////////////////////////////
  ///////////////////////////////////
  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="md"
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
            <EventIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Event
          </Typography>
          <Box
            component="form"
            encType="multipart/form-data"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="event_name"
                  label="Event Name"
                  {...register("event_name", { required: true })}
                  autoComplete="event_name"
                  autoFocus
                  color="secondary"
                />
              </Grid>

              <Grid item xs={6}>
                <MobileDatePicker
                  margin="normal"
                  type="date"
                  label="Date"
                  inputFormat="DD/MM/yyyy"
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      color="secondary"
                      {...register("event_date", { required: true })}
                      fullWidth
                      required
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <TimePicker
                  label="Time"
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      color="secondary"
                      {...register("event_time", { required: true })}
                      fullWidth
                      required
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  style={{ width: "100%" }}
                  disablePortal
                  id="combo-box-demo"
                  options={tempPlace}
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => {
                    return (
                      <li {...props} key={option.id}>
                        {option.address}
                      </li>
                    );
                  }}
                  // sx={{ width: 300 }}
                  name="event_location"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      {...register("event_location", { required: true })}
                      fullWidth
                      required
                      onKeyUp={onKeyUpDelay}
                      //defaultValue="Select Location"
                      label="Event Location"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Event Description"
                  required
                  multiline
                  rows={4}
                  color="secondary"
                  {...register("event_description", { required: true })}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl sx={{ width: "100%", minWidth: 120 }}>
                  <InputLabel
                    id="demo-simple-select-helper-label"
                    style={{ color: "black" }}
                  >
                    Event Type*
                  </InputLabel>
                  <Select
                    fullWidth
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Event Type"
                    color="secondary"
                    name="event_type"
                    required
                    defaultValue={""}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="Offline">Offline</MenuItem>
                    <MenuItem value="Online">Online</MenuItem>
                    <MenuItem value="Both">Both</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl sx={{ width: "100%", minWidth: 120 }}>
                  <InputLabel
                    id="demo-simple-select-helper-label"
                    style={{ color: "black" }}
                  >
                    Event Category*
                  </InputLabel>
                  <Select
                    fullWidth
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Event Category"
                    color="secondary"
                    {...register("event_category", { required: true })}
                    required
                    defaultValue={""}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    {EventCategoryList.map((category) => {
                      return (
                        <MenuItem key={category.id} value={category.name}>
                          {category.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="event_organizer"
                  label="Organizer"
                  {...register("event_organizer", { required: true })}
                  autoFocus
                  color="secondary"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="event_organizer_mobile"
                  label="Organizer Mobile"
                  {...register("event_organizer_mobile", { required: true })}
                  autoFocus
                  color="secondary"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="event_organizer_email"
                  label="Organizer Email"
                  {...register("event_organizer_email", { required: true })}
                  autoFocus
                  color="secondary"
                  type={"email"}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="event_organizer_facebook"
                  label="Organizer Facebook"
                  {...register("event_organizer_facebook", { required: true })}
                  autoFocus
                  color="secondary"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="event_organizer_website"
                  label="Organizer Website"
                  {...register("event_organizer_website", { required: true })}
                  autoFocus
                  color="secondary"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="event_banner_image"
                  label="Banner Image"
                  {...register("event_banner_image", { required: true })}
                  autoFocus
                  color="secondary"
                  type={"file"}
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
              Create Event
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
