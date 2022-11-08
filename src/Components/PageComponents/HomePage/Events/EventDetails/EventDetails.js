import React from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./EventDetails.css";
const EventDetails = () => {
  const id = useParams().id;
  const [event, setEvent] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  //fetch data from server
  React.useEffect(() => {
    fetch(`http://localhost:5000/event/singleevent/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setEvent(data.data);
        setLoading(false);
      });
  }, [id]);
  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  const eventLocation = JSON.parse(event.event_location);
  const locationStr = eventLocation[0].address + "," + eventLocation[0].city;
  return (
    <div className="event-details ">
      <Container>
        <Card className="py-4 event-card shadow px-3">
          <Container>
            <h2 className="my-2">{event && event.event_name}</h2>
            <Row className="mt-2">
              <Col xs={12} md={8} className="mb-3">
                {event && (
                  <Image
                    src={event.event_banner_image[0].url}
                    thumbnail
                    rounded
                    fluid
                    className="w-100"
                  ></Image>
                )}
              </Col>
              <Col xs={12} md={4}>
                <div className=" bg-white rounded shadow p-3">
                  <p className="lead">
                    {" "}
                    <b>Host:</b> {event && event.event_organizer}
                  </p>
                  <p className="lead">
                    {" "}
                    <b>Email:</b> {event && event.event_organizer_email}
                  </p>
                  <p className="lead">
                    {" "}
                    <b>Phone:</b> {event && event.event_organizer_mobile}
                  </p>

                  <p className="lead">
                    {" "}
                    <b>Website:</b>{" "}
                    {event.event_organizer_website === "" ? (
                      "Not Available"
                    ) : (
                      <a
                        href={event.event_organizer_website}
                        className="text-primary"
                      >
                        {" "}
                        Click Here
                      </a>
                    )}
                  </p>
                  <p className="lead">
                    {" "}
                    <b>Facebook:</b>{" "}
                    {event.event_organizer_facebook === "" ? (
                      "Not Available"
                    ) : (
                      <a
                        href={event.event_organizer_facebook}
                        className="text-primary"
                      >
                        {" "}
                        Click Here
                      </a>
                    )}
                  </p>
                </div>
                {/* /////////////////////////////// */}
                <div className="venue bg-white rounded shadow p-3 mt-5">
                  <p className="lead">
                    <b>Venue:</b>{" "}
                    {event.event_type === "Online"
                      ? `${locationStr}(Online)`
                      : locationStr}
                  </p>
                  <p className="lead">
                    {" "}
                    <b>Date & Time:</b>{" "}
                    {event && event.event_time + " , " + event.event_date}
                  </p>
                  <p className="lead">
                    {" "}
                    <b>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-camera-video-fill"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5z"
                        />
                      </svg>{" "}
                    </b>
                    {event && event.event_type}
                  </p>
                </div>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col>
                <div className="description p-3">
                  <h3 className="mb-3">Description</h3>
                  <p className="lead">{event && event.event_description}</p>
                </div>
              </Col>
            </Row>
          </Container>
        </Card>
      </Container>
    </div>
  );
};

export default EventDetails;
