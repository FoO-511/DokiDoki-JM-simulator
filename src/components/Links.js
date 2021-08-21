import React, { useEffect, useState } from "react";
import { Card, Container, Row, Alert } from "react-bootstrap";
import ForJM from "./ForJM";
import axios from "axios";
import { useSpring, animated } from "react-spring";

import { Cookies } from "react-cookie";
const cookies = new Cookies();

const Links = () => {
  const slide = useSpring({
    to: {
      scale: "1",
      opacity: "1",
      translateX: "0",
    },
    from: { scale: "1", opacity: "0", translateX: "-10px" },
    config: { duration: 500 },
  });

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

  const [isJm, setIsJm] = useState(false);
  useEffect(() => {
    async function checkCookie() {
      if (cip !== "127.0.0.1") {
        const res = await axios.get(
          `/api/checkCookie?cookie=${cookies.get("SESSIONID")}&cip=${cip}`
        );
        setIsJm(res.data);
      }
    }
    checkCookie();
  }, [cip]);

  const [links, setLinks] = useState();
  useEffect(() => {
    async function tmp() {
      if (cip !== "127.0.0.1") {
        const response = await axios.get(`/api/read?cip=${cip}`);
        setLinks(response.data.split("\n"));
      }
    }
    tmp();
  }, [cip]);

  if (isJm) {
    return (
      <Container>
        <Row>
          {console.log(links)}
          {links && links[0] !== "" ? (
            links[1] &&
            links.map((link, index) => {
              return (
                <>
                  {link && (
                    <animated.div style={slide}>
                      <Card bg="light" className="m-1">
                        <Card.Body>
                          <Card.Text>
                            <a
                              key={index}
                              href={link}
                              style={{ color: "black" }}
                              className="JM-links"
                              target="JM-win"
                            >
                              {link}
                            </a>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </animated.div>
                  )}
                </>
              );
            })
          ) : (
            <animated.div style={slide}>
              <Alert variant="warning">링크 파일에 링크가 없어요~~~~😡</Alert>
              <Alert variant="warning">30분마다 지워짐ㅎ</Alert>
            </animated.div>
          )}
        </Row>
      </Container>
    );
  } else {
    return <ForJM />;
  }
};

export default Links;
