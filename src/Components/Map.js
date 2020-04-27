import React from "react";
import L from "leaflet";

class Map extends React.Component {
  
  componentDidMount() {
    //   let marker;
      let map = L.map("map", {
        zoomControl: false,
        preferCanvas: true,
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

        // Add the recentData first
        this.props.recentData.forEach((obs) => {
            let marker = new L.Marker([obs.location_lat, obs.location_long])
            .bindPopup(() => {
                return `name: ${obs.individual_id} time: ${obs.time_stamp}`;
            })
            .addTo(map);

            marker.on("click", (e) => {
                this.props.markerHandler(obs.individual_id)
            })
        })

        // array to hold individual bird data just for map bounds
        let ptArr = [];
        this.props.recentData.forEach((point) => {
            let { location_lat, location_long } = point;
            ptArr.push([location_lat, location_long]);
        })
        // Object with individual_id as keys and values as arrays of locations
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
        
        // PUT THIS IN A FUNCTION TO BE DRY SO YOU CAN USE IT FOR BOTH DATASETS 
        // function makePtArray(observations) - return an array of coordinates
        const fitBounds = observationData => {
            console.log('take the logic for creating an array of coordinates and then call fit bounds')
        }

        // Put this in a function renderPath() 
        const renderPath = observationData => {
            console.log('I will take data, create an object and render a path on the map')
        }
        for (let [key, value] of Object.entries(obj)) {
            var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
            let polyline = L.polyline(value.coords, { color: randomColor }).addTo(map);

            // console.log(obj)
            value.coords.forEach((coord, index) => {
                let marker = new L.circleMarker(coord, {color:'#006600'})
                .bindPopup(() => {
                    return `name: ${key} time: ${value.time_stamp[index]}`;
                })
                .addTo(map);
            });
        }

        // console.log(ptArr)
        var myBounds = new L.LatLngBounds(ptArr);
        // This causes a problem for situations in which there is only one point 
        map.fitBounds(myBounds, { padding: [100, 100] });
    }
  render() {
    //   console.log(this.props.observations)
    return <div style={{ width: "84vw", height: "100vh" }} id="map"></div>;
  }
}
export default Map;