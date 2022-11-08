import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const EventCard = (props) => {
  const { event } = props;

  return (
    <>
      <Card className="w-100 shadow">
        <Card.Body>
          <Card.Title>{event.event_name.substring(0, 80)}...</Card.Title>
          <Card.Subtitle className="mb-2 text-muted d-flex justify-content-between">
            <span>{event.event_category}</span>
            <span>{event.event_date}</span>
          </Card.Subtitle>
          <Card.Text>{event.event_description.substring(0, 100)}...</Card.Text>
          <Link to={`/event/${event._id}`}>
            {" "}
            <button className="btn btn-dark d-block ms-auto">View More</button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
};

export default EventCard;
