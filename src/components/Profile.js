import { Container, Col, Row, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import JMH from "../img/JM_happy.png";
import AnimateCardContainer from "./AnimateCardContainer";

const Profile = (props) => {
  return (
    <Container>
      <br />
      <Row>
        <h2>Profile</h2>
      </Row>
      <Row className="align-items-center d-flex justify-content-center">
        <Col>
          <AnimateCardContainer>
            <img src={JMH} alt="gongmin-happy" width="500px" />
          </AnimateCardContainer>
        </Col>
        <Col>
          <AnimateCardContainer>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>종민</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Bell mini <br /> height: 1m <br /> weight: 1kg <br /> 캐스퍼
                  대표 츤데레
                </Card.Subtitle>
                <Card.Text>
                  (구)준회원들과 즐거운 한 잔 뒤.. 돌연 BOB로 떠나버린 그.
                  <br />
                  최근 과제 폭탄으로 고민이 생겼다는데..?!
                </Card.Text>
                <Link to="/talk">
                  <Button variant="dark">말 걸러 가기!</Button>
                </Link>
              </Card.Body>
            </Card>
          </AnimateCardContainer>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
