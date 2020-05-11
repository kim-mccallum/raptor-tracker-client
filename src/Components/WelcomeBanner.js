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
            className="close-btn"
            aria-label="close"
          />
        </div>

        <h1>Welcome to the Raptor Tracker</h1>
        <p>
          View tracks and explore movement behavior of raptors GPS tagged by
          Hawkwatch International.
        </p>
        <p>
          Click on the map or menu to get started! Filter data by study or view
          tracking recent or custom tracking periods. Raptor icons represent the
          most recent locations for each raptor. Click on a raptor or select a
          tracking period to view paths. Use the layer controls at the bottom
          right to view satellite imagery.
        </p>
      </div>
    </div>
  );
}
