/* eslint-disable react/prefer-stateless-function */
import React from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";
import ForFor from "./ForFor";
import AsyncRoute from "./AsyncRoute";

const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <Switch>
        <Route
          exact
          path="/add"
          component={props => (
            <AsyncRoute props={props} loadingComponent={import("./BookForm")} />
          )}
        />
        <Route
          exact
          path="/"
          component={props => (
            <AsyncRoute
              props={props}
              path="landing"
              loadingComponent={import("../containers/LandingContainer")}
            />
          )}
        />
        <Route
          exact
          path="/about"
          component={props => (
            <AsyncRoute
              path="about"
              props={props}
              loadingComponent={import("./About")}
            />
          )}
        />
        <Route
          exact
          path="/book/:title"
          component={props => (
            <AsyncRoute
              props={props}
              path="details"
              loadingComponent={import("./BookDetails")}
            />
          )}
        />
        <Route
          path="/book/:title/read/:chapter/:page"
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
            <AsyncRoute props={props} loadingComponent={import("./Search")} />
          )}
        />
        <Route
          path="/author/:author"
          component={props => (
            <AsyncRoute props={props} loadingComponent={import("./Author")} />
          )}
        />
        <Route
          exact
          path="/signin"
          component={props => (
            <AsyncRoute props={props} loadingComponent={import("./SignIn")} />
          )}
        />
        <Route
          exact
          path="/signup"
          component={props => (
            <AsyncRoute props={props} loadingComponent={import("./SignUp")} />
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

export default App;
