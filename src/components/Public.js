import React, { Component } from "react";
import Map from "./Map";
import EligibilityFilter from "./EligibilityFilter";
import LocationInfo from "./LocationInfo";

class Public extends Component {
  state = {
    locationsActive: [],
    activeKey: "",
    filter: {
      men: false,
      women: false,
      youth: false,
      mixed: false,
      family: false,
      other: false
    },
    search: ""
  };

  toggleLocationsActive = locationKey => {
    this.setState({
      activeKey: locationKey
    });
  };

  handleCheckboxChange = e => {
    const filter = { ...this.state.filter };
    filter[e.target.name] = !filter[e.target.name];
    this.setState({ filter });
  };

  updateSearch = e => {
    this.setState({ search: e.target.value });
  };

  render() {
    const currentLocation = this.props.locations.find(
      location => location.key === this.state.activeKey
    );
    //If all values false (no boxes checked use locations) otherwise filter using checked boxes
    let eligibilityFiltered = Object.values(this.state.filter).every(
      value => value === false
    )
      ? this.props.locations
      : this.props.locations.filter(location => {
          return location.eligibility.some(item => this.state.filter[item]);
        });
    //Check if there is a match with the search box

    console.log(eligibilityFiltered);
    let filteredLocations = eligibilityFiltered.filter(location => {
      return (
        location.orgName
          .toLowerCase()
          .indexOf(this.state.search.toLowerCase()) !== -1
      );
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
        {currentLocation && <LocationInfo currentLocation={currentLocation} />}
        <div className="central-intake">
          <a href="tel:+1-416-338-4766">Central Intake 416-338-4766</a>
        </div>
        <div className="eligibility-filter">
          <EligibilityFilter
            filter={this.state.filter}
            handleCheckboxChange={this.handleCheckboxChange}
          />
        </div>
        <div className="search-box">
          <label>
            {" "}
            Search by Name:
            <input
              type="text"
              value={this.state.search}
              onChange={this.updateSearch.bind(this)}
            />
          </label>
          {/* <button onClick={() => this.setState({ search: "" })}>
            Clear Search
          </button> */}
        </div>
      </div>
    );
  }
}

export default Public;
