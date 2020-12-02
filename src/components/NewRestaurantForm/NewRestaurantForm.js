import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Grid, TextField, Button, Box } from '@material-ui/core';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class NewRestaurantForm extends Component {
  state = {
    newRestaurant: {
      name: '',
      street: '',
      city: '',
      state: '',
    },
  };

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
            {/* <InputLabel id="demo-simple-select-filled-label">State</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={this.state.input}
              onChange={this.handleNewRestaurantChange('state')}
            >
              <option>Missouri</option>
              <option>Kansas</option>
            </Select> */}
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
