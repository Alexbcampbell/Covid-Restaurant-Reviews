import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Grid } from '@material-ui/core';
import RestaurantItem from '../../components/RestaurantItem/RestaurantItem';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class RestaurantList extends Component {
  componentDidMount() {
    console.log('HELLO');
    this.props.dispatch({
      type: 'GET_RESTAURANTS',
      payload: this.props.store.restaurants,
    });
  }

  onChange = (key) => (event) => {
    this.setState(
      {
        ...this.state,
        [key]: event.target.value,
      },
      () => {
        console.log(this.state);
      }
    );
  };

  search = (event) => {
    this.props.dispatch({
      type: 'FETCH_OPEN_CAGE',
      payload: { search_string: this.state.search_string },
    });
  };

  render() {
    console.log(this.props.store.cordsReducer);
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
      <div>
        <div>
          <input type="text" onChange={this.onChange('search_string')}></input>
          <button onClick={this.search}>Search</button>
        </div>
        <div style={{ padding: 20 }}>
          <Grid
            container
            spacing={3}
            direction="row"
            justify="space-evenly"
            alignItems="stretch"
          >
            <h2>Choose a restaurant to see its reviews!</h2>
          </Grid>
        </div>
        <div style={{ padding: 20 }}>
          <Grid
            container
            spacing={3}
            direction="row"
            justify="center"
            alignItems="stretch"
          >
            {restaurantArray}
          </Grid>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(RestaurantList);
