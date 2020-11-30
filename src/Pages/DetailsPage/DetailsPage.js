import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import Rating from '@material-ui/lab/Rating';
import {
  Grid,
  TextField,
  Button,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from '@material-ui/core';
import ReactMapGL from 'react-map-gl';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class DetailsPage extends Component {
  state = {
    viewport: {
      latitude: 39.099724,
      longitude: -94.578331,
      zoom: 12,
      bearing: 0,
      pitch: 0,
    },
  };
  componentDidMount() {
    console.log(this.props.match.params.id);
    this.props.dispatch({
      type: 'GET_DETAILS',
      payload: this.props.match.params.id,
    });
    this.props.dispatch({
      type: 'GET_REVIEWS',
      payload: this.props.match.params.id,
    });
  }

  render() {
    const restaurantDetails = this.props.store.restaurantDetailsReducer;

    return (
      <div>
        <div>
          <h2 className="reviewed">Restaurant Details</h2>
        </div>
        <div>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
          >
            <ReactMapGL
              {...this.state.viewport}
              width="25vw"
              height="25vh"
              mapStyle="mapbox://styles/mapbox/streets-v11"
              onViewportChange={(viewport) => this.setState({ viewport })}
              mapboxApiAccessToken={MAPBOX_TOKEN}
              onclick={this.clickMap}
            />
          </Grid>
        </div>
        <div>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
          >
            <p>
              <strong>{restaurantDetails.name}</strong>
            </p>
            <p>{restaurantDetails.street}</p>
            <p>
              {restaurantDetails.city}, {restaurantDetails.state}
            </p>
          </Grid>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(DetailsPage);
