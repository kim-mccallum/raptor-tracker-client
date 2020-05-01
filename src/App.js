import React, { Component } from "react";
import config from "./config";
import Nav from "./Components/Nav";
import Map from "./Components/Map";
import DataLoading from "./Components/DataLoading";
import WelcomeBanner from "./Components/WelcomeBanner";
import moment from "moment";
// import STORE from './dummy-data';
import "./App.css";

export default class App extends Component {
  state = {
    bannerVisible: true,
    dataLoading: true,
    // empty string means no filter - all possibilities - potential conflict between study_id and individual_id
    // This was redundant with the state in SelectionMenu so I refactored to the form to not have state
    study_id: "",
    individual_id: "",
    start_time: moment().subtract(1, "year").format("x"),
    end_time: moment().format("x"),
    // potentially deal with distinguishing between no data and data not yet fetched - 'loading'?
    recentData: [],
    pathData: [],
    isRaptorClicked: false,
  };

  componentDidMount() {
    const url = `${config.API_ENDPOINT}/observations/last`;

    // this sets state and runs the callback wiht the new state
    this.setState({ dataLoading: true }, () => {
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Something went wrong, please try again later.");
          }
          return res;
        })
        .then((res) => res.json())
        .then((data) => {
          data.sort((a, b) => {
            return (
              new Date(a.time_stamp).getTime() -
              new Date(b.time_stamp).getTime()
            );
          });
          this.setState({
            recentData: data,
            error: null,
            dataLoading: false,
          });
        })
        .catch((err) => {
          this.setState({
            error: err.message,
          });
        });
    });
  }

  handleDataFetch = () => {
    const baseUrl = `${config.API_ENDPOINT}/observations/?`;

    const urlParams = Object.entries(this.state)
      .filter((item) => item[1])
      .filter((item) => {
        // first item is the key and second is value
        return (
          item[0] === "study_id" ||
          item[0] === "individual_id" ||
          item[0] === "start_time" ||
          item[0] === "end_time"
        );
      });
    const params = new URLSearchParams(urlParams);

    const url = `${baseUrl}${params}`;
    // console.log(url)

    this.setState({ dataLoading: true }, () => {
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Something went wrong, please try again later.");
          }
          return res;
        })
        .then((res) => res.json())
        .then((data) => {
          // console.log(`got the data: ${data}`)
          data.sort((a, b) => {
            // Check the order here - This is not right with new date format!
            return (
              new Date(a.time_stamp).getTime() -
              new Date(b.time_stamp).getTime()
            );
          });
          this.setState(
            {
              // change later to pathData
              pathData: data,
              error: null,
              dataLoading: false,
            },
            () => {
              this.setState({ shouldUpdate: false });
            }
          );
        })
        .catch((err) => {
          this.setState({
            error: err.message,
          });
        });
    });
  };
  // Change the name to updateFilters because we have chaanged the meaning of this function
  // callback prop to get the form data and pass it to handleDataFetch
  filterData = (updates) => {
    this.setState(updates, () => {
      this.handleDataFetch();
    });
  };

  onMarkerClick = (name) => {
    // do this later to handle the marker click
    this.setState({
      individual_id: name,
      isRaptorClicked: true,
    });

    this.handleDataFetch();
  };

  handleBanner = (e) => {
    e.preventDefault();
    this.setState({
      bannerVisible: false,
    });
  };
  
  deactivateIsRaptorClicked = () => {
    this.setState({
      isRaptorClicked: false,
    });
  };

  activateIsRaptorClicked = () => {
    this.setState({
      isRaptorClicked: true,
    });
  };

  render() {
    let map;
    if (!this.state.dataLoading) {
      map = (
        <div className="map-container">
          <Map
            observations={this.state.pathData}
            recentData={this.state.recentData}
            markerHandler={this.onMarkerClick}
          />
        </div>
      );
    }
    return (
      <div className="App">
        <Nav
          hideBanner={this.handleBanner}
          filterData={this.filterData}
          isRaptorClicked={this.state.isRaptorClicked}
          raptorId={this.state.individual_id}
          deactivateIsRaptorClicked={this.deactivateIsRaptorClicked}
          activateIsRaptorClicked={this.activateIsRaptorClicked}
        />
        <div className="capsule">
          {this.state.bannerVisible ? (
            <WelcomeBanner hideBanner={this.handleBanner} />
          ) : (
            ""
          )}
          <>{this.state.dataLoading ? <DataLoading /> : ""}</>
          {map}
        </div>
      </div>
    );
  }
}
