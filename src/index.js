import React from "react";
import ReactDOM from "react-dom";
import Images from "./Components/Images";
import Image from "./Components/Image";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from "./Components/Header";

import "./styles.css";

function App() {
  return (
    <Router>
      <Header />
      <Route exact path="/" component={Images} />
      <Route path="/photos" component={Image} />
    </Router>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
