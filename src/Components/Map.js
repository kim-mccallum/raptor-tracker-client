import React from "react";
import L from "leaflet";
import { observationsFC } from "../observations-geojson-fc";

class Map extends React.Component {
  state = {
    data: [],
  };
  componentDidMount() {
    let map = L.map("map", {
        zoomControl: false, 
        layers: [
            L.tileLayer(
            "https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}",
            {
                attribution:
                "Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC",
                maxZoom: 12,
            }
            ),
        ],
        });
        // array to hold individual bird data
        let a = [];
        let obj = {};
        this.props.observations.forEach((point) => {
        let { location_lat, location_long, id, time_stamp, individual_id } = point;
        a.push([location_lat, location_long]);
        if (!obj[individual_id]) {
            obj[individual_id] = {
            coords: [],
            time_stamp: [],
            };
        }
        obj[individual_id].coords.push([location_lat, location_long]);
        obj[individual_id].time_stamp.push([time_stamp]);
        });
        // let arr = ['jorge', 'piquer']
        // let [firstname, lastname] = arr
        for (let [key, value] of Object.entries(obj)) {
            var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
            let polyline = L.polyline(value.coords, { color: randomColor }).addTo(
            map
            );
        value.coords.forEach((coord, index) => {
            new L.marker(coord)
            .bindPopup(() => {
                return `name: ${key} time: ${value.time_stamp[index]}`;
            })
            .addTo(map);
        });
        }
        var myBounds = new L.LatLngBounds(a);
        map.fitBounds(myBounds, { padding: [100, 100] });
    }
  render() {
    //   console.log(this.props.observations)
    return <div style={{ width: "74vw", height: "100vh" }} id="map"></div>;
  }
}
export default Map;