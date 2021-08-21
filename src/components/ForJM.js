import React from "react";
import { Container, Row, Alert } from "react-bootstrap";

const ForJM = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center pt-5">
      <Row>
        <Alert variant="warning">종mini만 볼 수 있는 페이지 입니다😥</Alert>
      </Row>
    </Container>
  );
};

export default ForJM;
