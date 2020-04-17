import React from 'react';
import Nav from './Components/Nav';
import Map from './Components/Map'
import './App.css';

function App() {
  return (
    <div className="App">
      <Nav />
      <div className="capsule">
        <h2>Raptor Tracker App coming soon!</h2>
        <p>It will be awesome.</p>
        <div className='map-container'>
          <Map />
        </div>
      </div>
    </div>
  );
}

export default App;
