/* eslint-disable class-methods-use-this */
import React, { Component } from "react";
import axios from "axios";

const WithAuth = (FormComponent, label) =>
  class extends Component {
    state = {
      username: "",
      password: "",
      usernameError: "",
      passwordError: ""
    };

    handleChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };

    onSubmitAuth = () => {
      const { username, password } = this.state;

      this.clearErrors();
      if (username && password) {
        this.submitData({ username, password })
          .then(response =>
            // handle success
            this.finishAuthentication(response.data)
          )
          .catch(e => {
            // handle error
            this.setState({ usernameError: e.response.data });
            const status = e.response.statusText;
            if (status === "Invalid username")
              return this.setState({ usernameError: status });
            if (status === "Invalid password")
              return this.setState({ passwordError: status });
            return this.setState({ signInError: status });
          });
      }
      if (!username) {
        this.setState({ usernameError: "username required" });
      }
      if (!password) {
        this.setState({ passwordError: "password required" });
      }
    };

    submitData(values) {
      const api = process.env.API_URL;
      let data;
      let param;
      if (label === "Sign up") {
        data = { username: values.username, passwordHash: values.password };
        param = "user";
      } else {
        data = values;
        param = "signin";
      }
      return axios({
        method: "post",
        url: `${api}/${param}`,
        data,
        config: {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      });
    }

    finishAuthentication(token) {
      const { history } = this.props;

      localStorage.removeItem("token");
      localStorage.setItem("token", token);
      history.push("/");
    }

    clearErrors() {
      this.setState({ usernameError: "", passwordError: "" });
    }

    render() {
      const { password, username, usernameError, passwordError } = this.state;

      return (
        <FormComponent
          label={label}
          password={password}
          username={username}
          doAuthentication={this.doAuthentication}
          usernameError={usernameError}
          passwordError={passwordError}
          handleChange={this.handleChange}
          onSubmitAuth={this.onSubmitAuth}
        />
      );
    }
  };

export default WithAuth;
