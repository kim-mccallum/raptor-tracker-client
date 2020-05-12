## [Raptor Tracker](https://raptor-tracker-app.now.sh/)
#### An interactive web application for exploring locations of GPS locations of golden eagles and African vultures tracked with solar powered GPS trackers by [HawkWatch International.](https://hawkwatch.org/) 
### Live application: [https://raptor-tracker-app.now.sh/](https://raptor-tracker-app.now.sh/)

### Technologies:
This client application was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and uses [LeafletJS](https://leafletjs.com/) to render an interactive web map displaying raptor location data automatically sent by satellite powered satellite transmitters to the data [Movebank animal tracking data database](https://www.movebank.org/cms/movebank-main). To enable this web application to securely display the locations of these sensitve species, the location data are downloaded from Movebank, stored, processed and served by the [Raptor Tracker API](https://github.com/kim-mccallum/raptor-tracker-server).

### About the data and this project:
This project was completed in collaboration with HawkWatch International (HWI) with the goal of launching this as an educational, outreach and research tool to support raptor conservation. HawkWatch has been using satellite tracking units to research migration ecology since 1999. Currently, HWI is deploying satellite tracking units on Golden Eagle nestlings throughout Utah to track their movements and study the threats they encounter within their first year of leaving the nest as well as deploying satellite transmitters to identify critical vulture habitat and causes of mortality of White-backed, Rüppell's, Lappet-faced, Hooded and Egyptian Vultures in the Horn of Africa.. The two current studies featured in this interactive web application include data from deployed units on 10 Golden Eagles and 28 African vultures. To learn more about tracking research on Golden Eagles and endangered African vultures, visit the [HawkWatch International tracking page](https://hawkwatch.org/our-work/tracking). 

### To run this project:

In the project directory, you can simply run:

### `npm start`

This will runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.








