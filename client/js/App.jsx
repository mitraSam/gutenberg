/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";
import LandingContainer from "../containers/LandingContainer";
import BookDetails from "./BookDetails";
import ForFor from "./ForFor";
import BookContent from "./BookContent";
import SignIn from "./SignIn";
import SearchContainer from "../containers/SearchContainer";
import SignUp from "./SignUp";
import User from "./User";

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
              component={props => <BookDetails {...props} />}
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
            <Route
              exact
              path="/signin"
              component={props => <SignIn {...props} />}
            />
            <Route
              exact
              path="/signup"
              component={props => <SignUp {...props} />}
            />
            <Route exact path="/user" component={User} />

            <Route component={ForFor} />
          </Switch>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
