import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./navbar.css";
import logo from "./logo.png";
class Navbar extends Component {
  render() {
    return (
      <>
        <Row className="navbar d-flex justify-content-center">
          <Row className="d-flex justify-content-center">
            {" "}
            <img src={logo} className="navLogo" />
          </Row>{" "}
            {" "}
              <Row className = "navRow d-flex justify-content-between">
                {" "}
                <Col className="navBtn"lg={3} sm={3} xs={4}>
                  Gallery
                </Col>{" "}
                <Col className="navBtn" lg={3} sm={3} xs={4}>
                  Live
                </Col>{" "}
                <Col className="navBtn" lg={3} sm={3} xs={4}>
                  About
                </Col>{" "}
              </Row>
        </Row>
      </>
    );
  }
}

export default Navbar;
