import React, { Component } from "react";

class LocationInfo extends Component {
  render() {
    const { currentLocation } = this.props;
    return (
      <React.Fragment>
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
            <span className="location-info-value">{currentLocation.hours}</span>
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
            <span className="location-info-value">{currentLocation.phone}</span>
          </p>
        </div>
      </React.Fragment>
    );
  }
}

export default LocationInfo;
