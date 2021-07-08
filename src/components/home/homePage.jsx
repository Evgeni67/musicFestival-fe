import React, { Component } from "react";
import { Row, Col, Container, Modal } from "react-bootstrap";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./homePage.css";
import { AiFillEye } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { ImBin } from "react-icons/im";
import logo from "./loader.gif";
class homePage extends Component {
  state = {
    showAddSectionModal: false,
    liveUrl: "",
    bandName: "",
    liveSections: [],
    currentComment: "",
    loaded: false,
    picPreview: "",
    sectionsLoaded: false,
    currentLiveSection: {},
  };
  componentDidMount = async () => {
    this.setState({ sectionsLoaded: false })
    setTimeout(() => this.setState({ loaded: true }), 3000);
    console.log("data");
  await this.getLiveSections()
  this.setState({ sectionsLoaded: true })
  };
  addComment = async() => {
    const url = process.env.REACT_APP_URL;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
       text:this.state.currentComment,
       user:localStorage.getItem("username")
      }),
    };
    await fetch(url + "/liveSections/addComment/" + this.state.currentLiveSection._id, requestOptions)
      .then((response) => response.json())
      .then((data) => this.setState({currentLiveSection:data})); //use socket here to send the new live to the people
      document.querySelector(".commentInput").value = ""
  }
  getLiveSections = async() => {
    const url = process.env.REACT_APP_URL;
    const requestOptions = {
      method: "GET",
    };
    await fetch(url + "/liveSections/getLiveSections", requestOptions)
      .then((response) => response.json())
      .then((data) => this.setState({ liveSections: data })); //use socket here to send the new live to the people
    this.setState({ currentLiveSection: this.state.liveSections[0] });
    setTimeout(() => this.setState({ sectionsLoaded: true }), 3000);
  }
  changeLiveUrl = (e) => {
    this.setState({ liveUrl: e.currentTarget.value });
    console.log(this.state.liveUrl);
  };
  changePicPreview = (e) => {
    this.setState({ picPreview: e.currentTarget.value });
  };
  changeBandName = (e) => {
    this.setState({ bandName: e.currentTarget.value });
  };
  changeCurrentComment = (e) => {
    this.setState({ currentComment: e.currentTarget.value });
  };
  handleClose = () => {
    this.setState({ showAddSectionModal: false });
  };
  deleteLiveSection = async (id) => {
    const url = process.env.REACT_APP_URL;
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    await fetch(url + "/liveSections/deleteLiveSection/" + id, requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data)); //use socket here to send the new live to the people
      await this.getLiveSections()
  };
  addLiveSection = async () => {
    console.log("wtf");
    const url = process.env.REACT_APP_URL;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        performerName: this.state.bandName,
        liveUrl: this.state.liveUrl,
        picPreview: this.state.picPreview,
        likes: 0,
        dislikes: 0,
        views: 0,
        comments: [],
      }),
    };
    await fetch(url + "/liveSections/addLiveSection", requestOptions)
      .then((response) => response.json())
      .then((data) => this.setState({ liveSections: data })); //use socket here to send the new live to the people
  };
  render() {
    return (
      <>
        <img
          className="backgroundImage"
          src="https://media.pitchfork.com/photos/5cd6e9dbf2bde60bccaaced5/16:9/w_1920,h_1080,c_limit/Rolling%20Loud%202019.png"
        />

        <Row className="theatreRow d-flex justify-content-center">
          <Col sm={2}></Col>
          <Col sm={8} xs={12}>
            {this.state.sectionsLoaded ? (
              <>
                <Row className="d-flex justify-content-center">
                  <Container className="theatre">
                    {!this.state.loaded ? (
                      <img src={logo} className="loader" />
                    ) : (
                      <iframe
                        className="theatre"
                        width="560"
                        height="315"
                        src={this.state.currentLiveSection.liveUrl}
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    )}
                  </Container>

                  <Row className="detailsRow d-flex justify-content-center">
                    <Col className="likeCol">
                      <AiFillLike className="like" />
                      <h className="likesCount">
                        {this.state.currentLiveSection.likes}{" "}
                      </h>
                      <AiFillDislike className="dislike" />
                      <h className="dislikesCount">
                        {this.state.currentLiveSection.dislikes}{" "}
                      </h>
                    </Col>
                    <Col className="detailsName">
                      {this.state.currentLiveSection.performerName}{" "}
                    </Col>
                    <Col className="watchCol">
                      <AiFillEye className="view" />{" "}
                      {this.state.currentLiveSection.views}{" "}
                    </Col>
                  </Row>
                  <Container className="scroll">
                    {this.state.currentLiveSection.comments.length === 0 ? (
                      "Add a comment"
                    ) : (
                      <>
                        {" "}
                        {this.state.currentLiveSection.comments.map(comment => (<Row>
                          {" "}
                          <h className="dot" />
                          <Col>
                            <text className="commentName">{comment.user}</text>
                            <text className="comment">{comment.text}</text>
                          </Col>
                        </Row>))}
                        
                       
                      </>
                    )}
                  </Container>
                  <Row className="commentInputRow d-flex justify-content-center">
                    <Col>
                      {" "}
                      <input
                        className="commentInput"
                        type="text"
                        id="fname"
                        name="fname"
                        placeholder="  Type your comment here"
                        onChange={(e) => this.changeCurrentComment(e)}
                      />
                      <button className="sendCommentBtn" onClick = {()=>this.addComment()}>Submit </button>
                    </Col>
                  </Row>
                </Row>{" "}
              </>
            ) : (
              <img src={logo} className="loader" />
            )}
          </Col>
          <Col sm={2} xs={12}>
            {" "}
            <button
              onClick={() => this.setState({ showAddSectionModal: true })}
            >
              Add Live Section
            </button>
            <Row className="d-flex justify-content-center">
              <Container className="scrollOtherVideos">
                {this.state.sectionsLoaded ? (
                  <>
                    {this.state.liveSections.map((section) => (
                      <>
                        <Row className="previewName d-flex justify-content-center">
                          <Col></Col> <Col>{section.performerName} </Col>{" "}
                          <Col>
                            <ImBin
                              className="deleteSectionBtn"
                              onClick={() =>
                                this.deleteLiveSection(section._id)
                              }
                            />
                          </Col>
                        </Row>
                        <Row className="d-flex justify-content-center">
                          <img
                            src={section.picPreview}
                            className="picPreview mb-3"
                            onClick={() =>
                              this.setState({ currentLiveSection: section })
                            }
                          />
                        </Row>
                      </>
                    ))}{" "}
                  </>
                ) : (
                  <img src={logo} className="loader2" />
                )}
              </Container>
            </Row>
          </Col>
        </Row>
        <Modal
          show={this.state.showAddSectionModal}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Body>
            <Row className="modalText d-flex justify-content-center">
              Add New Live Section
            </Row>
            <Row className="d-flex justify-content-center">
              <input
                className="modalInput text-align-center shadow-lg"
                type="text"
                id="fname"
                name="fname"
                placeholder="Band Name"
                onChange={(e) => this.changeBandName(e)}
              />
            </Row>
            <Row className="d-flex justify-content-center mt-1">
              <input
                className="modalInput text-align-center shadow-lg"
                type="text"
                id="fname"
                name="fname"
                placeholder="Live Url"
                onChange={(e) => this.changeLiveUrl(e)}
              />
              <input
                className="modalInput text-align-center shadow-lg mt-1"
                type="text"
                id="fname"
                name="fname"
                placeholder="Pic Preview"
                onChange={(e) => this.changePicPreview(e)}
              />
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={() => this.handleClose()}>Close</button>
            <button variant="primary" onClick={() => this.addLiveSection()}>
              Add
            </button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default homePage;
