import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactMapGL, { Marker } from 'react-map-gl';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {} from '@material-ui/core';
const markerIcon = require('./mapbox-icon.png');

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

let points;

const baseMap = {
  type: 'raster',
  tiles: ['http://tile.stamen.com/toner/{z}/{x}/{y}.png'],
  tileSize: 256,
  attribution:
    'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
};

class MapBoxComponent extends Component {
  points = { type: 'geojson', data: this.props.store.restaurants };

  state = {
    viewport: {
      latitude: 39.099724,
      longitude: -94.578331,
      zoom: 9,
      bearing: 0,
      pitch: 0,
    },
    style: {
      version: 8,
      sources: { baseMap, points },
      layers: [
        {
          id: 'stamentoner',
          type: 'raster',
          source: baseMap,
          minzoom: 0,
          maxzoom: 22,
        },
      ],
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

    let size;

    if (this.state.viewport.zoom < 9) {
      size = 0;
    } else {
      size = (this.state.viewport.zoom - 5) ** 2 / 4 + 15;
    }

    const newMarker = this.props.store.restaurantReducer.map(
      (restaurant, index) => (
        <Marker
          key={index}
          longitude={restaurant.longitude}
          latitude={restaurant.latitude}
          offsetTop={-size / 2}
          offsetLeft={-size / 2}
        >
          <img src={markerIcon} alt="map Icon" />
        </Marker>
      )
    );

    return (
      <ReactMapGL
        {...this.state.viewport}
        width="75vw"
        height="50vh"
        // mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={(viewport) => this.setState({ viewport })}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        onclick={this.clickMap}
      >
        {newMarker}
      </ReactMapGL>
    );
  }
}

export default connect(mapStoreToProps)(MapBoxComponent);
