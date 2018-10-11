/* eslint-disable react/sort-comp,class-methods-use-this */
import React, { Component } from "react";
import axios from "axios";

class SignIn extends Component {
  state = {
    username: "",
    password: "",
    usernameError: "",
    passwordError: "",
    signInError: ""
  };

  clearErrors() {
    this.setState({ usernameError: "", passwordError: "" });
  }

  finishAuthentication(token) {
    const { history } = this.props;

    localStorage.removeItem("token");
    localStorage.setItem("token", token);
    history.push("/");
  }

  onSubmitLogin = event => {
    event.preventDefault();
    const { username, password } = this.state;

    this.clearErrors();
    if (username && password) {
      this.login(username, password)
        .then(response =>
          // handle success
          this.finishAuthentication(response.data)
        )
        .catch(e => {
          // handle error
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

  login(username, password) {
    return this.doAuthentication({ username, password });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      password,
      username,
      usernameError,
      passwordError,
      signInError
    } = this.state;
    return (
      <main className="signup-page">
        <form className="signup-form id-font" onSubmit={this.onSubmitLogin}>
          <span className="signup-form__error">{signInError}</span>
          <h2 className="subtitle signup-form__title">Sign in</h2>
          <label className="signup-form__label " htmlFor="username">
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
            Sign in
          </button>
          <h2 className="subtitle">no account ?</h2>
          <a className="main-font" href="/signup">
            Sign up
          </a>
        </form>
      </main>
    );
  }
}

export default SignIn;
