import React from 'react';
import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {createHttpLink} from 'apollo-link-http';
import {ApolloProvider} from '@apollo/react-hooks';
import {StatusBar} from 'react-native';
import Navigator from './src/Navigator';

const client = new ApolloClient({
  link: createHttpLink({uri: 'http://api.doeatrecord.com/graphql'}),
  // link: createHttpLink({uri: 'http://localhost:4000/graphql'}),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'network-only',
    },
    query: {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'network-only',
    },
  },
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <StatusBar barStyle='dark-content' backgroundColor='transparent'/>
      <Navigator/>
    </ApolloProvider>
  );
}
