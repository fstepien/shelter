import React, { Component } from "react";
import Map from "./Map";

class Public extends Component {
  render() {
    return (
      <div>
        <p>This is the Public Component</p>
        <button onClick={() => this.props.testLog()}>CLICK ME</button>
        <Map locations={this.props.locations} />
        <ul>
          {this.props.locations.map(location => (
            <li key={location.key}>{location.orgName}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Public;
