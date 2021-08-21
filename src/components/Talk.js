import { useState, useEffect } from "react";
import {
  Container,
  Button,
  Form,
  Row,
  Col,
  Card,
  Badge,
} from "react-bootstrap";
import { Redirect } from "react-router-dom";
import JMH from "../img/JM_happy.png";
import JMS from "../img/JM_sad.png";
import scripts from "./scripts.json";
import { useSpring, animated } from "react-spring";

import axios from "axios";

const Minibell = ({
  isSad,
  sen,
  isInput,
  placeholder,
  link,
  setLink,
  setSeq,
  seq,
  end,
  senId,
}) => {
  const jump = useSpring({
    to: async (next, cancel) => {
      await next({ scale: "1.1" });
      await next({ scale: "1" });
    },
    from: { scale: "1" },
    config: { duration: 100 },
  });
  const [slide, api] = useSpring(() => ({
    to: {
      scale: "1",
      opacity: "1",
      translateX: "0",
    },
    from: { scale: "1", opacity: "0", translateX: "-10px", reset: true },
  }));
  useEffect(() => {
    api.set({ scale: "1", opacity: "0", translateX: "-10px", reset: true });
    api.start({
      scale: "1",
      opacity: "1",
      translateX: "0",
    });
  }, [sen, api]);

  const [cip, setCip] = useState("127.0.0.1");
  useEffect(() => {
    async function getIpClient() {
      try {
        const response = await axios.get("https://api.ipify.org?format=json");
        setCip(response.data["ip"]);
      } catch (error) {
        console.error(error);
      }
    }
    getIpClient();
  }, []);

  async function sendLink() {
    await axios.get(`/api/write?test=${link}&cip=${cip}`);
  }

  const [ans, setAns] = useState();

  const onAnsHandler = () => {
    if ((seq === 5) & (ans === "y")) {
      setSeq(7);
    } else if (seq === 6) {
      setSeq(100);
    } else if (seq === 13) {
      setSeq(103);
    } else if (seq === 12) {
      setLink(ans);
      setSeq(seq + 1);
    } else {
      setSeq(seq + 1);
    }
    setAns("");
  };
  if (seq === 103) {
    return (
      <Row className="d-flex justify-content-center">
        <Col>
          <animated.img
            src={JMH}
            alt="jongmin happy"
            width="400px"
            style={jump}
          />
        </Col>
        <Col className="d-flex align-items-center">
          <Card>
            <Card.Body>
              <animated.div style={slide}>
                <Card.Title>종민</Card.Title>
                <Card.Text style={{ width: "23rem" }}>
                  <a href={link}>
                    <Badge bg="dark">{link}</Badge>
                  </a>{" "}
                  여기 자주 들어가서 확인해볼게.
                </Card.Text>
                <Button
                  variant="dark"
                  onClick={() => {
                    onAnsHandler();
                    sendLink();
                  }}
                >
                  다음
                </Button>
              </animated.div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }

  if (!end) {
    return (
      <Row className="d-flex justify-content-center">
        <Col>
          {isSad ? (
            <animated.img
              src={JMS}
              alt="jongmin sad"
              width="400px"
              style={jump}
            />
          ) : (
            <animated.img
              src={JMH}
              alt="jongmin happy"
              width="400px"
              style={jump}
            />
          )}
        </Col>
        <Col className="d-flex align-items-center">
          <Card>
            <Card.Body>
              {isInput && sen ? (
                <animated.div style={slide}>
                  <Card.Title>종민에게</Card.Title>
                  <Card.Text style={{ width: "23rem" }}>
                    <Form.Control
                      type="text"
                      onChange={(e) => {
                        setAns(e.target.value);
                      }}
                      style={{ width: "23rem" }}
                      placeholder={placeholder}
                    />
                  </Card.Text>
                  <Button
                    variant="dark"
                    onClick={() => {
                      onAnsHandler();
                    }}
                  >
                    라고 말하기..
                  </Button>
                </animated.div>
              ) : (
                <animated.div style={slide}>
                  <Card.Title>종민</Card.Title>

                  <Card.Text style={{ width: "23rem" }}>
                    {sen && sen}
                    {!sen && "..."}
                  </Card.Text>
                  <Button
                    variant="dark"
                    onClick={() => {
                      onAnsHandler();
                    }}
                  >
                    다음
                  </Button>
                </animated.div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  } else {
    return <Redirect to="/"></Redirect>;
  }
};

const Talk = () => {
  const [link, setLink] = useState();
  const [seq, setSeq] = useState(1);
  return (
    <Container className="h-100 ">
      <Minibell
        isInput={scripts[seq]["isInput"]}
        placeholder={scripts[seq]["placeholder"]}
        isSad={scripts[seq]["isSad"]}
        sen={scripts[seq]["sen"]}
        senId={scripts[seq]["id"]}
        end={scripts[seq]["end"]}
        seq={seq}
        setSeq={setSeq}
        link={link}
        setLink={setLink}
      />
    </Container>
  );
};

export default Talk;
