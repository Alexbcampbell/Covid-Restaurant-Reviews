import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../../Pages/AboutPage/AboutPage';
import UserPage from '../../Pages/UserPage/UserPage';
import InfoPage from '../../Pages/InfoPage/InfoPage';
import LandingPage from '../../Pages/LandingPage/LandingPage';
import LoginPage from '../../Pages/LoginPage/LoginPage';
import RegisterPage from '../../Pages/RegisterPage/RegisterPage';
import NewRestaurantForm from '../NewRestaurantForm/NewRestaurantForm';
import DetailsPage from '../../Pages/DetailsPage/DetailsPage';

import './App.css';
import HomePage from '../../Pages/HomePage/HomePage';
import RestaurantList from '../../Pages/RestaurantList/RestaurantList';
import ReviewPage from '../../Pages/ReviewPage/ReviewPage';
import EditPage from '../../Pages/EditPage/EditPage';

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/homepage" />

            {/* Visiting localhost:3000/about will show the about page. */}
            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/about"
              component={AboutPage}
            />

            <Route
              // shows HomePage at all times (logged in or not)
              exact
              path="/homepage"
              component={HomePage}
            />

            <Route
              // shows RestaurantList at all times (logged in or not)
              exact
              path="/restaurantlist"
              component={RestaurantList}
            />

            <Route
              // shows DetailsPage at all times (logged in or not)
              exact
              path="/details/:id"
              component={DetailsPage}
            />

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/user"
              component={UserPage}
            />

            <ProtectedRoute
              // logged in shows InfoPage else shows LoginPage
              exact
              path="/info"
              component={InfoPage}
            />

            <ProtectedRoute
              // logged in shows NewRestaurantForm else shows LoginPage
              exact
              path="/add"
              component={NewRestaurantForm}
            />

            <ProtectedRoute
              // logged in shows NewRestaurantForm else shows LoginPage
              exact
              path="/review/:id"
              component={ReviewPage}
            />

            <ProtectedRoute
              // logged in shows NewRestaurantForm else shows LoginPage
              exact
              path="/edit/:id/:reviewId"
              component={EditPage}
            />

            {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LoginPage at /login
              exact
              path="/login"
              component={LoginPage}
              authRedirect="/user"
            />
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows RegisterPage at "/registration"
              exact
              path="/registration"
              component={RegisterPage}
              authRedirect="/user"
            />
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LandingPage at "/home"
              exact
              path="/homepage"
              component={HomePage}
              authRedirect="/user"
            />

            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default connect()(App);
