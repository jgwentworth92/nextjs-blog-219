import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const MainContent = () => (
  <Container className="my-5">
    <Row className="p-4 pb-0 pe-lg-0 pt-lg-0 align-items-center rounded-3 border shadow-lg">
      <Col lg={7} className="p-3 p-lg-3 pt-lg-1">
        <h1 className="display-6 fw-bold lh-1">Revolutionize your teaching</h1>
        <p className="lead">
          Empower your students with cutting-edge software engineering skills.
          Join MyWebClass and discover advanced technologies that will transform
          your teaching and their learning journey.
        </p>
        <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
          <Button className="btn-lg px-4 me-md-2 fw-bold" variant="success">
            Start Here
          </Button>
        </div>
      </Col>
      <Col lg={4} className="offset-lg-1 p-0 overflow-hidden shadow-lg">
        <img
          className="rounded-lg-3 img-fluid"
          src="/teacher.gif"
          alt="a teacher with students"
          width="720"
        />
      </Col>
    </Row>
  </Container>
);

export default MainContent;
