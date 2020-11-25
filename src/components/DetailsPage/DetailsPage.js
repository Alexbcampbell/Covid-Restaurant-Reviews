import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class DetailsPage extends Component {
  componentDidMount() {
    console.log(this.props.match.params.id);
    this.props.dispatch({
      type: 'GET_RESTAURANTS',
      payload: this.props.match.params.id,
    });
    this.props.dispatch({
      type: 'GET_REVIEWS',
      payload: this.props.match.params.id,
    });
  }

  render() {
    const { restaurantDetails } = this.props.store;
    // const restaurantReview = .reviews.map((item, index) => {
    //   return ()
    // })
    return (
      <div>
        <h2></h2>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(DetailsPage);
