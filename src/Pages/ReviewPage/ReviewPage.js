import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {
  Grid,
  TextField,
  Button,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class ReviewPage extends Component {
  state = {
    newReview: {
      rating: '',
      masks: '',
      tables: '',
      party_size: '',
      sanitizer_offered: '',
      menu: '',
      comments: '',
    },
  };

  handleNewReviewChange = (input) => (event) => {
    console.log('event happened');
    this.setState({
      newReview: {
        ...this.state.newReview,
        [input]: event.target.value,
      },
    });
  };

  addNewReview = (event) => {
    event.preventDefault();
    this.props.dispatch({
      type: 'POST_REVIEW',
      payload: this.state.newReview,
    });
    this.setState({
      newReview: {
        rating: '',
        masks: '',
        tables: '',
        party_size: '',
        sanitizer_offered: '',
        menu: '',
        comments: '',
      },
    });
  };

  onCancel = (event) => {
    this.props.history.push('/details');
  };

  render() {
    return (
      <div>
        <Grid container direction="column" justify="center" alignItems="center">
          <div>
            <FormControl component="fieldset">
              <FormLabel component="legend">
                Were employees wearing masks?
              </FormLabel>
              <RadioGroup
                aria-label="masks"
                name="masks"
                // value={value}
                onChange={this.handleNewReviewChange('masks')}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            <TextField
              id="outlined-basic"
              label="Restaurant Name"
              variant="outlined"
              onChange={this.handleNewReviewChange('name')}
            />
            <TextField
              id="outlined-basic"
              label="Street Address"
              variant="outlined"
              onChange={this.handleNewReviewChange('street')}
            />
            <TextField
              id="outlined-basic"
              label="City"
              variant="outlined"
              onChange={this.handleNewReviewChange('city')}
            />
            <TextField
              id="outlined-basic"
              label="State"
              variant="outlined"
              onChange={this.handleNewReviewChange('state')}
            />
          </div>
          <div style={{ padding: 20 }}>
            <Box pt={1}>
              <Button
                onClick={this.addNewRestaurant}
                variant="contained"
                color="inherit"
              >
                Submit
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

export default connect(mapStoreToProps)(ReviewPage);
