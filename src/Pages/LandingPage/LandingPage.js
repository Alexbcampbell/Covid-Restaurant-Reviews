import './LandingPage.css';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Grid, Button, Paper } from '@material-ui/core';
const backgroundPhoto = require('./kenny-luo-7IiPopynx18-unsplash.jpg');

// CUSTOM COMPONENTS

class LandingPage extends Component {
  state = {
    heading: 'Welcome to COVID Restaurant Reviews!',
  };

  onLogin = (event) => {
    this.props.history.push('/login');
  };

  render() {
    return (
      <div className="container">
        <h2>{this.state.heading}</h2>

        <div className="grid">
          <div className="grid-col grid-col_8"></div>
          <Grid>
            <img src={backgroundPhoto} width="800" height="600" alt="tables" />
          </Grid>
          <div className="grid-col grid-col_4">
            <RegisterForm />

            <center>
              <h4>Already a Member?</h4>
              <button className="btn btn_sizeSm" onClick={this.onLogin}>
                Login
              </button>
            </center>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LandingPage);
