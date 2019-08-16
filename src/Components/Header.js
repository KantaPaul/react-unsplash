import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
export default class Header extends React.Component {
  render() {
    return (
      <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
        <nav className="my-2 my-md-0 mr-md-3">
          <Link className="p-2 text-dark" to="/">
            Home
          </Link>
        </nav>
      </div>
    );
  }
}
