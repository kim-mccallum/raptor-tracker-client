import React, { Component } from 'react';
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
       dataLoading: false,
      //  Golden eagles
       species: '',
      //  By default: one year of data
       dates: [],
       individuals: [],
       authenticated: true,
       mapData: STORE.sort((a,b) => {
        return parseInt(a.time_stamp) - parseInt(b.time_stamp)
      })
    }
  }
  
  // api request - simulated for now
  componentDidMount() {
    const url = 'Simulate API call for now';

    this.setState({ dataLoading: true })
    console.log(this.state.dataLoading)

    let sortedTimestamps = STORE.sort((a,b) => {
      return parseInt(a.time_stamp) - parseInt(b.time_stamp)
    });
    this.setState({ 
      dataLoading: false,
      mapData: sortedTimestamps
    });

    setTimeout(() => {
      console.log('Data has now loaded!');
      console.log(this.state.dataLoading)
      this.setState({ 
        dataLoading: false,
        mapData: STORE
       })
    }, 3000);

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
    let loading;
    if(this.state.dataLoading === true){
      loading = <DataLoading />
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
        <div className='map-container'>
          <Map observations={this.state.mapData} hideBanner={this.handleBanner}/>
        </div>
      </div>
    </div>
    )
  }
}

