import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../components/SplashScreen';
import LoginScreen from '../components/SignIn';
import SignUpScreen from '../components/SignUp';
import VerifyOTP from '../components/VerifyOTP';
import ForgotPassword from '../components/ForgotPassword';
import ForgotPasswordSubmit from '../components/ForgotPasswordSubmit';

const RootStack = createStackNavigator();

export default function Main() {
  return (
    <RootStack.Navigator headerMode="none">
      <RootStack.Screen name="SplashScreen" component={SplashScreen} />
      <RootStack.Screen name="SignInScreen" component={LoginScreen} />
      <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
      <RootStack.Screen name="VerifyOTP" component={VerifyOTP} />
      <RootStack.Screen name="ForgotPassword" component={ForgotPassword} />
      <RootStack.Screen name="ForgotPasswordSubmit" component={ForgotPasswordSubmit} />
    </RootStack.Navigator>
  );
}
