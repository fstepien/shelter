import React, { Component } from "react";
import Map from "./Map";
import EligibilityFilter from "./EligibilityFilter";
import LocationInfo from "./LocationInfo";
import CentralIntake from "./CentralIntake";
import Chart from "./Chart";
import { clear, filter } from "./../assets/icons";

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
    search: "",
    sidebar: false
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
          return location.eligibility.some(
            item => this.state.filter[item.replace(/ .*/, "")]
          );
        });
    //Check if there is a match with the search box

    let filteredLocations = eligibilityFiltered.filter(location => {
      return (
        location.orgName
          .toLowerCase()
          .indexOf(this.state.search.toLowerCase()) !== -1 ||
        location.programName
          .toLowerCase()
          .indexOf(this.state.search.toLowerCase()) !== -1
      );
    });

    return (
      <React.Fragment>
        <section className="main-section">
          <div
            className={
              this.state.sidebar
                ? "main-section-info-open"
                : "main-section-info-closed"
            }
          >
            <header>
              <div className="main-section-wrap wrap80">
                <h1>Shelter Watch</h1>
                <div className="search-box">
                  <label for="search" className="visuallyhidden">
                    {" "}
                    Search by Name:
                  </label>
                  <input
                    id="serach"
                    name="search"
                    type="text"
                    value={this.state.search}
                    placeholder="Search Shelters"
                    onChange={this.updateSearch.bind(this)}
                  />

                  <button onClick={() => this.setState({ search: "" })}>
                    {clear}
                  </button>
                </div>
              </div>
            </header>

            <Map
              locations={filteredLocations}
              activeKey={this.state.activeKey}
              locationsActive={this.state.locationsActive}
              toggleLocationsActive={this.toggleLocationsActive}
            />
            <section className="main-info wrap80">
              {currentLocation && (
                <React.Fragment>
                  <LocationInfo currentLocation={currentLocation} />
                  <Chart currentLocation={currentLocation} />
                </React.Fragment>
              )}

              <CentralIntake />
            </section>
          </div>
          <EligibilityFilter
            sidebar={this.state.sidebar}
            filter={this.state.filter}
            handleCheckboxChange={this.handleCheckboxChange}
          />
        </section>
      </React.Fragment>
    );
  }
}

export default Public;
