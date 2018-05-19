import React, { Component } from "react";
import Map from "./Map";
import EligibilityFilter from "./EligibilityFilter";

class Public extends Component {
  state = {
    locationsActive: [],
    activeKey: "-LCj0DdKz1HwGizn1HCl",
    filter: {
      men: true,
      women: true,
      mixed: true,
      family: true
    },
    search: ""
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
      locationsActive,
      activeKey: locationKey
    });
  };

  handleCheckboxChange = () => {
    console.log("checkbox change");
  };

  updateSearch = e => {
    this.setState({ search: e.target.value });
  };

  render() {
    const currentLocation = this.props.locations.find(
      location => location.key === this.state.activeKey
    );

    let filteredLocations = this.props.locations.filter(location => {
      return location.orgName.indexOf(this.state.search) !== -1;
    });

    return (
      <div>
        <p>This is the Public Component</p>

        <Map
          locations={filteredLocations}
          activeKey={this.state.activeKey}
          locationsActive={this.state.locationsActive}
          toggleLocationsActive={this.toggleLocationsActive}
        />
        {currentLocation && (
          <div className="location-info">
            <h3>{currentLocation.orgName}</h3>
            {/* add code so Availability is only shown if updated within 12 or 24  hours */}
            <p>
              <span className="location-info-label">Availability: </span>
              <span className="location-info-value">
                {currentLocation.CAPACITY - currentLocation.OCCUPANCY} of{" "}
                {currentLocation.CAPACITY} beds. last udpated:{" "}
                {currentLocation.udpated}
              </span>
            </p>
            <p>
              <span className="location-info-label">Address: </span>
              <span className="location-info-value">
                {currentLocation.address}
              </span>
            </p>
            <p>
              <span className="location-info-label">Hours: </span>
              <span className="location-info-value">
                {currentLocation.hours}
              </span>
            </p>
            <p>
              <span className="location-info-label">Eligibility: </span>
              <span className="location-info-value">
                {currentLocation.eligibility.map((index, i) => (
                  <span key={i}> {index} </span>
                ))}
              </span>
            </p>
            <p>
              <span className="location-info-label">Eligibility Notes: </span>
              <span className="location-info-value">
                {currentLocation.eligibilityNotes}
              </span>
            </p>
            <p>
              <span className="location-info-label">Phone: </span>
              <span className="location-info-value">
                {currentLocation.phone}
              </span>
            </p>
          </div>
        )}
        <div className="central-intake">
          <a href="tel:+1-416-338-4766">Central Intake 416-338-4766</a>
        </div>
        <div className="eligibility-filter">
          <EligibilityFilter handleCheckboxChange={this.handleCheckboxChange} />
        </div>
        <div className="search-box">
          <input
            type="text"
            value={this.state.search}
            onChange={this.updateSearch.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default Public;
