/* eslint-disable react/sort-comp,class-methods-use-this */
import React, { Component } from "react";
import axios from "axios";

class SignUp extends Component {
  state = {
    username: "",
    password: "",
    usernameError: "",
    passwordError: ""
  };

  finishAuthentication(token) {
    const { history } = this.props;

    localStorage.removeItem("token");
    localStorage.setItem("token", token);
    history.push("/");
  }

  clearErrors() {
    this.setState({ usernameError: "", passwordError: "" });
  }

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

  signup(username, password) {
    return this.doCreation({ username, passwordHash: password });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { password, username, usernameError, passwordError } = this.state;
    return (
      <main className="signup-page">
        <form className="signup-form id-font" onSubmit={this.onSubmitCreate}>
          <h2 className="subtitle signup-form__title">Sign up</h2>
          <label className="signup-form__label" htmlFor="username">
            Username
            <input
              type="text"
              placeholder="username"
              name="username"
              className="signup-form__input"
              value={username}
              onChange={this.handleChange}
            />
            <span className="signup-form__error">{usernameError}</span>
          </label>
          <label className="signup-form__label" htmlFor="password">
            password
            <input
              className="signup-form__input"
              type="password"
              placeholder="password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
            <span className="signup-form__error">{passwordError}</span>
          </label>
          <button className="signup-form__submit id-font" type="submit">
            Sign up
          </button>
        </form>
      </main>
    );
  }
}

export default SignUp;
