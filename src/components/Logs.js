import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import ForJM from "./ForJM";
import axios from "axios";
import { useSpring, animated } from "react-spring";

import { Cookies } from "react-cookie";
const cookies = new Cookies();

const Logs = () => {
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

  const [logs, setLogs] = useState();
  useEffect(() => {
    async function tmp() {
      if (cip !== "127.0.0.1") {
        const response = await axios.get(`/api/read-log?cip=${cip}`);
        setLogs(response.data);
      }
    }
    tmp();
  }, [cip]);

  if (isJm) {
    return <ReactMarkdown children={logs} />;
  } else {
    return <ForJM />;
  }
};

export default Logs;
