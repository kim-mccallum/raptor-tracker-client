import React, { Component } from 'react';
import Nav from './Components/Nav';
import Map from './Components/Map'
import './App.css';
import { STORE } from './dummy-data';

export default class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       dataLoading: false,
      //  Golden eagles
       species: '',
      //  By default: one year of data
       dates: [],
       individuals: [],
       authenticated: true,
       mapData: STORE
    }
  }
  
  // api request - simulated for now
  componentDidMount() {
    const url = 'Simulate API call for now';
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
  //

  render() {
    return (
      <div className="App">
      <Nav />
      <div className="capsule">
        <div className='map-container'>
          <Map observations={this.state.mapData}/>
        </div>
      </div>
    </div>
    )
  }
}

