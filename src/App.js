import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import HeaderWithRouter from "./components/HeaderWithRouter";
import Profile from "./components/Profile";
import Talk from "./components/Talk";

import axios from "axios";
import React, { useEffect } from "react";

const Two = () => <h1>Two</h1>;

const App = () => {
  useEffect(() => {
    async function test() {
      const response = await axios.get("/test");
      console.log(response.data);
    }
    test();
  });

  return (
    <div className="App">
      <Router>
        <HeaderWithRouter />
        <Container>
          <Route path="/" exact component={Profile} />
          <Route path="/talk" exact component={Talk} />
          <Route path="/two" exact component={Two} />
        </Container>
        <section></section>
      </Router>
    </div>
  );
};

export default App;
