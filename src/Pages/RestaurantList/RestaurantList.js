import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Grid } from '@material-ui/core';
import RestaurantItem from '../../components/RestaurantItem/RestaurantItem';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.

const baseMap = {
  type: 'raster',
  tiles: ['http://tile.stamen.com/toner/{z}/{x}/{y}.png'],
  tileSize: 256,
  attribution:
    'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
};

class RestaurantList extends Component {
  state = {
    viewport: {
      latitude: 39.099724,
      longitude: -94.578331,
      zoom: 12,
      bearing: 0,
      pitch: 0,
    },
    style: {
      version: 8,
      sources: baseMap,
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
