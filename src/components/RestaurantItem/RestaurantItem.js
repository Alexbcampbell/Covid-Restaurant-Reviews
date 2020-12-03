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
import ReactMapGL, { Marker } from 'react-map-gl';
const markerIcon = require('../../components/MapBoxComponent/mapbox-icon.png');

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const baseMap = {
  type: 'raster',
  tiles: ['http://tile.stamen.com/toner/{z}/{x}/{y}.png'],
  tileSize: 256,
  attribution:
    'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
};

class RestaurantItem extends Component {
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
  handleCLickDetails = (event) => {
    this.props.history.push(`/details/${this.props.restaurants.id}`);
  };

  render() {
    const { restaurants } = this.props;

    const newMarker = this.props.store.restaurantReducer.map(
      (restaurant, index) => (
        <Marker
          key={index}
          longitude={restaurant.longitude}
          latitude={restaurant.latitude}
        >
          <img src={markerIcon} />
        </Marker>
      )
    );

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
              // mapStyle="mapbox://styles/mapbox/streets-v11"
              onViewportChange={(viewport) => this.setState({ viewport })}
              mapboxApiAccessToken={MAPBOX_TOKEN}
              onclick={this.clickMap}
            >
              <newMarker />
            </ReactMapGL>

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
