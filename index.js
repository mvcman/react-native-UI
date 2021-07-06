/**
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import Amplify from 'aws-amplify';
import config from './aws-config.json';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage.notification);
});

Amplify.configure({
  Auth: {
    mandatorySignId: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
});
const wsLink = new WebSocketLink({
  uri: 'wss://team-c.hasura.app/v1/graphql',
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': 'PcEURINYV1b1OVT8z0l0jsAvMb8Wkt67rJHtTPt8oKcTaLFeLwPAKPIJfe0S7V6g',
      },
    },
  },
});
const client = new ApolloClient({
  link: wsLink,
  cache: new InMemoryCache(),
});

const appToRender = () => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};
AppRegistry.registerComponent(appName, () => appToRender);
