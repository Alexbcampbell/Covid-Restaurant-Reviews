import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import MapBoxComponent from '../MapBoxComponent/MapBoxComponent';
import { Grid } from '@material-ui/core';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class HomePage extends Component {
  state = {};

  render() {
    return (
      <Grid container spacing={3}>
        <MapBoxComponent />
      </Grid>
    );
  }
}

export default connect(mapStoreToProps)(HomePage);
