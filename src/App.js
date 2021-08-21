import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import HeaderWithRouter from "./components/HeaderWithRouter";
import Profile from "./components/Profile";
import Talk from "./components/Talk";
import Secret from "./components/Secret";
import Links from "./components/Links";

import { Cookies } from "react-cookie";
const cookies = new Cookies();

const App = () => {
  useEffect(() => {
    if (!cookies.get("SESSIONID")) {
      cookies.set("SESSIONID", "casper{you-are-guest}");
    }
  }, []);
  return (
    <div className="App">
      <Router>
        <HeaderWithRouter />
        <Container className="p-5">
          <Route path="/" exact component={Profile} />
          <Route path="/talk" exact component={Talk} />
          <Route path="/secret" exact component={Secret} />
          <Route path="/links" exact component={Links} />
        </Container>
        <section></section>
      </Router>
    </div>
  );
};

export default App;
