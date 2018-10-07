/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";
import LandingContainer from "../containers/LandingContainer";
import Details from "./Details";
import ForFor from "./ForFor";
import BookContent from "./BookContent";
import Login from "./Login";
import SearchContainer from "../containers/SearchContainer";
import SignUp from "./SignUp";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <Switch>
            <Route
              exact
              path="/"
              component={props => <LandingContainer {...props} />}
            />
            <Route
              exact
              path="/book/:title"
              component={props => <Details {...props} />}
            />
            <Route
              path="/book/:title/read/:chapter"
              component={props => <BookContent {...props} />}
            />
            <Route
              path="/book/:title/read"
              component={props => <BookContent {...props} />}
            />
            <Route
              path="/search/:searchTerm"
              component={props => <SearchContainer {...props} />}
            />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />

            <Route component={ForFor} />
          </Switch>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
