import React, { Component } from "react";
import shelters from "./../data/shelters.json";

class Operations extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>This is the the opreations page</h1>
        {shelters.data.map(shelter => console.log(shelter))}
      </React.Fragment>
    );
  }
}

export default Operations;
