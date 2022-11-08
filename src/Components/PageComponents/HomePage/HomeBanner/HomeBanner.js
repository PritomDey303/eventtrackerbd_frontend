import React from "react";
import { Carousel } from "react-bootstrap";

const HomeBanner = () => {
  const images = [
    {
      id: 1,
      image:
        "https://highattendance.com/wp-content/uploads/2020/03/Virtual-Events-Online-1500x430.jpg",
    },
    {
      id: 2,
      image: "https://parker-design.co.uk/assets/virtual-events-1.jpg",
    },
    {
      id: 3,
      image:
        "https://www.the-future-of-commerce.com/wp-content/uploads/2020/03/ow-to-create-a-virtual-event-1200x630.jpg",
    },
  ];
  return (
    <div style={{ height: "75vh", paddingTop: "20px" }}>
      <Carousel fade indicators={false}>
        {images.map((image) => (
          <Carousel.Item key={image.id} interval={3000}>
            <img
              className="d-block w-100"
              style={{ height: "75vh" }}
              src={image.image}
              alt="First slide"
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default HomeBanner;
