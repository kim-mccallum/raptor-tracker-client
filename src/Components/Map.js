import React from "react";
import L from "leaflet";

class Map extends React.Component {
  state = {
    data: [],
  };
  
  componentDidMount() {
    let map = L.map("map", {
        zoomControl: false, 
        // layers: [
        //     L.tileLayer(
        //     "https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}",
        //     {
        //         attribution:
        //         "Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC",
        //         maxZoom: 12,
        //     }),
        // ],
        });
        //add basemap layers
        const natGeo = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
            maxZoom: 16
        }).addTo(map);

        // Satellite/Aerial imagery
        const Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
            maxZoom: 16
        });

        const basemaps = {
            "National Geographic": natGeo,
            "World Imagery": Esri_WorldImagery
        };

        L.control.layers(basemaps).addTo(map);

        console.log(this.props.observations)
        // array to hold individual bird data
        let ptArr = [];
        let obj = {};
        this.props.observations.forEach((point) => {
            let { location_lat, location_long, time_stamp, individual_id } = point;
            ptArr.push([location_lat, location_long]);
            if (!obj[individual_id]) {
                obj[individual_id] = {
                coords: [],
                time_stamp: [],
                };
            }
            obj[individual_id].coords.push([location_lat, location_long]);
            obj[individual_id].time_stamp.push([time_stamp]);
        });

        for (let [key, value] of Object.entries(obj)) {
            var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
            let polyline = L.polyline(value.coords, { color: randomColor }).addTo(
            map
            );
        value.coords.forEach((coord, index) => {
            new L.marker(coord)
            .bindPopup(() => {
                return `name: ${key} time: ${new Date(Number(value.time_stamp[index]))}`;
            })
            .addTo(map);
        });
        }
        console.log(ptArr)
        var myBounds = new L.LatLngBounds(ptArr);
        map.fitBounds(myBounds, { padding: [100, 100] });
    }
  render() {
    //   console.log(this.props.observations)
    return <div style={{ width: "84vw", height: "100vh" }} id="map" onClick={this.props.hideBanner}></div>;
  }
}
export default Map;