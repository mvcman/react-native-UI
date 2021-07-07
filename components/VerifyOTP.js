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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import { theme } from './ThemeColor';
import { AuthContext } from './context';
import { ConfirmSignUp, ResendConfirmationCode } from './aws-functions';

export default function VerifyOTP({ navigation }) {
  const [data, setData] = React.useState({
    otp: '',
    check_textInputChange: false,
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

  //   const handleValidUser = value => {
  //     console.log(value);
  //     if (value.trim().length === 6) {
  //       setData({
  //         ...data,
  //         otp: value,
  //         isValidUser: true,
  //       });
  //     } else {
  //       setData({
  //         ...data,
  //         otp: value,
  //         isValidUser: false,
  //       });
  //     }
  //   };

  const VerifyOTP = async navigation => {
    console.log(user);
    if (data.otp.length != 6) {
      Alert.alert('Error', 'Please check your OTP!');
      return;
    }
    const signup = await ConfirmSignUp(user.userName, data.otp);
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
        <Text style={styles2.text_header}>Verify OTP!</Text>
      </View>
      <Animatable.View style={styles2.footer} animation="fadeInUpBig">
        <Text style={styles2.text_footer}>OTP</Text>
        <View style={styles2.action}>
          <Feather name="user-check" color="#05375a" size={20} />
          <TextInput
            placeholder="Your OTP"
            style={styles2.textInput}
            autoCapitalize="none"
            onChangeText={text => textInputChange(text)}
            // onEndEditing={e => handleValidUser(e.nativeEvent.text)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {/* {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles2.errorMsg}>OTP must be 6 characters long.</Text>
          </Animatable.View>
        )} */}
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
        <TouchableOpacity onPress={() => ResendConfirmationCode(user.userName)}>
          <Text style={styles2.text_middle}>Resend OTP</Text>
        </TouchableOpacity>
      </Animatable.View>
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
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
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
    fontFamily: 'Roboto-Bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
  },
  text_middle: {
    color: theme.primary,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
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
    fontFamily: 'Roboto-Regular',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
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
    fontFamily: 'Roboto-Bold',
  },
  errorMsg: {
    color: 'red',
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
});
