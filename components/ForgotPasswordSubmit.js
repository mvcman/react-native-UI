import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
  TextInput,
  StatusBar,
  Alert,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import { theme } from './ThemeColor';
import { AuthContext } from './context';
import { ForgotPasswordSubmit } from './aws-functions';

export default function VerifyOTP({ navigation }) {
  const [data, setData] = React.useState({
    otp: '',
    password: '',
    cpassword: '',
    check_textInputChange: false,
    secureTextEntry: true,
    confirmSecureTextEntry: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
    isValidUser: true,
  });
  const { user } = React.useContext(AuthContext);

  const textInputChange = value => {
    if (value.trim().length === 6) {
      setData({
        ...data,
        otp: value,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        otp: value,
        check_textInputChange: false,
      });
    }
  };

  const passwordView = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const cpasswordView = () => {
    setData({
      ...data,
      confirmSecureTextEntry: !data.confirmSecureTextEntry,
    });
  };

  const handlePasswordChange = value => {
    if (value.trim().length >= 8) {
      setData({
        ...data,
        password: value,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: value,
        isValidPassword: false,
      });
    }
  };

  const handleCPasswordChange = value => {
    if (value.trim().length >= 8) {
      setData({
        ...data,
        cpassword: value,
        isValidConfirmPassword: true,
      });
    } else {
      setData({
        ...data,
        cpassword: value,
        isValidConfirmPassword: false,
      });
    }
  };
  const VerifyOTP = async navigation => {
    if (data.otp.length != 6) {
      Alert.alert('Error', 'Please check your OTP!');
      return;
    }
    const signup = await ForgotPasswordSubmit(user.userId, data.otp, data.password);
    if (signup.Error) {
      Alert.alert('Error, Please enter valid OTP!');
      return;
    }
    Alert.alert('Success!');
    navigation.navigate('SignInScreen');
  };
  return (
    <View style={styles2.container}>
      <StatusBar backgroundColor={theme.primary} barStyle="light-content" />
      <View style={styles2.header}>
        <Text style={styles2.text_header}>Change Password</Text>
      </View>
      <ScrollView>
        <Animatable.View style={styles2.footer} animation="fadeInUpBig">
          <Text style={styles2.text_footer}>OTP</Text>
          <View style={styles2.action}>
            <Feather name="user-check" color="#05375a" size={20} />
            <TextInput
              placeholder="Your OTP"
              style={styles2.textInput}
              autoCapitalize="none"
              onChangeText={text => textInputChange(text)}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          <Text style={[styles2.text_footer, { marginTop: 35 }]}>New Password</Text>
          <View style={styles2.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Your New Password"
              secureTextEntry={data.secureTextEntry}
              style={styles2.textInput}
              autoCapitalize="none"
              onChangeText={text => handlePasswordChange(text)}
            />
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} onPress={() => passwordView()} />
            ) : (
              <Feather name="eye" color="grey" size={20} onPress={() => passwordView()} />
            )}
          </View>
          {data.isValidPassword ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles2.errorMsg}>Password must be 8 characters long.</Text>
            </Animatable.View>
          )}
          <Text style={[styles2.text_footer, { marginTop: 35 }]}>Confirm New Password</Text>
          <View style={styles2.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Confirm New Password"
              secureTextEntry={data.confirmSecureTextEntry}
              style={styles2.textInput}
              autoCapitalize="none"
              onChangeText={text => handleCPasswordChange(text)}
            />
            {data.confirmSecureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} onPress={() => cpasswordView()} />
            ) : (
              <Feather name="eye" color="grey" size={20} onPress={() => cpasswordView()} />
            )}
          </View>
          {data.isValidConfirmPassword ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles2.errorMsg}>Confirm Password must be 8 characters long.</Text>
            </Animatable.View>
          )}
          <View style={styles2.button}>
            <LinearGradient colors={[theme.primary, theme.light]} style={styles2.signIn}>
              <TouchableOpacity onPress={() => VerifyOTP(navigation)}>
                <Text style={[styles2.textSign, { color: theme.textLight }]}>Verify</Text>
              </TouchableOpacity>
            </LinearGradient>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[
                styles2.signIn,
                {
                  borderColor: theme.primary,
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}
            >
              <Text style={[styles2.textSign, { color: theme.primary }]}>Back</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles2.text_middle}>Resend OTP</Text>
          </TouchableOpacity>
        </Animatable.View>
      </ScrollView>
    </View>
  );
}

const { height } = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.primary,
  },
  header: {
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
    height: 200,
  },
  footer: {
    flex: 3,
    backgroundColor: theme.textLight,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: theme.textLight,
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  text_middle: {
    color: theme.primary,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  action: {
    flexDirection: 'row',
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 30,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorMsg: {
    color: 'red',
    fontSize: 14,
  },
});
