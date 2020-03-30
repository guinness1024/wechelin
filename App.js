import React from 'react';
import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {createHttpLink} from 'apollo-link-http';
import {ApolloProvider} from '@apollo/react-hooks';
import Navigator from './src/Navigator';
import {StatusBar} from 'react-native';

const client = new ApolloClient({
  link: createHttpLink({uri: 'http://api.doeatrecord.com/graphql'}),
  // link: createHttpLink({uri: 'http://192.168.1.107:4000/graphql'}),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
    },
    query: {
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
