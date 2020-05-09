import React from "react";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./MobileBanner.css";

export default function MobileBanner(props) {
  return (
    <div className="mobile-banner">
      {/* wrap in a parent so you can set the size on the parent instead of directly on the image */}
      <figure className="logo-container">
        <img
          className="mobile-logo"
          src="../../public/HWI-logo_tag2.png"
          alt="HWI logo"
        />
      </figure>
      <h1 className="app-name">Raptor Tracker</h1>
      <FontAwesomeIcon icon={faAlignLeft} onClick={props.toggleSideNav} />
    </div>
  );
}
