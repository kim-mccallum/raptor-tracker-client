import React from "react";
import L from "leaflet";
import moment from "moment";

class Map extends React.Component {
  eagleIcon = L.icon({
    // iconUrl: require('../graphics/vulture.svg'),
    iconUrl: require("../graphics/eagle-1.svg"),
    iconSize: [50, 55],
    iconAnchor: [28, 43],
    popupAnchor: [0, -50],
  });

  // BREAK THIS UP INTO COMPONENTDIDUPDATE AS WELL AS MAYBE HELPER METHODS
  // jUST CREATE THE MAP
  componentDidMount() {
    this.map = L.map("map", {
      zoomControl: false,
      preferCanvas: true,
    });
    //add basemap layers
    const natGeo = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}",
      {
        attribution:
          "Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC",
        maxZoom: 16,
      }
    ).addTo(this.map);

    // Satellite/Aerial imagery
    const Esri_WorldImagery = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        attribution:
          "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
        maxZoom: 12,
      }
    );
    // Set up layer controls
    const basemaps = {
      "National Geographic": natGeo,
      "World Imagery": Esri_WorldImagery,
    };

    L.control.layers(basemaps).addTo(this.map);

    // Try to make a layer so you can clear
    this.layer = L.layerGroup().addTo(this.map);
  }

  componentDidUpdate(prevProps, prevState) {
    this.props.recentData.forEach((obs) => {
      // Potentially add style for active and inactive birds: If last date is in the last year, give a certain effect and if it's old do something else
      let marker = new L.Marker([obs.location_lat, obs.location_long], {
        icon: this.eagleIcon,
      })
        .bindPopup(() => {
          return `Name: ${obs.individual_id}<br>Species: ${
            obs.individual_taxon_canonical_name
          }<br>Last seen: ${moment(obs.time_stamp).format(
            "LLL"
          )}<br> Click to view path`;
        })
        .addTo(this.map);

      marker.on("click", (e) => {
        this.props.markerHandler(obs.individual_id);
      });

      marker.on("mouseover", function (e) {
        this.openPopup();
      });
      marker.on("mouseout", function (e) {
        this.closePopup();
      });
    });

    const fitMapToData = (observationData, paddingValue) => {
      let ptArr = [];
      observationData.forEach((point) => {
        let { location_lat, location_long } = point;
        ptArr.push([location_lat, location_long]);
      });
      let myBounds = new L.LatLngBounds(ptArr);
      this.map.fitBounds(myBounds, { padding: [paddingValue, paddingValue] });
    };

    fitMapToData(this.props.recentData, 100);

    // Try to clear the old data
    this.layer.clearLayers();
    // Object with individual_id as keys and values as arrays of locations
    let obj = {};
    this.props.observations.forEach((point) => {
      let {
        location_lat,
        location_long,
        time_stamp,
        individual_id,
        individual_taxon_canonical_name,
      } = point;
      if (!obj[individual_id]) {
        obj[individual_id] = {
          coords: [],
          time_stamp: [],
          individual_taxon_canonical_name: individual_taxon_canonical_name,
        };
      }
      obj[individual_id].coords.push([location_lat, location_long]);
      obj[individual_id].time_stamp.push([time_stamp]);
    });

    for (let [key, value] of Object.entries(obj)) {
      let polyline = L.polyline(value.coords, { color: "#2d1bf7" }).addTo(
        // changed from this.map
        this.layer
      );

      value.coords.forEach((coord, index) => {
        let marker = new L.circleMarker(coord, { radius: 5, color: "#2d1bf7" })
          .bindPopup(() => {
            return `${key} ${moment(value.time_stamp[index][0]).format("LLL")}`;
          })
          .addTo(this.layer)
          // .addTo(this.map)
          .on("mouseover", (e) => {
            marker.openPopup();
          });
      });
    }
    // Adjust fitBounds so that zoom is appropriate for few or many observations
    if (this.props.observations.length > 10) {
      fitMapToData(this.props.observations, 150);
    } else if (
      this.props.observations.length > 5 &&
      this.props.observations.length < 10
    ) {
      fitMapToData(this.props.observations, 200);
    } else if (
      this.props.observations.length < 5 &&
      this.props.observations.length > 0
    ) {
      this.map.setView(
        [
          this.props.observations[0].location_lat,
          this.props.observations[0].location_long,
        ],
        12
      );
    }
  }
  render() {
    // console.log(this.props);
    return <div style={{ width: "84vw", height: "100vh" }} id="map"></div>;
  }
}
export default Map;
