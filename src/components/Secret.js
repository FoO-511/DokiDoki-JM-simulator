import React, { useEffect, useState } from "react";
import { Card, Accordion } from "react-bootstrap";
import ForJM from "./ForJM";
import axios from "axios";
import AGMR from "../img/AGMR.png";
import BRT from "../img/BRT.png";
import MRGG from "../img/MRGG.png";
import TY from "../img/TY.png";
import WhatisThis from "../img/WhatisThis.png";
import YesNo from "../img/YesNo.png";

import { Cookies } from "react-cookie";
const cookies = new Cookies();
const Secret = () => {
  const imgs = [
    {
      date: "8월 13일",
      img: MRGG,
      info: "아~ BoB(Best of Bestㅎ) CTF개어렵네~",
    },
    {
      date: "8월 15일",
      img: AGMR,
      info: "과제가 안풀린다. 하지만 나는 세계최강 bell mini이니 괜찮아!",
    },
    {
      date: "8월 18일",
      img: TY,
      info: "CSS Injection이 다 있네.",
    },
    {
      date: "8월 20일",
      img: WhatisThis,
      info: "집에 바퀴벌레가 나왔다. 냥냥이가 잡아줬다.",
    },
    {
      date: "8월 21일",
      img: BRT,
      info: "부리또 2번세트가 먹고 싶다.. ",
    },
    {
      date: "8월 24일",
      img: YesNo,
      info: "곧 개강이다. 학교 가기 싫다. 삼성전자가 내 등록금을 빼앗아 갔다.",
    },
  ];

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

  if (isJm) {
    return (
      <Card>
        <Card.Body>
          <Card.Title>🔔mini의 비밀일기...</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            mini 말고 보지 말 것 !! 😡😠
          </Card.Subtitle>
        </Card.Body>
        <Accordion>
          {imgs &&
            imgs.map((v, index) => (
              <Accordion.Item eventKey={index}>
                <Accordion.Header>{v["date"]}</Accordion.Header>
                <Accordion.Body>
                  {v["info"]}
                  <br />
                  <img src={v["img"]} alt={v["img"]} width="300px" />
                </Accordion.Body>
              </Accordion.Item>
            ))}
        </Accordion>
      </Card>
    );
  } else {
    return <ForJM />;
  }
};

export default Secret;
