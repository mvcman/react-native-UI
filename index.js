/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import Amplify from 'aws-amplify';
import config from './aws-config.json';
import PushNotification from 'react-native-push-notification';

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

AppRegistry.registerComponent(appName, () => App);
