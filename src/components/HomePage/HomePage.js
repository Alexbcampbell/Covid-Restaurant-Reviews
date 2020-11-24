import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import MapBoxComponent from '../MapBoxComponent/MapBoxComponent';
import { Grid } from '@material-ui/core';
import RestaurantItem from '../RestaurantItem/RestaurantItem';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class HomePage extends Component {
  state = {};

  componentDidMount() {
    console.log('HELLO');
    this.props.dispatch({
      type: 'GET_RESTAURANTS',
      payload: this.props.store.restaurants,
    });
  }

  render() {
    const restaurantArray = this.props.store.restaurantReducer.map(
      (item, index) => {
        return (
          <Grid item xs={3} key={index}>
            <RestaurantItem restaurants={item} index={index} {...this.props} />
          </Grid>
        );
      }
    );

    return (
      <Grid
        container
        spacing={6}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid>
          <MapBoxComponent />
        </Grid>
        <Grid
          container
          spacing={4}
          direction="row"
          justify="center"
          alignItems="center"
        >
          {' '}
          {restaurantArray}
        </Grid>
      </Grid>
    );
  }
}

export default connect(mapStoreToProps)(HomePage);
