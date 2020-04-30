import React from "react";
import L from "leaflet";
// Import your helper functions?


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
            maxZoom: 12
        });

        const basemaps = {
            "National Geographic": natGeo,
            "World Imagery": Esri_WorldImagery
        };

        L.control.layers(basemaps).addTo(map);
        // TRY TO ADD ICON
        var eagleIcon = L.icon({
            // iconUrl: require('../graphics/vulture.svg'),
            iconUrl: require('../graphics/eagle-1.svg'),
			iconSize: [50,55],
            // iconAnchor: [32,74],
            iconAnchor: [28,43],
			popupAnchor: [0,-50]
        });
        


        // Add the recentData first
        this.props.recentData.forEach((obs) => {
            // let marker = new L.Marker([obs.location_lat, obs.location_long])
            let marker = new L.Marker([obs.location_lat, obs.location_long], {icon: eagleIcon})
            .bindPopup(() => {
                return `name: ${obs.individual_id} time: ${obs.time_stamp}`;
            })
            .addTo(map);

            marker.on("click", (e) => {
                this.props.markerHandler(obs.individual_id)
            })
        })

        // let testPoint =  {
        //     "id": 30,
        //     "individual_id": "ANIS1",
        //     "time_stamp": "2020-01-07T04:00:00.000Z",
        //     "location_long": -113.15656558439251,
        //     "location_lat": 37.573475099796305,
        //     "heading": "0",
        //     "ground_speed": "0",
        //     "individual_local_identifier": "ANIS1",
        //     "individual_taxon_canonical_name": "Aquila chrysaetos",
        //     "study_id": "296675205"
        // }
        // let testPoint = this.props.recentData[0]

        // let testMarker = new L.Marker([testPoint.location_lat, testPoint.location_long], {icon: eagleIcon}).bindPopup(() => {
        //         return `name: ${testPoint.individual_id} time: ${testPoint.time_stamp}`;
        //     }).addTo(map);

        // PUT THIS IN A FUNCTION TO BE "DRY" SO YOU CAN USE IT FOR BOTH DATASETS 
        const fitMapToData = (observationData, paddingValue ) => {
            let ptArr = [];
            observationData.forEach((point) => {
                let { location_lat, location_long } = point;
                ptArr.push([location_lat, location_long]);
            })
            let myBounds = new L.LatLngBounds(ptArr);
            map.fitBounds(myBounds, { padding: [paddingValue, paddingValue] });
        }

        fitMapToData(this.props.recentData, 100 )

        // Object with individual_id as keys and values as arrays of locations
        let obj = {};
        this.props.observations.forEach((point) => {
            let { location_lat, location_long, time_stamp, individual_id, individual_taxon_canonical_name } = point;
            if (!obj[individual_id]) {
                obj[individual_id] = {
                coords: [],
                time_stamp: [],
                individual_taxon_canonical_name: individual_taxon_canonical_name
                };
            }
            obj[individual_id].coords.push([location_lat, location_long]);
            obj[individual_id].time_stamp.push([time_stamp]);
        });
        
        // Put this in a function renderPath() - Should I do this? 
        const renderPath = observationData => {
            console.log('I will take data, create an object and render a path on the map')
        }

        for (let [key, value] of Object.entries(obj)) {
            let polyline = L.polyline(value.coords, { color: '#2d1bf7' }).addTo(map);

            value.coords.forEach((coord, index) => {
                let marker = new L.circleMarker(coord, {radius:5, color:'#2d1bf7'})
                .bindPopup(() => {
                    return `time: ${value.time_stamp[index]}<br> name: ${key} <br> species: ${value.individual_taxon_canonical_name}`;
                })
                .addTo(map);
            });
        }
        // There is a problem with the single points. Fit bounds doesn't work right
        if(this.props.observations.length > 5){
            fitMapToData(this.props.observations,100)
        }
        else if(this.props.observations.length  < 5 && this.props.observations.length  > 0){
            // fitMapToData(this.props.observations, 100000)
            map.setView([this.props.observations[0].location_lat, this.props.observations[0].location_long], 12);
        }
        
    }
  render() {
    return <div style={{ width: "84vw", height: "100vh" }} id="map"></div>;
  }
}
export default Map;