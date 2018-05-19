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
    console.log(locationsActive);
    this.setState({
      locationsActive
    });
  }


  toggleLocationsActive = locationKey => {
    this.state.locationsActive.length === 0 && this.setLocationsActive();
    const locationsActive = [...this.state.locationsActive];
    console.log("from toggleLocationsActive", locationsActive);
    const locationIndex = locationsActive.findIndex(
      location => Object.keys(location)[0] === locationKey
    );
    locationsActive[locationIndex][locationKey].active = !locationsActive[locationIndex][locationKey].active

    this.setState({
      locationsActive
    });
  };

  render() {



    return (
      <div>
        <p>This is the Public Component</p>
        <button onClick={() => this.setLocationsActive()}>CLICK ME</button>
        <Map
          locations={this.props.locations}
          locationsActive={this.state.locationsActive}
          toggleLocationsActive={this.toggleLocationsActive}
        />
        <ul>
          {}
          {this.props.locations.map(location => (
            <li key={location.key}>{location.orgName}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Public;
