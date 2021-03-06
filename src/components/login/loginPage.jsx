import React, { Component } from "react";
import { Row, Container } from "react-bootstrap";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./login.css";
import logo from "./logo.png";
import { FcGoogle } from "react-icons/fc";
class Login extends Component {
  state = {
    email: "",
    password: "",
    loggingIn: false,
    register: false,
  };
  saveTokensLocally = (data1) => {
    console.log(data1);
    const data = data1[0];
    console.log("TOKENS", data);
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("username", this.state.email);
    this.setState({ logged: true });
    this.setState({ loggingIn: false });
    // socket.emit("login", data1[1]);
    window.location = "/homePage";
  };
  changeEmail = (e) => {
    this.setState({ email: e.currentTarget.value });
  };
  componentDidMount = () => {
    localStorage.setItem("user", "Guest");
  };
  changePassword = (e) => {
    this.setState({ password: e.target.value });
  };
  register = async() => {
    this.setState({ loading: true });
    const url = process.env.REACT_APP_URL;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: this.state.email,
        password: this.state.password,
        isAdmin:false,
        online:false,
        tokens:[]
      }),
    };
    await fetch(url + "/profiles/register", requestOptions)
      .then((response) => response.json())
      .then((data) => this.setState({register:false}));
    if (false) {
    } else {
    }
  }
  login = async () => {
    this.setState({ loggingIn: true });
    this.setState({ loading: true });
    const url = process.env.REACT_APP_URL;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    };
    await fetch(url + "/profiles/login", requestOptions)
      .then((response) => response.json())
      .then((data) => this.saveTokensLocally(data));
    if (false) {
    } else {
    }
  };
  render() {
    return (
      <>
        <Row className="center">
          <Container className="loginContainer shadow-lg">
            <img
              className="backgroundImage"
              src="https://media.pitchfork.com/photos/5cd6e9dbf2bde60bccaaced5/16:9/w_1920,h_1080,c_limit/Rolling%20Loud%202019.png"
            />
            <Row className="logoRow d-flex justify-content-center">
              <img src={logo} className="logo" />
            </Row>

            {this.state.register ? (
              <>
              {" "}
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
                  placeholder="????*********????"
                  onChange={(e) => this.changePassword(e)}
                />
              </Row>
              <Row className="d-flex justify-content-center">
                {" "}
                <input
                  className="passwordLogin text-align-center"
                  type="password"
                  id="fname"
                  name="fname"
                  placeholder="????*********????"
                  onChange={(e) => this.changePassword(e)}
                />
              </Row>
              <Row className="loginBtnRow d-flex justify-content-center mt-3">
                <button className="loginBtn" onClick={() => this.register()}>
                  {this.state.loggingIn ? "" : "Register"}{" "}
                </button>
              </Row>{" "}
            </>
            ) : (
              <>
                {" "}
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
                    placeholder="????*********????"
                    onChange={(e) => this.changePassword(e)}
                  />
                </Row>
                <Row className="loginBtnRow d-flex justify-content-center mt-3">
                  <button className="loginBtn" onClick={() => this.login()}>
                    {this.state.loggingIn ? "" : "Login"}{" "}
                  </button>
                </Row>{" "}
              </>
            )}

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
        <Row className="center">
          <Container className="loginRegisterContainer">
            <Row className="loginRegisterRow d-flex justify-content-center">
              <p className="loginRegisterText1">Do not have an account? </p>{" "}
              <p
                className="loginRegisterText"
                onClick={() => this.setState({ register: true })}
              >
                Register
              </p>
            </Row>
          </Container>
        </Row>
      </>
    );
  }
}

export default Login;
