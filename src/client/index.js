import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

import App from './App';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
      query {
        columns {
          id
          title
          position
        }
      }
    `,
  })
  .then((result) => console.log(result));

ReactDOM.render(<App />, document.getElementById('root'));
