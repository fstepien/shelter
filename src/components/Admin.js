import React, { Component } from "react";
// import shelters from "./../data/shelters.json";
import LocationSelector from "./LocationSelector";
import LocationInfo from "./LocationInfo";
import Add from "react-icons/lib/md/add-circle-outline";
import Minus from "react-icons/lib/md/remove-circle-outline";
import firebase from "firebase";

class Admin extends Component {
  state = {
    activeKey: "",
    status: {
      activeOccupancy: 0,
      activeCapacity: 0
    }
  };

  updateLocation = activeKey => {
    const status = { ...this.state.status };
    console.log(activeKey);
    const locationIndex = this.props.locations.findIndex(
      location => location.key === activeKey
    );
    console.log(locationIndex);
    status.activeOccupancy = this.props.locations[locationIndex].OCCUPANCY;
    this.setState({ activeKey });
  };

  updateStatus = e => {
    const status = { ...this.state.status };
    status[e.currentTarget.name] =
      status[e.currentTarget.name] + parseInt(e.currentTarget.value, 0);
    status[e.currentTarget.name] < 0 && (status[e.currentTarget.name] = 0);
    this.setState({ status });
  };

  submitStatus = () => {
    console.log("submit status");
    const time = Date.now();
    const updated = new Date();
    const locationStatus = {
      CAPACITY: this.state.status.activeCapacity,
      OCCUPANCY: this.state.status.activeOccupancy,
      time,
      updated
    };
    firebase
      .database()
      .ref()
      .child("/locations/" + this.state.activeKey)
      .update(locationStatus);
  };

  render() {
    const currentLocation = this.props.locations.find(
      location => location.key === this.state.activeKey
    );

    return (
      <React.Fragment>
        <h1>This is the the admin page</h1>
        <p>
          this will include a login and then form section to upload new shelter
          info
        </p>
        <LocationSelector
          locations={this.props.locations}
          updateLocation={this.updateLocation}
        />
        {currentLocation && <LocationInfo currentLocation={currentLocation} />}

        {this.state.activeKey !== "" && (
          <div className="operations-status">
            <h3>Ocupancy</h3>
            <div className="operations-status-occupancy">
              {this.state.status.activeOccupancy}{" "}
              <button
                name="activeOccupancy"
                value={-1}
                onClick={this.updateStatus}
              >
                <Minus />
              </button>
              <button
                name="activeOccupancy"
                value={1}
                onClick={e => this.updateStatus(e)}
              >
                <Add />
              </button>
            </div>

            <h3>Capacity</h3>
            <div className="operations-status-occupancy">
              {this.state.status.activeCapacity}
              <button
                name="activeCapacity"
                value={-1}
                onClick={this.updateStatus}
              >
                <Minus />
              </button>
              <button
                name="activeCapacity"
                value={1}
                onClick={e => this.updateStatus(e)}
              >
                <Add />
              </button>
            </div>
          </div>
        )}
        <button onClick={this.submitStatus}>Submit Change</button>
        <div className="central-intake">
          <a href="tel:+1-416-338-4766">Central Intake 416-338-4766</a>
        </div>

        {/* DANGER!!!! THIS WILL ADD EVERYTHING FROM THE JSON REQUIRED FOR INITIAL DATA POP ONLY */}

        {/* {shelters.data.map(shelter => {
          const shelterInfo = shelter;
          shelterInfo.OCCUPANCY = 0;
          shelterInfo.CAPACITY = 0;
          shelterInfo.updated = "";
          shelterInfo.time = 0;

          console.log(shelterInfo);
          const dbRef = firebase.database().ref("locations");
          dbRef.push(shelterInfo);
        })} */}
      </React.Fragment>
    );
  }
}

export default Admin;
