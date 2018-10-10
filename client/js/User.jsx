/* eslint-disable consistent-return */
import React, { Component } from "react";
import axios from "axios";
import Header from "./Header";
import Preview from "./Preview";

class User extends Component {
  state = {
    user: { readBooks: [] },
    errorMessage: "",
    withUser: false
  };

  componentWillMount() {
    const token = localStorage.getItem("token");
    const api = process.env.API_URL;

    if (!token)
      return this.setState({
        errorMessage: "Looks like you are not signed in"
      });
    axios
      .get(`${api}/user/id`, {
        headers: { Authorization: `Bearer ${token}`, getuserbooks: "true" }
      })
      .then(r => this.setState({ user: r.data, withUser: true }))
      .catch(e => this.setState({ errorMessage: e.response.statusText }));
  }

  render() {
    const { user, errorMessage, withUser } = this.state;
    console.log(user);
    let ReadBooks;
    if (!user.readBooks.length) ReadBooks = () => <h2>no read books</h2>;
    else
      ReadBooks = () => (
        <div>
          {user.readBooks.map(book => (
            <Preview book={book} />
          ))}
        </div>
      );

    const { history } = this.props;
    if (user)
      return (
        <div>
          <Header onUserPage={withUser} history={history} />
          <main className="search-page main-padding">
            <h2 className="subtitle">read books:</h2>
            <ReadBooks />
            <p>{errorMessage}</p>
          </main>
        </div>
      );
  }
}

export default User;
