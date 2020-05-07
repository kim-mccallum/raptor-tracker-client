import React, { Component } from "react";
import config from "./config";
import Nav from "./Components/Nav";
import Map from "./Components/Map";
import DataLoading from "./Components/DataLoading";
import WelcomeBanner from "./Components/WelcomeBanner";
import moment from "moment";
import "./App.css";

export default class App extends Component {
  state = {
    bannerVisible: true,
    dataLoading: true,
    // empty string means no filter - all possibilities - potential conflict between study_id and individual_id
    // This was redundant with the state in SelectionMenu so I refactored to the form to not have state
    study_id: "",
    individual_id: "",
    // Take out the date '2020-05-01' once DB updating is implemented
    start_time: moment("2020-05-01").subtract(1, "month").format("x"),
    end_time: moment("2020-05-01").format("x"),
    // potentially deal with distinguishing between no data and data not yet fetched - 'loading'?
    recentData: [],
    firstData: [],
    pathData: [],
  };

  componentDidMount() {
    const urls = [
      `${config.API_ENDPOINT}/observations/last`,
      `${config.API_ENDPOINT}/observations/first`,
    ];

    this.setState({ dataLoading: true }, () => {
      Promise.all(
        urls.map((url) => {
          return fetch(url)
            .then((res) => {
              if (!res.ok) {
                throw new Error(
                  "Something went wrong, please try again later."
                );
              }
              return res;
            })
            .then((res) => res.json())
            .then((data) => {
              return data;
            })
            .catch((err) => {
              this.setState({
                error: err.message,
              });
            });
        })
      ).then((dataSets) => {
        dataSets.forEach((data) => {
          data.sort((a, b) => {
            return (
              new Date(a.time_stamp).getTime() -
              new Date(b.time_stamp).getTime()
            );
          });
        });
        this.setState({
          recentData: dataSets[0],
          firstData: dataSets[1],
          error: null,
          dataLoading: false,
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
            return (
              new Date(a.time_stamp).getTime() -
              new Date(b.time_stamp).getTime()
            );
          });
          this.setState(
            {
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

  render() {
    //
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
          filterData={this.filterData}
          raptorId={this.state.individual_id}
          firstData={this.state.firstData}
          recentData={this.state.recentData}
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
