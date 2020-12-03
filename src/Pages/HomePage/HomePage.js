import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import MapBoxComponent from '../../components/MapBoxComponent/MapBoxComponent';
import { Grid, Button } from '@material-ui/core';
import RestaurantItem from '../../components/RestaurantItem/RestaurantItem';

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

  clickToList = (event) => {
    this.props.history.push('/restaurantlist');
  };

  clickToAdd = (event) => {
    this.props.history.push('/add');
  };

  render() {
    const restaurantArray = this.props.store.restaurantReducer
      .slice(0, 3)
      .map((item, index) => {
        return (
          <Grid item xs={3} key={index}>
            <RestaurantItem restaurants={item} index={index} {...this.props} />
          </Grid>
        );
      });

    return (
      <div style={{ padding: 20 }}>
        <Grid
          container
          spacing={6}
          direction="column"
          justify="center"
          alignItems="center"
        >
          <div style={{ padding: 20 }}>
            <h2 className="reviewed">Welcome to COVID Restaurant Reviews!</h2>
            <Grid>
              <MapBoxComponent />
            </Grid>
            <Grid
              container
              spacing={12}
              direction="row"
              justify="space-evenly"
              alignItems="center"
            >
              <Grid item sm={8}>
                <h3>Browse the Restaurant List</h3>
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={this.clickToList}
                >
                  Restaurant List
                </Button>
              </Grid>
              <Grid item sm={3}>
                <h3>Add a New Restaurant</h3>
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={this.clickToAdd}
                >
                  Add Restaurant
                </Button>
              </Grid>
            </Grid>
            <div style={{ padding: 20 }}>
              <h3 className="reviewed">Recently Reviewed</h3>
              <Grid
                container
                spacing={4}
                direction="row"
                justify="center"
                alignItems="stretch"
              >
                {' '}
                {restaurantArray}
              </Grid>
            </div>
          </div>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(HomePage);
