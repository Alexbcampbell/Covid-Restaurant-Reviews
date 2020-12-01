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
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import ReactMapGL from 'react-map-gl';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class DetailsPage extends Component {
  state = {
    viewport: {
      latitude: 39.099724,
      longitude: -94.578331,
      zoom: 12,
      bearing: 0,
      pitch: 0,
    },
  };
  componentDidMount() {
    console.log(this.props.match.params.id);
    this.props.dispatch({
      type: 'GET_DETAILS',
      payload: this.props.match.params.id,
    });
    // this.props.dispatch({
    //   type: 'GET_REVIEWS',
    //   payload: this.props.match.params.id,
    // });
  }

  addReviewClick = (event) => {
    this.props.history.push('/review');
  };

  render() {
    const restaurantDetails = this.props.store.restaurantDetailsReducer;
    const reviews = this.props.store.restaurantDetailsReducer.reviews.map(
      (item, review) => {
        return (
          <div key={review}>
            <Grid>
              <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend">Overall Rating</Typography>
                <Rating name="simple-controlled" value={item.rating} />
              </Box>
            </Grid>
            {/* <Grid>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  Were employees wearing masks?
                </FormLabel>
                <RadioGroup
                  aria-label="masks"
                  name="masks"
                  value={item.masks ? true : true || item.masks ? false : false}
                >
                  {`${item.masks}`}
                </RadioGroup>
              </FormControl>
            </Grid> */}
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                {/* <Typography variant="h6">Text only</Typography> */}
                <div>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Were employees wearing masks?"
                        secondary={`${item.masks}`}
                      />
                    </ListItem>
                  </List>
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                {/* <Typography variant="h6">Text only</Typography> */}
                <div>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Were tables spaced at least 6ft apart?"
                        secondary={`${item.tables}`}
                      />
                    </ListItem>
                  </List>
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                {/* <Typography variant="h6">Text only</Typography> */}
                <div>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Were there more than ten people per party?"
                        secondary={`${item.party_size}`}
                      />
                    </ListItem>
                  </List>
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                {/* <Typography variant="h6">Text only</Typography> */}
                <div>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Was sanitizer offered to the public?"
                        secondary={`${item.sanitizer_offered}`}
                      />
                    </ListItem>
                  </List>
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                {/* <Typography variant="h6">Text only</Typography> */}
                <div>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Were there single use menus or QR codes to scan with a smart phone?"
                        secondary={`${item.menu}`}
                      />
                    </ListItem>
                  </List>
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                {/* <Typography variant="h6">Text only</Typography> */}
                <div>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Comments"
                        secondary={`${item.comments}`}
                      />
                    </ListItem>
                  </List>
                </div>
              </Grid>
            </Grid>
          </div>
        );
      }
    );

    return (
      <div>
        <div>
          <h2 className="reviewed">Restaurant Details</h2>
        </div>
        <div>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
          >
            <ReactMapGL
              {...this.state.viewport}
              width="25vw"
              height="25vh"
              mapStyle="mapbox://styles/mapbox/streets-v11"
              onViewportChange={(viewport) => this.setState({ viewport })}
              mapboxApiAccessToken={MAPBOX_TOKEN}
              onclick={this.clickMap}
            />
          </Grid>
        </div>
        <div style={{ padding: 20 }}>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
          >
            <p>
              <strong>{restaurantDetails.name}</strong>
            </p>
            <p>{restaurantDetails.street}</p>
            <p>
              {restaurantDetails.city}, {restaurantDetails.state}
            </p>
          </Grid>
          <div className="reviewed" style={{ padding: 20 }}>
            <Grid>
              <Button
                variant="contained"
                color="inherit"
                onClick={this.addReviewClick}
              >
                Add review!
              </Button>
            </Grid>
          </div>
          <div style={{ padding: 20 }}>
            <h3 className="reviewed">Reviews</h3>
            <Grid>{reviews}</Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(DetailsPage);
