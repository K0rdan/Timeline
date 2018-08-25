import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient, InMemoryCache, ApolloLink } from 'apollo-boost';
import { withClientState } from 'apollo-link-state';

import { Defaults, Resolvers } from 'gql/index';
import { App } from 'components/index';

const cache = new InMemoryCache();

const stateLink = withClientState({
  cache,
  defaults: Defaults,
  resolvers: Resolvers,
});

const link = ApolloLink.from([stateLink]);

const client = new ApolloClient({
  link,
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
