import React, { Component } from 'react';
import config from './config';
import Nav from './Components/Nav';
import Map from './Components/Map'
import DataLoading from './Components/DataLoading'
import WelcomeBanner from './Components/WelcomeBanner'
import './App.css';
import { STORE } from './dummy-data';

export default class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      bannerVisible: true,
       dataLoading: true,
      //  Golden eagles
       species: '',
      //  By default: one year of data
       dates: [],
       individuals: [],
       authenticated: true,
       mapData: []
    }
  }
  
  // api request - simulated for now
  componentDidMount() {
    // const url = 'Simulate API call for now';
    const url = `${config.API_ENDPOINT}/observations/last`

    // first - update and setState loading to true
    this.setState({ dataLoading: true })
    
    // then - make fetch to url
    // inside the .then() 
    // before you put the data into the state, 
        // STORE.sort((a,b) => {
        //     return parseInt(a.time_stamp) - parseInt(b.time_stamp)
        //   })
    // -map data to sort it and update loading to false - this is the last step

    //add loading logic
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
          data.sort((a,b) => {
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
  
  handleBanner = (e) => {
    e.preventDefault();
    console.log('button was clicked')
    this.setState({
      bannerVisible: false
    })
}

  render() {
    // in state - property called dataLoading: true, when you get the data set it to false
    // if it's true, show the DataLoading and if false, show the Map
    let loading;
    if(this.state.dataLoading === true){
      loading = <DataLoading />
    }
    let map;
    if(this.state.dataLoading === false){
      map = <div className='map-container'>
              <Map observations={this.state.mapData} hideBanner={this.handleBanner}/>
            </div>
    }
    let banner; 
    if(this.state.bannerVisible === true){
      loading = <WelcomeBanner hideBanner={this.handleBanner}/>
    }
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

