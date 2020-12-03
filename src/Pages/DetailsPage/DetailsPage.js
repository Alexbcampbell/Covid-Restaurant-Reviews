import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CancelIcon from '@material-ui/icons/Cancel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Rating from '@material-ui/lab/Rating';
import {
  Grid,
  Button,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import ReactMapGL from 'react-map-gl';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const baseMap = {
  type: 'raster',
  tiles: ['http://tile.stamen.com/toner/{z}/{x}/{y}.png'],
  tileSize: 256,
  attribution:
    'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
};

class DetailsPage extends Component {
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
    this.props.dispatch({
      type: 'GET_DETAILS',
      payload: this.props.match.params.id,
    });
  }

  addReviewClick = (event) => {
    this.props.history.push('/review');
  };

  onDeleteClick = (event) => {
    this.props.dispatch({
      type: 'DELETE_REVIEW',
      payload: this.props.match.params.id,
    });
  };

  onEditClick = (event) => {
    this.props.history.push('/edit');
  };

  render() {
    const restaurantDetails = this.props.store.restaurantDetailsReducer;
    const reviews = this.props.store.restaurantDetailsReducer.reviews.map(
      (item, review) => {
        return (
          <div key={review}>
            <Grid>
              <Paper elevation={3} xs={6} md={6}>
                <Grid item xs={12} md={12}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Overall Rating</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <Rating name="simple-controlled" value={item.rating} />
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                <Grid container>
                  <Grid item xs={12} md={12}>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>Were employees wearing masks?</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <ListItemText primary={`${item.masks}`} />
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} md={12}>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>
                          Were tables spaced at least 6ft apart?
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <ListItemText primary={`${item.tables}`} />
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} md={12}>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>
                          Were there more than ten people per party?
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <ListItemText primary={`${item.party_size}`} />
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} md={12}>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>
                          Was sanitizer offered to the public?
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <ListItemText primary={`${item.sanitizer_offered}`} />
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} md={12}>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>
                          Were there single use menus or QR codes to scan with a
                          smart phone?
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <ListItemText primary={`${item.menu}`} />
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} md={12}>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>Comments</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <ListItemText primary={`${item.comments}`} />
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item sm={2}>
                      {this.props.store.user.level === 5 && (
                        <Button
                          variant="contained"
                          color="inherit"
                          onClick={this.onDeleteClick}
                        >
                          Delete
                        </Button>
                      )}
                    </Grid>
                    <Grid item sm={4}>
                      {this.props.store.user.level === 5 && (
                        <Button
                          variant="contained"
                          color="inherit"
                          onClick={this.onEditClick}
                        >
                          Edit
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </div>
        );
      }
    );

    return (
      <div>
        <div>
          <h2>Restaurant Details</h2>
        </div>
        <Grid
          spacing={3}
          container
          direction="row"
          justify="space-evenly"
          alignItems="flex-start"
        >
          <Grid item sm={8}>
            <ReactMapGL
              {...this.state.viewport}
              width="50vw"
              height="50vh"
              // mapStyle="mapbox://styles/mapbox/streets-v11"
              onViewportChange={(viewport) => this.setState({ viewport })}
              mapboxApiAccessToken={MAPBOX_TOKEN}
              onclick={this.clickMap}
            />
          </Grid>
          <Grid
            item
            sm={2}
            container
            direction="column"
            justify="space-evenly"
            alignItems="flex-start"
          >
            <p>
              <strong>{restaurantDetails.name}</strong>
            </p>
            <p>{restaurantDetails.street}</p>
            <p>
              {restaurantDetails.city}, {restaurantDetails.state}
            </p>
          </Grid>
          <Grid
            item
            sm={2}
            container
            direction="column"
            justify="center"
            alignItems="flex-start"
          >
            {this.props.store.user.id && (
              <Button
                variant="contained"
                color="inherit"
                onClick={this.addReviewClick}
              >
                Add review!
              </Button>
            )}
          </Grid>
        </Grid>
        <div style={{ padding: 20 }}>
          <h3 className="reviewed">Reviews</h3>
          <Grid>{reviews}</Grid>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(DetailsPage);
