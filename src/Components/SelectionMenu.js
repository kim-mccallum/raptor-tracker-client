import React, { Component } from "react";
import moment from "moment";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./SelectionMenu.css";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

export default class SelectionMenu extends Component {
  state = {
    activeButton: "month",
    yearActive: false,
    monthActive: false,
    weekActive: false,
  };

  activeDateButtonHandler = (e) => {
    // get the period from the e and set that to activeButton
    this.setState({
      activeButton: e.target.name,
    });

    if (e.target.name === "specificDates") {
      return;
    }
    // Pass the new stuff to filterData
    this.props.filterData({
      // Take out the date ''2020-05-01' once DB updating is implemented
      start_time: moment("2020-05-05").subtract(1, e.target.name).format("x"),
    });
  };

  studyHandler = (e) => {
    this.props.filterData({
      study_id: e.target.value,
      individual_id: "",
    });
  };

  // Get the start and end date from the range picker - Keep this as it's different and unique
  rangeHandler = (e) => {
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

    let raptorInfo = {};
    if (this.props.raptorId !== "") {
      raptorInfo.name = <p>Selected raptor: {this.props.raptorId}</p>;
      // filter the recentData object by raptorId and get the species
      // put the last seen date in here too
      raptorInfo.species = (
        <p>
          Species:{" "}
          {
            this.props.recentData.filter(
              (obs) => obs.individual_id === this.props.raptorId
            )[0].individual_taxon_canonical_name
          }
        </p>
      );

      raptorInfo.lastSeen = (
        <p>
          Last seen:{" "}
          {
            this.props.recentData.filter(
              (obs) => obs.individual_id === this.props.raptorId
            )[0].time_stamp
          }
        </p>
      );
    }
    return (
      <div className="selection-menu">
        <div className="form-container">
          <form className="selectDataForm">
            <fieldset>
              <legend className="filter">Filter</legend>
              <label htmlFor="study_id">Select study:</label>
              <br />
              <select id="study_id" onChange={this.studyHandler}>
                <option value="">All</option>
                <option value="296675205">Golden eagles</option>
                <option value="473993694">African vultures</option>
              </select>
              <br />
              <legend>Tracking period</legend>
              <button
                name="week"
                type="button"
                onClick={this.activeDateButtonHandler}
                className={`btn ${
                  this.state.activeButton === "week" ? "active" : ""
                }`}
              >
                Week
              </button>
              <button
                name="month"
                type="button"
                onClick={this.activeDateButtonHandler}
                className={`btn ${
                  this.state.activeButton === "month" ? "active" : ""
                }`}
              >
                Month
              </button>
              <button
                name="year"
                type="button"
                onClick={this.activeDateButtonHandler}
                className={`btn ${
                  this.state.activeButton === "year" ? "active" : ""
                }`}
              >
                Year
              </button>
              <button
                name="specificDates"
                type="button"
                onClick={this.activeDateButtonHandler}
                className={`btn ${
                  this.state.activeButton === "specificDates" ? "active" : ""
                }`}
              >
                Range
              </button>
              <br />
              <fieldset
                id="date-slider"
                className={
                  this.state.activeButton === "specificDates"
                    ? "active"
                    : "hidden"
                }
              >
                <label htmlFor="date-range">Select Dates:</label>
                <Range
                  pushable
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
            <div className="raptor-info">
              {raptorInfo.name}
              {raptorInfo.species}
              {raptorInfo.lastSeen}
            </div>
          </form>
        </div>
      </div>
    );
  }
}
