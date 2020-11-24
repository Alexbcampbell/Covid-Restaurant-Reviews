import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactMapGL from 'react-map-gl';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {} from '@material-ui/core';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

class MapBoxComponent extends Component {
  state = {
    viewport: {
      latitude: 37.8,
      longitude: -122.4,
      zoom: 14,
      bearing: 0,
      pitch: 0,
    },
  };

  viewportChange = (change) => {
    this.setState({
      viewport: change,
    });
  };

  clickMap = (event) => {};

  render() {
    return (
      <ReactMapGL
        {...this.state.viewport}
        width="75vw"
        height="50vh"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={(viewport) => this.setState({ viewport })}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        onclick={this.clickMap}
      />
    );
  }
}

export default connect(mapStoreToProps)(MapBoxComponent);
