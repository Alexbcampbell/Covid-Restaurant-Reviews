import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import Rating from '@material-ui/lab/Rating';
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
  Typography,
} from '@material-ui/core';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class DetailsPage extends Component {
  componentDidMount() {
    console.log(this.props.match.params.id);
    this.props.dispatch({
      type: 'GET_DETAILS',
      payload: this.props.match.params.id,
    });
    this.props.dispatch({
      type: 'GET_REVIEWS',
      payload: this.props.match.params.id,
    });
  }

  render() {
    const { restaurantDetails } = this.props;
    const restaurantReview = restaurantDetails.reviews.map((item, index) => {
      return (
        <div key={index}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <div>
              <Grid>
                <Box component="fieldset" mb={3} borderColor="transparent">
                  <Typography component="legend">Overall Rating</Typography>
                  <Rating name="simple-controlled" value={item.rating} />
                </Box>
              </Grid>
              <Grid>
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    Were employees wearing masks?
                  </FormLabel>
                  <RadioGroup
                    aria-label="masks"
                    name="masks"
                    value={item.masks}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid>
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    Were tables spaced at least 6ft apart?
                  </FormLabel>
                  <RadioGroup
                    aria-label="tables"
                    name="tables"
                    value={this.tables}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid>
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    Were there more than ten people per party?
                  </FormLabel>
                  <RadioGroup
                    aria-label="party_size"
                    name="party_size"
                    value={this.party_size}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid>
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    Was sanitizer offered to the public?
                  </FormLabel>
                  <RadioGroup
                    aria-label="sanitizer_offered"
                    name="sanitizer_offered"
                    value={this.sanitizer_offered}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid>
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    Were there single use menus or QR codes to scan with a smart
                    phone?
                  </FormLabel>
                  <RadioGroup aria-label="menu" name="menu" value={this.menu}>
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid>
                <TextField
                  id="outlined-multiline-static"
                  label="Comments"
                  multiline
                  rows={4}
                  placeholder="Input additional comments here!"
                  variant="outlined"
                  value={this.comments}
                />
              </Grid>
            </div>
            {/* <div style={{ padding: 20 }}>
            <Box pt={1}>
              <Button
                onClick={this.addNewReview}
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
          </div> */}
          </Grid>
        </div>
      );
    });
    return (
      <div>
        <h2>{restaurantDetails.name}</h2>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(DetailsPage);
