import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@material-ui/core';

class RestaurantItem extends Component {
  handleCLickDetails = (event) => {
    this.props.history.push('');
  };

  render() {
    const { restaurants } = this.props;

    return (
      <div>
        <Card>
          <CardActionArea>
            <CardMedia key={restaurants.id} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {restaurants.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <p>{restaurants.street}</p>
                <p>{restaurants.city}</p>
                <p>{restaurants.state}</p>
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Details
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default connect()(withRouter(RestaurantItem));
