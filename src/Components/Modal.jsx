import React, { Component } from "react";
import "../styles/Modal.css";

class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topicName: "",
      teacherName: "",
      dateSelected: "",
      arrivalTimeChosen: "",
      departureTimeChosen: "",
    };
  }

  closeOnEscapeKeyPress = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      this.props.onClose();
    }
  };
  componentDidMount() {
    document.body.addEventListener("keydown", this.closeOnEscapeKeyPress);
    // cleanup of events
  }
  saveTask = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state),
    };
    const response = await fetch(
      "http://localhost:4000/programming-languages",
      requestOptions
    );
    // const data = await response.json();
    // this.setState({ postId: data.id });
  };
  handleSubmit = (event) => {
    this.saveTask();
    this.props.onClose();
    event.preventDefault();
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    let {
      topicName,
      teacherName,
      dateSelected,
      arrivalTimeChosen,
      departureTimeChosen,
    } = this.state;
    return (
      <div className="modal" onClick={this.props.onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4 className="modal-title">TASK DETAILS</h4>
              <button className="button" onClick={this.props.onClose}>
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
          <div className="modal-body">
            <form onSubmit={this.handleSubmit}>
              <label>Enter Teacher Name: </label>
              <input
                type="text"
                value={teacherName}
                name="teacherName"
                onChange={this.handleChange}
              />{" "}
              <br /> <br />
              <label>Enter Topic Name: </label>
              <input
                type="text"
                value={topicName}
                name="topicName"
                onChange={this.handleChange}
              />{" "}
              <br /> <br />
              
              <h4>Select Batch</h4>
              <label for="datePicked">Select Date: </label>
              <input
                type="date"
                value={dateSelected}
                onChange={this.handleChange}
                name="dateSelected"
              />{" "}
              <br /> <br />
              <label>Arrival Time: </label>
              <input
                type="time"
                value={arrivalTimeChosen}
                onChange={this.handleChange}
                name="arrivalTimeChosen"
              />{" "}
              <br /> <br />
              <label for="departureTimingChose">Departure Time: </label>
              <input
                type="time"
                value={departureTimeChosen}
                onChange={this.handleChange}
                name="departureTimeChosen"
              />{" "}
              <br /> <br />
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
