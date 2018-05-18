import React, { Component } from "react";
const { compose, withProps, withState, withHandlers } = require("recompose");
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
    const MapWithControlledZoom = compose(
      withProps({
        googleMapURL:
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyB-_GBwR4R1xZT8QnV1q1ph88yH1VeylfI&vv=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `600px` }} />,
        mapElement: <div style={{ height: `100%` }} />
      }),
      withState("zoom", "onZoomChange", 8),
      withHandlers(() => {
        const refs = {
          map: undefined
        };

        return {
          onMapMounted: () => ref => {
            refs.map = ref;
          },
          onZoomChanged: ({ onZoomChange }) => () => {
            onZoomChange(refs.map.getZoom());
          }
        };
      }),
      withScriptjs,
      withGoogleMap
    )(props => (
      <GoogleMap
        defaultCenter={{ lat: 43.64918, lng: -79.397859 }}
        zoom={props.zoom}
        ref={props.onMapMounted}
        onZoomChanged={props.onZoomChanged}
      >
        {this.props.locations.map(location => (
          <Marker
            key={location.key}
            position={{
              lat: location.latitude,
              lng: location.longitude
            }}
            onClick={props.onToggleOpen}
          >
            {console.log(location)}
            <InfoWindow onCloseClick={props.onToggleOpen}>
              <div>
                <FaAnchor /> {location.orgName}
              </div>
            </InfoWindow>
          </Marker>
        ))}
      </GoogleMap>
    ));
    /////END OF SECOND TRY

    return (
      <div>
        {/* <MapWithAMarkerWithLabel
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB-_GBwR4R1xZT8QnV1q1ph88yH1VeylfI&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `700px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        /> */}
        <MapWithControlledZoom />
      </div>
    );
  }
}
export default Map;
