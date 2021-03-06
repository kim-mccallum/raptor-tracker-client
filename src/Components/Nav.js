import React, { Component } from "react";
import SelectionMenu from "./SelectionMenu";
import "./Nav.css";

export default class Nav extends Component {
  render() {
    // console.log(this.props);
    return (
      <>
        <nav className="app-nav" id={this.props.toggleMobile ? "active" : null}>
          <img
            className="logo"
            src="https://hawkwatch.org/images/HWI-logo_tag2.png"
            alt="HWI logo"
          />
          <SelectionMenu
            filterData={this.props.filterData}
            raptorId={this.props.raptorId}
            firstData={this.props.firstData}
            recentData={this.props.recentData}
          />
          <ul>
            <li>
              <a href="https://hawkwatch.org/our-work/tracking" target="blank">
                About tracking
              </a>
            </li>
            <li>
              <a
                href="https://hawkwatch.org/our-work/vanishing-vultures"
                target="blank"
              >
                Vanishing vultures
              </a>
            </li>
            <li>
              <a
                href="https://hawkwatch.org/component/civicrm/?task=civicrm/contribute/transact&reset=1&id=5"
                target="blank"
              >
                Support
              </a>
            </li>
          </ul>
        </nav>
      </>
    );
  }
}
