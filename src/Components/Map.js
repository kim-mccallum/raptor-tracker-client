import React from "react";
import L from "leaflet";
import { observationsFC } from '../observations-geojson-fc'

class GeoJsonPt{
    constructor(json) {
        this.type = "Feature";
        this.geometry = {
            type:"Point",
            coordinates:[json.location_long, json.location_lat]
        };
        this.properties = {
        id: json.id, 
        individual_id: json.individual_id,
        time_stamp: json.time_stamp,
        heading: json.heading,
        ground_speed: json.ground_speed
        }
    }
    createGeoJson(){   
    }
}

class Map extends React.Component {
  componentDidMount() {
    // create map
    this.map = L.map("map", {
      center: [38.81367, -112.266],
      zoom: 7,
      layers: [
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
            maxZoom: 12
        })
      ],
    });

    this.observations = L.geoJSON(observationsFC).bindPopup(function(layer){
        return `Eagle name: ${layer.feature.properties.individual_id} Time: ${new Date(Number(layer.feature.properties.time_stamp))}`;
    }).addTo(this.map);

    this.map.fitBounds(this.observations.getBounds(), {
        padding: [100, 100]
    })
  }

  //Trying to make a method that uses the GeoJsonPt Class and converts array data from state
  dataToGeoJson = (arrObs) => {
        let fcObj = {
        "type": "FeatureCollection",
        "features": []
    }
    fcObj.features = arrObs.map(obj => new GeoJsonPt(obj))

    return JSON.stringify(fcObj)
    }


  render() {
    //   console.log(this.props.observations)
    return <div style={{ width: "74vw", height: "100vh" }} id="map"></div>;
  }
}
export default Map;
