import React, { Component } from "react";
// import shelters from "./../data/shelters.json";



class Admin extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>This is the the admin page</h1>
        <p>
          this will include a login and then form section to upload new shelter
          info
        </p>
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
