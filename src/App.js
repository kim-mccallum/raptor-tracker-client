import React, { Component } from 'react';
import config from './config';
import Nav from './Components/Nav';
import Map from './Components/Map'
import DataLoading from './Components/DataLoading'
import WelcomeBanner from './Components/WelcomeBanner'
import STORE from './dummy-data';
import './App.css';

export default class App extends Component {
    state = {
      bannerVisible: true,
      dataLoading: true,
      species: '',
      individual_id: '',
      start_time: '',
      end_time: '', 
      mapData: [],
      pathData: []
    }
  
  // api request - simulated for now
  componentDidMount() {
    // const url = 'Simulate API call for now';
    const url = `${config.API_ENDPOINT}/observations/last`

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
          console.log(`got the data: ${data}`)
          data.sort((a, b) => {
              // Check the order here
              return parseInt(a.time_stamp) - parseInt(b.time_stamp)
            })
          this.setState({
            mapData: data,
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
    const baseUrl = `${config.API_ENDPOINT}/observations/?`

    const urlParams = Object.entries(this.state).filter(item => item[1]).filter(item => {
      // first item is the key and second is value
      return (item[0] === 'species' || item[0] === 'individual_id' || item[0] === 'start_time' ||  item[0] === 'end_time')
    })
    const params = new URLSearchParams(urlParams);

    const url = `${baseUrl}${params}`

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
          console.log(`got the data: ${data}`)
          data.sort((a, b) => {
              // Check the order here
              return parseInt(a.time_stamp) - parseInt(b.time_stamp)
            })
          this.setState({
            // change later
            mapData: data,
            error: null,
            dataLoading: false,
          }, () => {
            this.setState({ shouldUpdate: false })
          });
        })
        .catch((err) => {
          this.setState({
            error: err.message,
          });
        });
    });
  }
  onMarkerClick = (name) => {
    // do this later to handle the marker click
    this.setState({ individual_id: name })
    console.log('click troubles')

    this.handleDataFetch()
  }
  
  handleBanner = (e) => {
    e.preventDefault();
    this.setState({
      bannerVisible: false
    })
}

  render() {
    // in state - property called dataLoading: true, when you get the data set it to false
    // if it's true, show the DataLoading and if false, show the Map
    let loading;
    if(this.state.dataLoading){
      loading = <DataLoading />
    }
    let map;
    if(!this.state.dataLoading){
      map = <div className='map-container'>
              <Map observations={this.state.mapData} hideBanner={this.handleBanner} markerHandler={this.onMarkerClick}/>
            </div>
    }
    let banner; 
    if(this.state.bannerVisible){
      loading = <WelcomeBanner hideBanner={this.handleBanner}/>
    }

    console.log(this.state.individual_id)
    return (
      <div className="App">
      <Nav hideBanner={this.handleBanner}/>
      <div className="capsule">
        <>
          {loading}
        </>
        <>
          {banner}
        </>
          {map}
      </div>
    </div>
    )
  }
}

