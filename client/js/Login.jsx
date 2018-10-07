/* eslint-disable react/sort-comp,class-methods-use-this */
import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  state = {
    loginError: "",
    username: "",
    password: ""
  };

  finishAuthentication(token) {
    console.log(token);
    localStorage.setItem("token", token);
  }

  onLoginSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;

    if (username && password) {
      this.login(username, password)
        .then(result => {
          if (!result.data) {
            this.setState({ loginError: result.message });
            return;
          }
          this.finishAuthentication(result.data);
        })
        .catch(e => console.log(e));
    }
  };

  doAuthentication(values) {
    return axios({
      method: "post",
      url: "http://localhost:3000/signin",
      data: values,
      config: {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    })
      .then(
        response =>
          // handle success

          response
      )
      .catch(e => {
        // handle error
        console.log(e.response.statusText);
      });
  }

  login(username, password) {
    return this.doAuthentication({ username, password });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { password, username, loginError } = this.state;
    return (
      <div>
        {loginError && <h1>{loginError}</h1>}
        <form onSubmit={this.onLoginSubmit}>
          <label htmlFor="username">
            Username
            <input
              type="text"
              placeholder="Enter your username or email"
              name="username"
              value={username}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Login;
