import logo from "./logo.svg";
import "./App.css";
import Login from "./components/login/loginPage";
import Navbar from "./components/navbar/navbar";
import HomePage from "./components/home/homePage";
import "bootstrap/dist/css/bootstrap.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />

          <Route path="/login">
            {" "}
            <Login />{" "}
          </Route>
          <Route path="/homePage">
            {" "}
            <HomePage />{" "}
          </Route>
        </Router>
      </div>
    );
  }
}

export default App;
