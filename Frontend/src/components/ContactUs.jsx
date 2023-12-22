import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const ContactUs = () => {
  return (
    <div>
      <Container className="mt-5">
        <h1 className="my-5">Contact Us</h1>
        <Row>
          <Col md={6}>
            <img
              src="img/contact_us.png"
              alt="About Us"
              className="img-fluid"
            />
          </Col>
          <Col md={6}>
            <Form style={{ fontWeight: "bold", textAlign: "left" }}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Your Name"
                  className="mb-3"
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Your Email"
                  className="mb-3"
                />
              </Form.Group>

              <Form.Group controlId="formMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  placeholder="Your Message"
                  className="mb-3"
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <div className="m-5">
        <h5>
          Have questions or need assistance? Reach out to us and we'll be happy
          to help!
        </h5>
        <h5>Contact us through the form or via email or phone.</h5>
      </div>
    </div>
  );
};

export default ContactUs;
