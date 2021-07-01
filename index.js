/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Amplify from 'aws-amplify';
import config from './aws-config.json';
// import PushNotification from 'react-native-push-notification';

// Must be outside of any component LifeCycle (such as `componentDidMount`).
// PushNotification.configure({
//   // (optional) Called when Token is generated (iOS and Android)
//   onRegister: function (token) {
//     console.log('TOKEN:', token);
//   },

//   // (required) Called when a remote is received or opened, or local notification is opened
//   onNotification: function (notification) {
//     console.log('NOTIFICATION:', notification);

//     // process the notification

//     // (required) Called when a remote is received or opened, or local notification is opened
//     // notification.finish(PushNotificationIOS.FetchResult.NoData);
//   },
//   // IOS ONLY (optional): default: all - Permissions to register.
//   permissions: {
//     alert: true,
//     badge: true,
//     sound: true,
//   },
//   popInitialNotification: true,
//   requestPermissions: Platform.OS === 'android',
// });
Amplify.configure({
  Auth: {
    mandatorySignId: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
});

AppRegistry.registerComponent(appName, () => App);
