import React, { Component } from "react";
import Map from "./Map";

class Public extends Component {
  state = {
    locationsActive: []
  };

  setLocationsActive = () => {
    const locationsActive = [];
    this.props.locations.map(location =>
      locationsActive.push({
        [location.key]: {
          name: location.orgName,
          active: false
        }
      })
    );
    this.setState({
      locationsActive
    });
  };

  toggleLocationsActive = locationKey => {
    this.state.locationsActive.length === 0 && this.setLocationsActive();

    const locationsActive = [...this.state.locationsActive];
    locationsActive.forEach(location => {
      for (let key in location) {
        location[key].active = false;
      }
    });
    const locationIndex = locationsActive.findIndex(
      location => Object.keys(location)[0] === locationKey
    );
    locationsActive[locationIndex][locationKey].active = !locationsActive[
      locationIndex
    ][locationKey].active;
    // console.log("from toggleLocationsActive", this.state.locationsActive);
    this.setState({
      locationsActive
    });
  };

  render() {
    return (
      <div>
        <p>This is the Public Component</p>

        <Map
          locations={this.props.locations}
          locationsActive={this.state.locationsActive}
          toggleLocationsActive={this.toggleLocationsActive}
        />
        <ul>
          {this.props.locations.map(location => (
            <li key={location.key}>{location.orgName}</li>
          ))}
        </ul>
        <div>
          <a href="tel:+1-416-338-4766">Central Intake 416-338-4766</a>
        </div>
      </div>
    );
  }
}

export default Public;
