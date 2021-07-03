import React, { Component } from "react";
import {
  Row,
  Col,
  Container,
} from "react-bootstrap";
import { BrowserRouter as Router,  Link } from "react-router-dom";
import axios from "axios";
import "./login.css";
import logo from "./logo.png"
import { FcGoogle } from "react-icons/fc";
class Login extends Component {
  state = {
    email: "",
    password: "",
    loggingIn:false,
  };
  changeEmail = (e) => {
    this.setState({ email: e.currentTarget.value });
  };
  componentDidMount = () => {
    localStorage.setItem("user", "Guest")
  }
  changePassword = (e) => {
    this.setState({ password: e.target.value });
  };
  login = async () => {
    this.setState({ loggingIn: true });
    const url = process.env.REACT_APP_URL;
    this.setState({ loading: true });
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: {
        email: this.state.email,
        password: this.state.password,
      },
    };
    const res = await axios(url + "/profile/login", requestOptions);
    if (res.status === 200) {
      console.log(res);
      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('user', this.state.email);
      this.setState({ loggingIn: false });
  localStorage.setItem('refreshToken', res.data.refreshToken);
      window.location = "/home"
    } else {
      console.log(res);
    }
  };
  render() {
    return (
      <>
      <Row className = "center">
        <Container className="loginContainer shadow-lg">
          <img  className = "backgroundImage" src = "https://media.pitchfork.com/photos/5cd6e9dbf2bde60bccaaced5/16:9/w_1920,h_1080,c_limit/Rolling%20Loud%202019.png"/>
          <Row className="logoRow d-flex justify-content-center">
            <img src = {logo} className = "logo"/>
          </Row>
          <Row className="d-flex justify-content-center">
            <input
              className="emailLogin text-align-center shadow-lg"
              type="text"
              id="fname"
              name="fname"
              placeholder="Username"
              onChange={(e) => this.changeEmail(e)}
            />
          </Row>
          <Row className="d-flex justify-content-center">
            {" "}
            <input
              className="passwordLogin text-align-center"
              type="password"
              id="fname"
              name="fname"
              placeholder="🔒*********🔒"
              onChange={(e) => this.changePassword(e)}
            />
          </Row>
          <Row className="loginBtnRow d-flex justify-content-center mt-3">
            <button className={this.state.loggingIn ? "loginBtnLoading" : "loginBtn"} onClick = {() => this.login()}>{this.state.loggingIn ? "" : "Login"} </button>
          </Row>
          <Row className="loginGoogleRow d-flex justify-content-center ">
            <FcGoogle className="googleIcon" />{" "}
            <p className="googleText">Login with Google </p>
          </Row>
          <Row className="forgottenPassRow d-flex justify-content-center ">
            {" "}
            <p className="forgottenPassText">Forgotten password? </p>
          </Row>
        </Container>
        </Row>
        <Row className = "center">
        <Container className="loginRegisterContainer">
          <Row className="loginRegisterRow d-flex justify-content-center">
            <p>Do not have an account? </p>{" "}
              <p className="loginRegisterText">Register</p>
          </Row>
        </Container>
 </Row>
      </>
    );
  }
}

export default Login;
