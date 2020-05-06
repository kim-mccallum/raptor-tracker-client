import React, { Component } from "react";
import moment from "moment";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./SelectionMenu.css";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

// FIX THE ACTIVATE/DEACTIVATE RAPTOR CLICK
export default class SelectionMenu extends Component {
  state = {
    yearActive: true,
    monthActive: false,
    weekActive: false,
    min: this.props.firstData[0],
    max: 100,
  };

  componentDidMount() {
    // get the first/last dates and update state
    // this.setState({
    //     min: minDateObj,
    //     max: maxDateObj
    // })
  }

  studyHandler = (e) => {
    this.props.filterData({
      study_id: e.target.value,
      individual_id: "",
    });
  };
  weekHandler = () => {
    this.props.filterData({
      // Take out the date ''2020-05-01' once DB updating is implemented
      start_time: moment("2020-05-01").subtract(1, "week").format("x"),
    });
    this.setState({
      yearActive: false,
      monthActive: false,
      weekActive: true,
    });
    this.props.deactivateIsRaptorClicked();
  };
  monthHandler = () => {
    this.props.filterData({
      start_time: moment("2020-05-01").subtract(1, "month").format("x"),
    });
    this.setState({
      yearActive: false,
      monthActive: true,
      weekActive: false,
    });
    this.props.deactivateIsRaptorClicked();
  };
  yearHandler = () => {
    this.props.filterData({
      start_time: moment("2020-05-01").subtract(1, "year").format("x"),
    });
    this.setState({
      yearActive: true,
      monthActive: false,
      weekActive: false,
    });
    this.props.activateIsRaptorClicked();
  };
  // Get the start and end date from the range picker
  rangeHandler = (e) => {
    // Maybe get the most recent date from the recentData in App.js state and use this as Max in the form
    // If you do this, make another call to the get the First date in the database
    console.log(e);

    this.props.filterData({
      // Get the values from the range picker and pass them back to App.js
      start_time: e[0],
      end_time: e[1],
    });
  };

  render() {
    let maxDate = this.props.recentData[this.props.recentData.length - 1];
    let minDate = this.props.firstData[0];

    if (maxDate) {
      maxDate = +moment(maxDate.time_stamp).format("x");
      minDate = +moment(minDate.time_stamp).format("x");
    }

    let raptorName;
    if (this.props.raptorId !== "") {
      raptorName = <p>Selected raptor: {this.props.raptorId}</p>;
    }
    return (
      <div className="selection-menu">
        <div className="form-container">
          <form className="selectDataForm">
            <fieldset>
              <legend>Filter data</legend>
              <label htmlFor="study_id">Select study:</label>
              <br />
              <select id="study_id" onChange={this.studyHandler}>
                <option value="">All</option>
                <option value="296675205">Golden eagles</option>
                <option value="473993694">African vultures</option>
              </select>
              <br />
              <legend>Tracking period</legend>
              {/* FIGURE OUT HOW TO ADD A CLASS TO STYLE THE ACTIVE BUTTON SO USERS KNOW WHAT IS IN STATE */}
              <button
                type="button"
                onClick={this.weekHandler}
                className={`btn ${this.state.weekActive ? "active" : ""}`}
              >
                Week
              </button>
              <button
                type="button"
                onClick={this.monthHandler}
                className={`btn ${this.state.monthActive ? "active" : ""}`}
              >
                Month
              </button>
              <button
                type="button"
                onClick={this.yearHandler}
                className={`btn ${
                  this.props.isRaptorClicked ? "active" : null
                }`}
              >
                Year
              </button>
              <br />
              {/* Put this in another component DateSlider that is rendered if an All button is clicked */}
              <fieldset id="date-slider">
                <legend>Custom range</legend>
                <label htmlFor="date-range">Select Dates:</label>
                <Range
                  id="date-range"
                  name="date-range"
                  min={minDate}
                  max={maxDate}
                  tipFormatter={(value) => {
                    const viewValue = moment(value).format("L");
                    return `${viewValue}`;
                  }}
                  onAfterChange={this.rangeHandler}
                />
              </fieldset>
            </fieldset>
            {raptorName}
          </form>
        </div>
      </div>
    );
  }
}
