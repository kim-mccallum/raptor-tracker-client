import React from "react";
import "./WelcomeBanner.css";

export default function WelcomeBanner(props) {
  return (
    <div className="backdrop" onClick={props.hideBanner}>
      <div className="welcome-banner-overlay">
        <button
          type="button"
          className="close-btn"
          aria-label="Close"
          onClick={props.hideBanner}
        >
          &times;
        </button>
        <h1>Welcome to the Raptor Tracker</h1>
        <p>
          View movements and explore behavior patterns of raptors GPS tagged by
          Hawkwatch International. Use the menu on the left to select by species
          and date.
        </p>
        <p>
          Click on the map to get started! Use the menu on the left to select
          tracking periods. Raptor icons represent the most recent locations for
          each raptor. Click on a raptor or select a tracking period to view
          their paths.
        </p>
      </div>
    </div>
  );
}
