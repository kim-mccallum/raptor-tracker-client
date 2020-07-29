import React, { Component } from "react";
import config from "./config";
import Nav from "./Components/Nav";
import Map from "./Components/Map";
import DataLoading from "./Components/DataLoading";
import WelcomeBanner from "./Components/WelcomeBanner";
import MobileBanner from "./Components/MobileBanner";
import ErrorBoundary from "./Components/ErrorBoundary";
import moment from "moment";
import "./App.css";

// create context with the active button also with the start_time, end_time

export default class App extends Component {
  state = {
    bannerVisible: true,
    sideNavVisible: false,
    dataLoading: true,
    // empty string means no filter - all possibilities
    study_id: "",
    individual_id: "",
    // Take out the date '2020-05-01' once DB updating is implemented
    start_time: moment("2020-05-05").subtract(1, "month").format("x"),
    end_time: moment("2020-05-05").format("x"),
    // potentially deal with distinguishing between no data and data not yet fetched - 'loading'?
    recentData: [],
    firstData: [],
    pathData: [],
  };

  componentDidMount() {
    const urls = [
      // last seen date/location
      `${config.API_ENDPOINT}/observations/last`,
      // first seen date/location - age
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
      )
        .then((dataSets) => {
          // .then(([a, b]) => {
          //   console.log(a, b);
          dataSets.forEach((data) => {
            data.sort((a, b) => {
              return (
                new Date(a.time_stamp).getTime() -
                new Date(b.time_stamp).getTime()
              );
            });
          });
          //pass the array of bird birthdays and get a new attribute: isBreedingEagle
          let newData = this.isBreedingEagle(dataSets[1]);
          // get an array of individuals ids to KEEP
          let eaglesToKeep = this.sortBreedingBirds(newData);
          console.log(`we will keep these: ${eaglesToKeep}`);
          // filter out the breeding age eagles during breeding season
          let filteredRecentObservations = this.filterRecentData(
            //recent data
            dataSets[0],
            //ids of nonBreedingEagles
            eaglesToKeep
          );
          console.log(`Filtered data to map:`, filteredRecentObservations);
          this.setState({
            recentData: filteredRecentObservations,
            firstData: dataSets[1],
            error: null,
            dataLoading: false,
          });
          // call the function to trigger updates on the backend
          this.handleDataUpdate();
        })
        .catch((error) => {
          console.log(`We caught an error ${error}`);
          this.setState({
            error: error.message,
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

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong, please try again later.");
        }
        return res;
      })
      .then((res) => res.json())
      .then((data) => {
        // Mutation is not ideal but okay for now
        data.sort((a, b) => {
          return (
            new Date(a.time_stamp).getTime() - new Date(b.time_stamp).getTime()
          );
        });
        this.setState({
          pathData: data,
          error: null,
          dataLoading: false,
        });
      })
      .catch((err) => {
        this.setState({
          error: err.message,
        });
      });
  };

  handleDataUpdate = () => {
    // create a new endpoint for updating the database
    const url = `${config.API_ENDPOINT}/update-database`;
    fetch(url)
      // CHECK THE RESPONSE
      .then((res) => {
        if (!res.ok) {
          console.log(res);
          throw new Error("Something went wrong, please try again later.");
        }
        return res;
      })
      // RETURN THE NEW DATA AS AN OBJECT AND UPDATE STATE
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // this.setState({
        //   recentData: data,
        // });
      })
      .catch((err) => {
        this.setState({
          error: err.message,
        });
      });
  };
  // Get the form data and pass it to handleDataFetch
  filterData = (updates) => {
    this.setState(updates, () => {
      this.handleDataFetch();
    });
  };
  // FUNCTIONS TO HANDLE BREEDING EAGLE ISSUE - EAGLES THAT ARE OF BREEDING AGE (X YEARS) SHOULD NOT BE ADDED TO THE MAP DURING BREEDING SEASON
  // Returns the original data with new attribute added
  isBreedingEagle = (individuals) => {
    // get the current date
    let thisYear = new Date().getFullYear();
    // add a key:value - isBreedingEagle: true/false
    individuals.forEach((ind) => {
      // if it's an eagle and it's older than 5 - true
      if (ind.individual_taxon_canonical_name === "Aquila chrysaetos") {
        let birthday = new Date(ind.time_stamp).getFullYear();
        console.log(birthday);
        // if they are 3 years or older
        if (thisYear - birthday > 2) {
          ind["isBreedingEagle"] = true;
        } else {
          ind["isBreedingEagle"] = false;
        }
      } else {
        ind["isBreedingEagle"] = false;
      }
    });
    // console.log(individuals);
    return individuals;
  };
  // return an array of eagle ids to KEEP
  sortBreedingBirds = (indviduals) => {
    // get current date
    const today = new Date();
    const thisYear = today.getFullYear();
    // start breeding - Feb 1 - CHANGE THIS FROM HARDCODED VALUE!
    const start = new Date(`${thisYear}/2/1`);
    // end breeding - Sep 1
    const end = new Date(`${thisYear}/9/1`);
    // console.log(indviduals);
    // this is true during breeding season
    let season = moment(today).isBetween(moment(start), moment(end));
    console.log(`Is it golden eagle breeding season? ${season}`);
    // if current date is in breeding season filter to remove the mature eagles
    if (season) {
      let nonBreedingIndividuals = indviduals.filter(
        (ind) => !ind.isBreedingEagle
      );
      // filtered out breeding age
      // return an array of ids to remove
      console.log(
        "ids to KEEP:",
        nonBreedingIndividuals.map((ind) => ind.individual_id)
      );
      return nonBreedingIndividuals.map((ind) => ind.individual_id);
    }
    // if it's not breeding season, just return the whole list
    return indviduals.map((ind) => ind.individual_id);
  };
  // Remove the individuals that are breeding
  filterRecentData = (recentObservations, nonBreedingEagles) => {
    //If there are fewer ids in the nonbreeding array, it must be breeding season
    if (nonBreedingEagles.length < recentObservations.length) {
      console.log("we are going to keep:", nonBreedingEagles);
      // use a filter and the includes to return only the recentObservations with the non breeding birds
      let filteredObservations = recentObservations.filter((ind) =>
        nonBreedingEagles.includes(ind.individual_id)
      );
      // console.log("last seen locations:", filteredObservations);
      return filteredObservations;
    }
    //otherwise just return the recentObservations
    return recentObservations;
  };

  onMarkerClick = (name) => {
    // get last seen date - this is inefficient - instead save the actual object for that bird
    const lastSeen = moment(
      this.state.recentData.filter((obs) => obs.individual_id === name)[0]
        .time_stamp
    );
    console.log("first", lastSeen);
    // if it's not in the current range in state
    // create a custom 'month' range for that bird - last month it was seen
    // fetch data for that time period
    // in the Selection Menu, show the range slider with those dates
    if (
      !(
        lastSeen.format("x") > this.state.start_time &&
        lastSeen.format("x") <= this.state.end_time
      )
    ) {
      console.log("Inactive bird!");

      console.log(lastSeen.clone().subtract(6, "months"));
      console.log("second", lastSeen.clone().subtract(1, "months"));
      // create that range, setState and SOMEHOW activate the button in the SelectionMenu
      this.setState({
        individual_id: name,
        start_time: lastSeen.clone().subtract(1, "months").format("x"),
        end_time: lastSeen.format("x"),
      });
    } else {
      this.setState({
        individual_id: name,
      });
    }

    // this.setState({
    //   individual_id: name,
    // });

    this.handleDataFetch();
  };

  handleBanner = (e) => {
    e.preventDefault();
    this.setState({
      bannerVisible: false,
    });
  };

  sideNavHandler = (e) => {
    // toggle the sideNavState
    this.setState({ sideNavVisible: !this.state.sideNavVisible });
  };

  render() {
    return (
      <div className="App">
        <MobileBanner toggleSideNav={this.sideNavHandler} />
        <Nav
          toggleMobile={this.state.sideNavVisible}
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
          <>
            {this.state.dataLoading ? (
              <DataLoading />
            ) : (
              <div className="map-container">
                <ErrorBoundary>
                  <Map
                    observations={this.state.pathData}
                    recentData={this.state.recentData}
                    markerHandler={this.onMarkerClick}
                  />
                </ErrorBoundary>
              </div>
            )}
          </>
        </div>
      </div>
    );
  }
}
