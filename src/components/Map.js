import React, { Component } from "react";
const { compose, withProps, withStateHandlers } = require("recompose");
const FaAnchor = require("react-icons/lib/fa/anchor");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} = require("react-google-maps");

class Map extends Component {
  render() {
    const MapWithAMakredInfoWindow = compose(
      withStateHandlers(
        () => ({
          isOpen: false
        }),
        {
          onToggleOpen: ({ isOpen }) => () => ({
            isOpen: !isOpen
          })
        }
      ),
      withScriptjs,
      withGoogleMap
    )(props => (
      <GoogleMap
        defaultZoom={16}
        defaultCenter={{ lat: 43.64918, lng: -79.397859 }}
      >
        {this.props.locations.map((location, i) => (
          <Marker
            key={location.key}
            position={{
              lat: location.latitude,
              lng: location.longitude
            }}
            onClick={() => this.props.toggleLocationsActive(location.key)}
          >
            {this.props.locationsActive[i] && this.props.locationsActive[i][location.key].active && (
              <InfoWindow onCloseClick={props.onToggleOpen}>
                <div>{location.orgName}</div>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
    ));

    /////END OF MAP

    return (
      <React.Fragment>
        <MapWithAMakredInfoWindow
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB-_GBwR4R1xZT8QnV1q1ph88yH1VeylfI&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </React.Fragment>
    );
  }
}
export default Map;
