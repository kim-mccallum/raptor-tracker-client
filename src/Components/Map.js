import React from "react";
import L from "leaflet";
class Map extends React.Component {
  componentDidMount() {
    // create map
    this.map = L.map("map", {
      center: [38.81367, -112.266],
      zoom: 7,
      layers: [
        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }),
      ],
    });
  }
  render() {
    return <div style={{ width: "1000px", height: "1000px" }} id="map"></div>;
  }
}
export default Map;
