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

class ReviewPage extends Component {
  state = {
    newReview: {
      rating: 0,
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
      payload: {
        ...this.state.newReview,
        restaurantId: this.props.match.params.id,
      },
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
    this.props.history.push(`/details/${this.props.match.params.id}`);
  };

  onCancel = (event) => {
    this.props.history.push(`/details/${this.props.match.params.id}`);
  };

  render() {
    return (
      <div>
        <Grid container direction="column" justify="center" alignItems="center">
          <div>
            <Grid>
              <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend">Overall Rating</Typography>
                <Rating
                  name="simple-controlled"
                  value={this.state.newReview.rating}
                  onChange={this.handleNewReviewChange('rating')}
                />
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
                  value={this.state.newReview.masks}
                  onChange={this.handleNewReviewChange('masks')}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
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
                  value={this.state.newReview.tables}
                  onChange={this.handleNewReviewChange('tables')}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
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
                  value={this.state.newReview.party_size}
                  onChange={this.handleNewReviewChange('party_size')}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
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
                  value={this.state.newReview.sanitizer_offered}
                  onChange={this.handleNewReviewChange('sanitizer_offered')}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  Were there single use menus or QR codes to scan with a smart
                  phone?
                </FormLabel>
                <RadioGroup
                  aria-label="menu"
                  name="menu"
                  value={this.state.newReview.menu}
                  onChange={this.handleNewReviewChange('menu')}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
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
                value={this.state.newReview.comments}
                onChange={this.handleNewReviewChange('comments')}
              />
            </Grid>
          </div>
          <div style={{ padding: 20 }}>
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
          </div>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ReviewPage);
