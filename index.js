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
import PushNotification from 'react-native-push-notification';
// import SendJobNotification from './components/SendJobNotification';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';

// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
  },
  requestPermissions: Platform.OS === 'android',
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
      {/* <SendJobNotification /> */}
    </ApolloProvider>
  );
};
// AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent(appName, () => appToRender);
