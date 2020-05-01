import React, { Component } from "react";
import SelectionMenu from "./SelectionMenu";
import "./Nav.css";

export default class Nav extends Component {
  render() {
    return (
      <>
        <nav className="app-nav" onClick={this.props.hideBanner}>
          <img
            className="logo"
            src="https://hawkwatch.org/images/HWI-logo_tag2.png"
            alt="HWI logo"
          />
          <SelectionMenu
            filterData={this.props.filterData}
            isRaptorClicked={this.props.isRaptorClicked}
            raptorId={this.props.raptorId}
            activateIsRaptorClicked={this.props.activateIsRaptorClicked}
            deactivateIsRaptorClicked={this.props.deactivateIsRaptorClicked}
          />
          <ul>
            <li>
              <a href="https://hawkwatch.org/our-work/tracking" target="blank">
                Learn about tracking
              </a>
            </li>
            <li>
              <a href="https://hawkwatch.org/about/contact-us" target="blank">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </>
    );
  }
}
