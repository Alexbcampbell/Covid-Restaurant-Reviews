import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactMapGL from 'react-map-gl';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {} from '@material-ui/core';

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

  clickMap = (event) => {};

  render() {
    return (
      <ReactMapGL
        {...this.state.viewport}
        width="75vw"
        height="50vh"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={(viewport) => this.setState({ viewport })}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        onclick={this.clickMap}
      />
    );
  }
}

export default connect(mapStoreToProps)(MapBoxComponent);
