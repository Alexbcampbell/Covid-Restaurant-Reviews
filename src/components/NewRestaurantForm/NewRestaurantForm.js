import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Grid, TextField, Button, Box } from '@material-ui/core';

class NewRestaurantForm extends Component {
  state = {
    newRestaurant: {
      name: '',
      street: '',
      city: '',
      state: '',
      longitude: '',
      latitude: '',
    },
  };

  // function getCoordinates() {

  // }

  handleNewRestaurantChange = (input) => (event) => {
    console.log('event happened');
    this.setState({
      newRestaurant: {
        ...this.state.newRestaurant,
        [input]: event.target.value,
      },
    });
  };

  addNewRestaurant = (event) => {
    event.preventDefault();
    //GET GEO CORDS HERE
    this.props.dispatch({
      type: 'POST_RESTAURANT',
      payload: this.state.newRestaurant,
    });
    this.setState({
      newRestaurant: {
        name: '',
        street: '',
        city: '',
        state: '',
        longitude: '',
        latitude: '',
      },
    });
    this.props.history.push('/restaurantlist');
  };

  onCancel = (event) => {
    this.props.history.push('/homepage');
  };

  render() {
    return (
      <div>
        <Grid container direction="column" justify="center" alignItems="center">
          <div>
            <TextField
              id="outlined-basic"
              label="Restaurant Name"
              variant="outlined"
              value={this.state.newRestaurant.name}
              onChange={this.handleNewRestaurantChange('name')}
            />
            <TextField
              id="outlined-basic"
              label="Street Address"
              variant="outlined"
              value={this.state.newRestaurant.street}
              onChange={this.handleNewRestaurantChange('street')}
            />
            <TextField
              id="outlined-basic"
              label="City"
              variant="outlined"
              value={this.state.newRestaurant.city}
              onChange={this.handleNewRestaurantChange('city')}
            />
            <TextField
              id="outlined-basic"
              label="State"
              variant="outlined"
              value={this.state.newRestaurant.state}
              onChange={this.handleNewRestaurantChange('state')}
            />
          </div>
          <div style={{ padding: 20 }}>
            <Box pt={1}>
              <Button
                onClick={this.addNewRestaurant}
                variant="contained"
                color="inherit"
              >
                Save
              </Button>
            </Box>
            <Box pt={1}>
              <Button
                onClick={this.onCancel}
                variant="contained"
                color="secondary"
              >
                Cancel
              </Button>
            </Box>
          </div>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(NewRestaurantForm);
