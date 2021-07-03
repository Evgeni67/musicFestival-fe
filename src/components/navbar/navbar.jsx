import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { BrowserRouter as Router, Link } from "react-router-dom";
import axios from "axios";
import "./navbar.css";
import logo from "./logo.png";
import { FcGoogle } from "react-icons/fc";
class Navbar extends Component {
  render() {
    return (
      <>
        <Row className="">
          <Col> 1</Col> <Col> 4</Col> <Col> 4</Col>{" "}
        </Row>
      </>
    );
  }
}

export default Navbar;
