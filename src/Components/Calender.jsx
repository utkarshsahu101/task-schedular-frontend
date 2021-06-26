import React, { Component } from "react";
import moment from "moment";
import Modal from "./Modal";

class Calender extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dateObject: moment(),
      isModalOpen: false,
      teachersList: [],
    };
  }

  firstDayOfMonth = () => {
    let dateObject = this.state.dateObject;
    let firstDay = moment(dateObject).startOf("month").format("d");
    return firstDay;
  };

  getCurrentDay = () => {
    return this.state.dateObject.format("D");
  };

  getCurrentMonth = () => {
    return this.state.dateObject.format("MMMM");
  };

  getCurrentYear = () => {
    return this.state.dateObject.format("Y");
  };

  onClose = () => {
    this.setState({ isModalOpen: false });
  };

  callAPI = () => {
    fetch("http://localhost:4000/programming-languages")
      .then((res) => res.json())
      .then(
        (res) => {
          let { success, data: teacherData } = res;
          if (success) {
            this.setState({
              teachersList: teacherData,
            });
          } else {
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };
  componentDidMount() {
    this.callAPI();
  }
  render() {
    let { dateObject } = this.state;
    let weekdayshort = moment.weekdaysShort();
    let weekdayshortname = weekdayshort.map((day) => {
      return (
        <div
          style={{
            color: "#fff",
            width: "100px",
            display: "flex",
            justifyContent: "center",
          }}
          key={day}
        >
          {day}
        </div>
      );
    });

    let blankCellsInMonth = [];
    for (let index = 0; index < this.firstDayOfMonth(); index++) {
      blankCellsInMonth.push(
        <div style={{ width: "100px", backgroundColor: "#dfd9d9" }}>{""}</div>
      );
    }

    let dayCellsInMonth = [];
    for (let day = 1; day <= dateObject.daysInMonth(); day++) {
      let currentDay = day == this.getCurrentDay() ? "today" : "";
      dayCellsInMonth.push(
        <div
          style={{
            width: "98px",
            height: "50px",
            // border: "1px solid red",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={
              currentDay === "today"
                ? {
                    padding: 10,
                    borderRadius: "50%",
                    display: "inline-block",
                    border: "2.5px solid #505ea1",
                  }
                : {}
            }
          >
            {day}
          </div>
        </div>
      );
    }

    let totalCellsInMonth = [...blankCellsInMonth, ...dayCellsInMonth];
    let rows = [];
    let cells = [];

    totalCellsInMonth.forEach((cell, index) => {
      if (index % 7 !== 0) {
        cells.push(cell);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(cell);
      }
      if (index === totalCellsInMonth.length - 1) {
        rows.push(cells);
      }
    });

    let daysOfWeekInMonth = rows.map((row, index) => {
      return (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          {row}
        </div>
      );
    });

    let { teachersList } = this.state;
    return (
      <div style={{ width: "100vw" }}>
        <h2 style={{ margin: "20px auto", width: "100px" }}>Calender</h2>

        <div style={{ margin: "0 auto", width: "100%" }}>
          <div
            style={{
              width: "700px",
              display: "flex",
              justifyContent: "space-between",
              margin: "10px 0",
            }}
          >
            <React.Fragment>
              <label for="teachers">Choose a Teacher's Name:</label>
              <select name="teachers" id="teachers">
                <option value="0">Choose Teacher:</option>
                {teachersList &&
                  Array.isArray(teachersList) &&
                  teachersList.length > 0 &&
                  teachersList.map((teacher) => {
                    return <option value={teacher}>{teacher}</option>;
                  })}
              </select>
            </React.Fragment>
            <button
              onClick={() => {
                this.setState({ isModalOpen: !this.state.isModalOpen });
              }}
            >
              Add Task
            </button>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "700px",
              background: "#DBA8AC",
              alignItems: "center",
              height: 50,
              color: "#fff",
              fontSize: "2.5rem",
            }}
          >
            <div>{this.getCurrentMonth()}</div>
            <div>{this.getCurrentYear()}</div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              width: "700px",
              background: "#505ea1",
              alignItems: "center",
              height: 50,
            }}
          >
            {weekdayshortname}
          </div>

          <div>{daysOfWeekInMonth}</div>
          {this.state.isModalOpen && (
            <Modal
              isModalOpen={this.state.isModalOpen}
              onClose={this.onClose}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Calender;
