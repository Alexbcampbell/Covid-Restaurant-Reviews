import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

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
  };

  render() {
    return (
      <div>
        <div>
          <h2>Add a new restaurant!</h2>
        </div>
        <div>
          <input
            placeholder="Name"
            type="text"
            value={this.state.newRestaurant.name}
            onChange={this.handleNewRestaurantChange('name')}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(NewRestaurantForm);
