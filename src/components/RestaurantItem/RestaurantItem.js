import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Button,
  Typography,
} from '@material-ui/core';
import ReactMapGL from 'react-map-gl';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

class RestaurantItem extends Component {
  state = {
    viewport: {
      latitude: 39.099724,
      longitude: -94.578331,
      zoom: 12,
      bearing: 0,
      pitch: 0,
    },
  };
  handleCLickDetails = (event) => {
    this.props.history.push('/details');
  };

  render() {
    const { restaurants } = this.props;

    return (
      <div>
        <Card>
          <CardActionArea
            key={restaurants.id}
            onClick={this.handleCLickDetails}
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

            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {restaurants.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="ul">
                <li className="cardList">{restaurants.street}</li>
                <li className="cardList">
                  {restaurants.city}, {restaurants.state}
                </li>
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={this.handleCLickDetails}
            >
              Details
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default connect()(withRouter(RestaurantItem));
