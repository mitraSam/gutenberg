import React, { Component } from "react";
import Loading from "./Loading";

class AsyncRoute extends Component {
  state = {
    loaded: false
  };

  component = null;

  componentDidMount() {
    const { loadingComponent } = this.props;
    loadingComponent.then(module => {
      this.component = module.default;
      this.setState({ loaded: true });
    });
  }

  render() {
    const { loaded } = this.state;
    const { props } = this.props;
    if (loaded) {
      return <this.component {...props} />;
    }
    return <Loading />;
  }
}

export default AsyncRoute;
