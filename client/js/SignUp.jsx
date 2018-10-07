/* eslint-disable react/sort-comp,class-methods-use-this */
import React, { Component } from "react";
import axios from "axios";

class SignUp extends Component {
  state = {
    loginError: "",
    username: "",
    passwordHash: ""
  };

  finishAuthentication(token) {
    localStorage.setItem("token", token);
  }

  onLoginSubmit = event => {
    event.preventDefault();
    const { username, passwordHash } = this.state;

    if (username && passwordHash) {
      this.login(username, passwordHash)
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

  onLoginSubmit = event => {
    event.preventDefault();
    const { username, passwordHash } = this.state;

    if (username && passwordHash) {
      this.login(username, passwordHash)
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

  createOne = event => {
    event.preventDefault();
    const { username, passwordHash } = this.state;

    if (username && passwordHash) {
      this.doCreation({ username, passwordHash });
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

  doCreation(values) {
    console.log(values);
    return axios({
      method: "post",
      url: "http://localhost:3000/user",
      data: values,
      config: {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    })
      .then(response =>
        // handle success

        console.log(response)
      )
      .catch(e => {
        // handle error
        console.log(e.response.statusText);
      });
  }

  login(username, passwordHash) {
    return this.doAuthentication({ username, passwordHash });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { passwordHash, username, loginError } = this.state;
    return (
      <div>
        {loginError && <h1>{loginError}</h1>}
        <form onSubmit={this.createOne}>
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
          <label htmlFor="passwordHash">
            passwordHash
            <input
              type="passwordHash"
              placeholder="Enter your passwordHash"
              name="passwordHash"
              value={passwordHash}
              onChange={this.handleChange}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default SignUp;
