import "./DataLoading.css";
import React from "react";

export default function DataLoading() {
  return (
    <div className="data-loading">
      <h2>Data Loading!</h2>
    </div>
  );
}

// import React, { Component } from "react";
// import L from "leaflet";
// import "./DataLoading.css";

// export default class DataLoading extends Component {
//   componentDidMount() {
//     //   let marker;
//     let map = L.map("map", {
//       zoomControl: false,
//       preferCanvas: true,
//     });
//     //add basemap layers
//     const natGeo = L.tileLayer(
//       "https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}",
//       {
//         attribution:
//           "Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC",
//         maxZoom: 16,
//       }
//     ).addTo(map);

//     // Satellite/Aerial imagery
//     const Esri_WorldImagery = L.tileLayer(
//       "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
//       {
//         attribution:
//           "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
//         maxZoom: 12,
//       }
//     );

//     const basemaps = {
//       "National Geographic": natGeo,
//       "World Imagery": Esri_WorldImagery,
//     };

//     L.control.layers(basemaps).addTo(map);

//     var eagleIcon = L.icon({
//       // iconUrl: require('../graphics/vulture.svg'),
//       iconUrl: require("../graphics/eagle-1.svg"),
//       iconSize: [50, 55],
//       iconAnchor: [28, 43],
//       popupAnchor: [0, -50],
//     });

//     let testPoint = {
//       id: 30,
//       individual_id: "ANIS1",
//       time_stamp: "2020-01-07T04:00:00.000Z",
//       location_long: -113.15656558439251,
//       location_lat: 37.573475099796305,
//       heading: "0",
//       ground_speed: "0",
//       individual_local_identifier: "ANIS1",
//       individual_taxon_canonical_name: "Aquila chrysaetos",
//       study_id: "296675205",
//     };
//     // let testPoint = this.props.recentData[0]

//     let testMarker = new L.Marker(
//       [testPoint.location_lat, testPoint.location_long],
//       { icon: eagleIcon }
//     ).addTo(map);
//   }
//   //
//   render() {
//     return (
//       <div style={{ width: "84vw", height: "100vh" }} id="map"></div>
//       //   <div className="data-loading">
//       //     <h2>Data Loading!</h2>
//       //   </div>
//     );
//   }
// }
