import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./homePage.css";
class homePage extends Component {
  render() {
    return (
      <>
         <img
              className="backgroundImage"
              src="https://media.pitchfork.com/photos/5cd6e9dbf2bde60bccaaced5/16:9/w_1920,h_1080,c_limit/Rolling%20Loud%202019.png"
            />
        <Row className="theatreRow d-flex justify-content-center">
          <Container className="theatre">
            <iframe
            className="theatre"
              width="560"
              height="315"
              src="https://www.youtube.com/embed/YPRH2GMWv2o"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </Container>
          <Row className="commentSectionRow d-flex justify-content-center">
          <Container className="scroll">
     <Row className = "dot"> </Row>
     <Row className = "dot"> </Row>
     <Row className = "dot"> </Row>
     <Row className = "dot"> </Row>
     <Row className = "dot"> </Row>
     <Row className = "dot"> </Row>
     <Row className = "dot"> </Row>
     <Row className = "dot"> </Row>
     <Row className = "dot"> </Row>
     <Row className = "dot"> </Row>
          </Container>
          </Row>
        </Row>
      </>
    );
  }
}

export default homePage;
