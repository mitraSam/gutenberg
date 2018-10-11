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

    onSubmitCreate = event => {
      event.preventDefault();
      const { username, password } = this.state;

      this.clearErrors();
      if (username && password) {
        this.signup(username, password)
          .then(response =>
            // handle success
            this.finishAuthentication(response.data)
          )
          .catch(e => {
            // handle error
            this.setState({ usernameError: e.response.data });
          });
      }
      if (!username) {
        this.setState({ usernameError: "username required" });
      }
      if (!password) {
        this.setState({ passwordError: "password required" });
      }
    };

    signup(username, password) {
      return this.doCreation({ username, passwordHash: password });
    }

    doCreation(values) {
      const api = process.env.API_URL;

      return axios({
        method: "post",
        url: `${api}/user`,
        data: values,
        config: {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      });
    }

    doAuthentication(values) {
      const api = process.env.API_URL;

      return axios({
        method: "post",
        url: `${api}/signin`,
        data: values,
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
          usernameError={usernameError}
          passwordError={passwordError}
          handleChange={this.handleChange}
          onSubmitCreate={this.onSubmitCreate}
        />
      );
    }
  };

export default WithAuth;
