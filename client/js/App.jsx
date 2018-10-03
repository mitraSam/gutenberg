/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";
import LandingContainer from "../containers/LandingContainer";
import Details from "./Details";
import ForFor from "./ForFor";
import BookContent from "./BookContent";
import Search from "./Search";

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
              component={props => <Search {...props} />}
            />

            <Route component={ForFor} />
          </Switch>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
