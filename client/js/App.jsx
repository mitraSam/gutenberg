/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";
import ForFor from "./ForFor";
import AsyncRoute from "./AsyncRoute";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <Switch>
            <Route
              exact
              path="/"
              component={props => (
                <AsyncRoute
                  props={props}
                  loadingComponent={import("../containers/LandingContainer")}
                />
              )}
            />
            <Route
              exact
              path="/book/:title"
              component={props => (
                <AsyncRoute
                  props={props}
                  loadingComponent={import("./BookDetails")}
                />
              )}
            />
            <Route
              path="/book/:title/read/:chapter"
              component={props => (
                <AsyncRoute
                  props={props}
                  loadingComponent={import("./BookContent")}
                />
              )}
            />
            <Route
              path="/book/:title/read"
              component={props => (
                <AsyncRoute
                  props={props}
                  loadingComponent={import("./BookContent")}
                />
              )}
            />
            <Route
              path="/search/:searchTerm"
              component={props => (
                <AsyncRoute
                  props={props}
                  loadingComponent={import("../containers/SearchContainer")}
                />
              )}
            />
            <Route
              exact
              path="/signin"
              component={props => (
                <AsyncRoute
                  props={props}
                  loadingComponent={import("./SignIn")}
                />
              )}
            />
            <Route
              exact
              path="/signup"
              component={props => (
                <AsyncRoute
                  props={props}
                  loadingComponent={import("./SignUp")}
                />
              )}
            />
            <Route
              exact
              path="/user"
              component={props => (
                <AsyncRoute props={props} loadingComponent={import("./User")} />
              )}
            />

            <Route component={ForFor} />
          </Switch>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
