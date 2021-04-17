import React, { Component } from 'react';
import './app.scss';
import GraphQL from './graphql.png';

export default class App extends Component {
  state = { username: null };

  componentDidMount() {
    fetch('/api/getUsername')
      .then((res) => res.json())
      .then((user) => this.setState({ username: user.username }));
  }

  render() {
    const { username } = this.state;

    return (
      <div>
        {username ? (
          <h1>{`Hello ${username}!`}</h1>
        ) : (
          <h1>Loading.. please wait!</h1>
        )}
        <img src={GraphQL} alt="react" />
      </div>
    );
  }
}