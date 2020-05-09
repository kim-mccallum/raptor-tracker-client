import React from "react";
import "./WelcomeBanner.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function WelcomeBanner(props) {
  return (
    <div className="backdrop" onClick={props.hideBanner}>
      <div className="welcome-banner-overlay">
        <div>
          <FontAwesomeIcon
            icon={faTimes}
            onClick={props.hideBanner}
            // className="close-btn"
            aria-label="Close"
          />
        </div>

        <h1>Welcome to the Raptor Tracker</h1>
        <p>
          View movements and explore behavior patterns of raptors GPS tagged by
          Hawkwatch International.
        </p>
        <p>
          Click on the map to get started! Use the menu to select by study or
          view tracking periods. Raptor icons represent the most recent
          locations for each raptor. Click on a raptor or select a tracking
          period to view paths.
        </p>
      </div>
    </div>
  );
}
