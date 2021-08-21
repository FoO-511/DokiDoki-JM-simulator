import React, { useEffect, useState } from "react";
import { Card, Container, Row } from "react-bootstrap";
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
  });
  const [links, setLinks] = useState();
  const [isJm, setIsJm] = useState(false);
  useEffect(() => {
    async function tmp() {
      const response = await axios.get("/api/read?");
      setLinks(response.data.split("\n"));
    }
    tmp();
  }, []);

  useEffect(() => {
    async function checkCookie() {
      const res = await axios.get(
        `/api/checkCookie?cookie=${cookies.get("SESSIONID")}`
      );
      setIsJm(res.data);
    }
    checkCookie();
  }, []);

  if (isJm) {
    return (
      <Container>
        <Row>
          {links &&
            links[1] &&
            links.map((link, index) => {
              return (
                <animated.div style={slide}>
                  <Card bg="light" className="m-1">
                    <Card.Body>
                      <Card.Text>
                        <a key={index} href={link} style={{ color: "black" }}>
                          {link}
                        </a>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </animated.div>
              );
            })}
        </Row>
      </Container>
    );
  } else {
    return <ForJM />;
  }
};

export default Links;
