import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Marker } from 'react-map-gl';
import mapStoreToProps from '../../redux/mapStoreToProps';

const markerIcon = require('./mapbox-icon.png');

class MarkerComponent extends Component {
  render() {
    return (
      <Marker
        longitude={this.props.item.long}
        latitude={this.props.item.lat}
        offsetTop={-this.props.size / 2}
        offsetLeft={-this.props.size / 2}
        key={this.props.index}
      >
        <img
          src={markerIcon}
          alt="Custom markers"
          style={{
            width: this.props.size,
            height: this.props.size,
          }}
        />
      </Marker>
    );
  }
}

export default connect(mapStoreToProps(MarkerComponent));
