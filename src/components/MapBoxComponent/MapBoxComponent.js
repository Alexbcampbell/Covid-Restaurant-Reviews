import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactMapGL, { Marker } from 'react-map-gl';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {} from '@material-ui/core';
import MarkerComponent from './MarkerComponent';
const markerIcon = require('./mapbox-icon.png');

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

class MapBoxComponent extends Component {
  state = {
    viewport: {
      latitude: 39.099724,
      longitude: -94.578331,
      zoom: 12,
      bearing: 0,
      pitch: 0,
    },
  };

  viewportChange = (change) => {
    this.setState({
      viewport: change,
    });
  };

  clickMap = (event) => {
    console.log('lng:', event.lngLat[0]);
    console.log('lat:', event.lngLat[1]);
  };

  forceUpdate() {
    this.props.dispatch({
      type: 'MAP_FORCE_UPDATE_ENFORCED',
    });
    this.setState({
      viewport: {
        ...this.state.viewport,
        latitude: this.props.store.cordsReducer.lat,
        longitude: this.props.store.cordsReducer.lng,
      },
    });
  }

  render() {
    if (this.props.store.cordsReducer.updateNeeded) {
      this.forceUpdate();
    }

    const latLongArray = [
      { long: -94.59433, lat: 38.97443 },
      { long: -94.59821, lat: 39.07897 },
      { long: -94.59104, lat: 39.04179 },
      { long: -94.595161, lat: 39.249088 },
      { long: -94.57325, lat: 39.24868 },
    ];

    let size;

    if (this.state.viewport.zoom < 9) {
      size = 0;
    } else {
      size = (this.state.viewport.zoom - 5) ** 2 / 4 + 25;
    }

    const markerPoint = latLongArray.map((item, index) => {
      return (
        <Marker
          longitude={item.long}
          latitude={item.lat}
          offsetTop={-size / 2}
          offsetLeft={-size / 2}
          key={index}
        >
          <img
            src={markerIcon}
            style={{
              width: size,
              height: size,
            }}
          />
        </Marker>
      );
    });
    return (
      <ReactMapGL
        {...this.state.viewport}
        width="75vw"
        height="50vh"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={(viewport) => this.setState({ viewport })}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        onclick={this.clickMap}
      >
        {markerPoint}
      </ReactMapGL>
    );
  }
}

export default connect(mapStoreToProps)(MapBoxComponent);
