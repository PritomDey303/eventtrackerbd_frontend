import axios from "axios";
import React from "react";
import { Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext, ToastContext } from "../../../App";

const YourEvent = () => {
  const [, user] = React.useContext(AuthContext);
  const [handleToast] = React.useContext(ToastContext);
  const [events, setEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [deleted, setDeleted] = React.useState(false);
  React.useEffect(() => {
    axios
      .get(`http://localhost:5000/event/your-events/${user._id}`)
      .then((res) => {
        //console.log(res.data);
        setEvents(res.data.data);
        setLoading(false);
      });
  }, [user._id, deleted]);
  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  //delete event
  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      fetch(`http://localhost:5000/event/delete/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            handleToast(data.message, "success");
            setDeleted(!deleted);
          } else {
            handleToast(data.message, "danger");
          }
        });
    }
  };

  return (
    <div
      style={{
        padding: "70px",
        paddingTop: "150px",
        background: "rgb(244, 244, 244)",
      }}
    >
      <Container>
        {events.length === 0 && (
          <h2 className="text-center text-danger py-5">No Event Found</h2>
        )}
        {events.length !== 0 && (
          <Table striped className="shadow" responsive="md">
            <thead>
              <tr>
                <th>No</th>
                <th>Event Name</th>
                <th>Category</th>
                <th>Date</th>
                <th>View Event</th>
                <th>Delete Event</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{event.event_name}</td>
                  <td>{event.event_category}</td>
                  <td>{event.event_date}</td>
                  <td>
                    <Link to={`/event/${event._id}`}>
                      <button className="btn btn-primary">View</button>
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(event._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </div>
  );
};

export default YourEvent;
