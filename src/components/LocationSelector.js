import React, { Component } from "react";

class LocationSelector extends Component {
  render() {
    return (
      <React.Fragment>
        <select
          name="location-selector"
          // ref={this.locationRef}
          type="text"
          onChange={e => this.props.updateLocation(e.currentTarget.value)}
        >
          {this.props.locations.map(location => (
            <option key={location.key} value={location.key}>
              {location.orgName}
            </option>
          ))}
        </select>
      </React.Fragment>
    );
  }
}

export default LocationSelector;
