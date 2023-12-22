import React from "react";
import { Carousel } from "react-bootstrap";

const Slider = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="img/1.jpg"
          alt="First slide"
          style={{ height: "40em" }}
        />
        <Carousel.Caption className="d-flex align-items-center justify-content-start">
          <div>
            <h3 style={{ fontSize: "5em" }}>Find your best deal here.</h3>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="img/2.jpg"
          alt="Second slide"
          style={{ height: "40em" }}
        />
        <Carousel.Caption className="d-flex align-items-center justify-content-start">
          <div>
            <h3 style={{ fontSize: "5em" }}>Home is just a lease away.</h3>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="img/3.jpg"
          alt="Third slide"
          style={{ height: "40em" }}
        />
        <Carousel.Caption className="d-flex align-items-center justify-content-start">
          <div>
            <h3 style={{ fontSize: "5em" }}>Lease the life you want.</h3>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Slider;
