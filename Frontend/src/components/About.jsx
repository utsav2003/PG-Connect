import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const AboutUs = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <h2>About Us</h2>
          <h5 className="p-5" style={{ wordSpacing: "1em" }}>
            We’re on a mission to start a conversation with you and your
            customers in this fast connected world. Let’s discover, build and
            grow your digital business.
          </h5>
        </Col>
        <Col md={6}>
          <img
            src="img/select_house.png"
            alt="About Us"
            className="img-fluid"
          />
        </Col>
      </Row>

      <Row className="my-5">
        <Col md={6}>
          <img src="img/find_house.png" alt="About Us" className="img-fluid" />
        </Col>
        <Col md={6}>
          <h2>Our Mission and Vision</h2>
          <h5 className="p-5" style={{ wordSpacing: "1em" }}>
            Describe the mission and vision of your house rental platform.
            Explain what your goals are and how you aim to provide exceptional
            services to both property owners and renters.
          </h5>
          <h5 className="px-5" style={{ wordSpacing: "1em" }}>
            Showcase your dedication to meeting the needs and preferences of
            your customers. Explain how you prioritize customer satisfaction and
            how you strive to create a positive experience for all users of your
            platform.
          </h5>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;
