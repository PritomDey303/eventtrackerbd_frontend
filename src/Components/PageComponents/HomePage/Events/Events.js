import axios from "axios";
import React from "react";
import { Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { ToastContext } from "../../../../App";
import EventCategoryList from "../../../../UtilityFunctions/EventCategoryList/EventCategoryList";
import EventCard from "./EventCard/EventCard";
import "./Events.css";
export default function Events() {
  const [handleToast] = React.useContext(ToastContext);

  const [normalFilter, setNormalFilter] = React.useState(true);
  const [latitude, setLatitude] = React.useState(0);
  const [longitude, setLongitude] = React.useState(0);
  const [location, setLocation] = React.useState(null);
  const [events, setEvents] = React.useState([]);
  const [eventName, setEventName] = React.useState("");
  const [eventCategory, setEventCategory] = React.useState("");
  const [eventType, setEventType] = React.useState("");
  const [distance, setDistance] = React.useState(5);
  //axios call to get all events
  React.useEffect(() => {
    //axios call to get all events
    axios.get("http://localhost:5000/event").then((res) => {
      console.log(res.data.data);
      setEvents(res.data.data);
    });
  }, []);
  //get geo location
  const geoLocationHandler = () => {
    setLatitude(0);
    setLongitude(0);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          console.log(position.coords.latitude, position.coords.longitude);
          console.log(latitude, longitude);
          if (
            position.coords.latitude === 0 &&
            position.coords.longitude === 0
          ) {
            handleToast("warning", "Please allow location access");
            // alert("Please allow location access");

            return;
          }
          axios
            .get(
              `http://localhost:5000/event/latlong?latitude=${
                position.coords.latitude
              }&longitude=${position.coords.longitude}&radius=${
                distance * 1000
              }`
            )
            .then((res) => {
              //console.log(res.data.data);
              setEvents(res.data.data);
            });
        },
        (error) => {
          console.log(error);
          handleToast("warning", "Please allow location access.");
          // alert("Please allow location access to use this feature.");
        }
      );
    }
  };

  //normal filter handler
  const normalFilterHandler = () => {
    console.log(eventName, eventCategory, eventType);
    if (eventName === "" && eventCategory === "" && eventType === "") {
      alert("Please fill up the form");
    }
    //axios call to get all events
    axios
      .get(
        `http://localhost:5000/event/filter?event_name=${eventName}&event_category=${eventCategory}&event_type=${eventType}`
      )
      .then((res) => {
        console.log(res.data.data);
        setEvents(res.data.data);
      });
  };

  return (
    <div className="events py-5">
      <Container>
        <div className="filterbox shadow">
          {normalFilter ? (
            //normal filter
            <div className="normal-filter">
              <Row>
                <Col xs={12} md={4}>
                  {" "}
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Event Name"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Enter Keywords."
                      onChange={(e) => {
                        setEventName(e.target.value);
                      }}
                    />
                  </FloatingLabel>
                </Col>{" "}
                <Col xs={12} md={4}>
                  <FloatingLabel
                    controlId="floatingSelectGrid"
                    label="Select Category"
                    className="mb-3"
                  >
                    <Form.Select
                      aria-label="Floating label select example"
                      onChange={(e) => {
                        setEventCategory(e.target.value);
                      }}
                    >
                      <option value="">Select category</option>
                      {EventCategoryList.map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Col>
                <Col xs={12} md={4}>
                  <FloatingLabel
                    controlId="floatingSelectGrid"
                    label="Select Event Type"
                    className="mb-3"
                  >
                    <Form.Select
                      aria-label="Floating label select example"
                      onChange={(e) => {
                        setEventType(e.target.value);
                      }}
                    >
                      <option value="">Select Event Type</option>
                      <option value="Offline">Offline</option>
                      <option value="Online">Online</option>
                    </Form.Select>
                  </FloatingLabel>
                </Col>
              </Row>
              <button
                className="btn  btn-lg mt-4 btn-outline-light shadow w-50 d-block mx-auto"
                onClick={normalFilterHandler}
              >
                Search
              </button>

              <span
                className="text-light mt-2 d-block text-right"
                style={{ textAlign: "right" }}
              >
                <u
                  style={{ cursor: "pointer" }}
                  onClick={() => setNormalFilter(false)}
                >
                  Filter By Location
                </u>
              </span>
              <span className="text-warning d-block mt-2 ">
                # Note: Search by <b>event name</b> , <b>category</b> or{" "}
                <b>event type</b>.
              </span>
            </div>
          ) : (
            //location filter
            //////////////////
            <div className="location-filter">
              <button
                className="btn btn-light btn-lg d-block mx-auto w-50"
                onClick={geoLocationHandler}
              >
                Search By Location
              </button>
              <FloatingLabel
                controlId="floatingInput"
                label="Search Area Distance(km)"
                className="my-3 w-25 d-block mx-auto "
              >
                <Form.Control
                  type="number"
                  style={{ height: "50px", fontSize: "16px" }}
                  defaultValue={distance}
                  onChange={(e) => {
                    setDistance(e.target.value);
                  }}
                />
              </FloatingLabel>
              <div className="d-flex text-light justify-content-around">
                <span>
                  <b>Latitude:</b>
                  {latitude}
                </span>
                <span>
                  {" "}
                  <b>Longitude:</b> {longitude}
                </span>
              </div>
              <div className="cords-container mt-3 text-center">
                <span className="text-light ">
                  {location && (
                    <span>
                      <b>Location:</b> {location}
                    </span>
                  )}
                </span>
              </div>
              <span
                className="text-light d-block mt-2 text-right"
                style={{ textAlign: "right" }}
              >
                <u
                  style={{ cursor: "pointer" }}
                  onClick={() => setNormalFilter(true)}
                >
                  Normal Filter
                </u>
              </span>
              <span className="text-warning d-block mt-2 ">
                # Note: If you are not getting any results, please{" "}
                <b>allow location access.</b>
              </span>
            </div>
          )}
        </div>
      </Container>
      {/* Event cards */}
      <Container style={{ marginTop: "250px" }}>
        <Row className="gy-5">
          {events.map((event) => (
            <Col xs={12} md={6} lg={4} key={event._id} className="">
              <EventCard event={event} />
            </Col>
          ))}
          {events.length === 0 && (
            <div className="py-5 my-5">
              <h1 className="text-center text-danger">
                Sorry! No event Found.
              </h1>
            </div>
          )}
        </Row>
      </Container>
    </div>
  );
}
