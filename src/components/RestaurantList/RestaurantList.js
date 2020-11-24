import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Grid, Card } from '@material-ui/core';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class RestaurantList extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_RESTAURANTS',
    });
  }

  render() {
    return (
      <div>
        <div>
          <h2>Choose a restaurant to see its reviews!</h2>
        </div>
        <Grid container>
          {this.props.state.map((item, index) => {
            return (
              <Grid item xs={3} key={index}>
                <Card>{item}</Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(RestaurantList);
