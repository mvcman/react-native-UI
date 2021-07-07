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
import { ButtonGroup } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import { theme } from './ThemeColor';
import { SignUp as AWS_SignUp } from './aws-functions';
import { createUser } from './db-functions';
import { AuthContext } from './context';

export default function SignUp({ navigation }) {
  const [data, setData] = React.useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    cpassword: '',
    check_textInputChange: false,
    secureTextEntry: true,
    confirmSecureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
    index: 1,
  });

  const userType = ['Employer', 'Applicant'];

  const { setUserId, setUserName } = React.useContext(AuthContext);

  const textInputChange = value => {
    if (value.trim().length === 10) {
      setData({
        ...data,
        username: value,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  //   const handlePasswordChange = value => {
  //     setData({
  //       ...data,
  //       password: value,
  //     });
  //   };

  //   const handleCPasswordChange = value => {
  //     setData({
  //       ...data,
  //       cpassword: value,
  //     });
  //   };
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

  const handleValidUser = val => {
    if (val.trim().length === 10) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const handleFirstName = val => {
    if (val === '') {
      Alert.alert('Wrong Input!', 'First Name field cannot be empty.');
      return;
    }
    setData({
      ...data,
      firstName: val,
    });
  };

  const handleLastName = val => {
    if (val === '') {
      Alert.alert('Wrong Input!', 'Last Name field cannot be empty.');
      return;
    }
    setData({
      ...data,
      lastName: val,
    });
  };

  const handleSignUp = async navigation => {
    console.log(data);
    if (data.username.length === 0 || data.password.length === 0 || data.cpassword.length === 0) {
      Alert.alert('Wrong Input!', 'Username or Password field cannot be empty');
      return;
    }
    if (data.password !== data.cpassword) {
      Alert.alert('Password Mismatch!', 'Password and Confirm Password should be same');
      return;
    }
    const user = await AWS_SignUp('+91' + data.username, data.password);
    await setUserName(data.username);
    console.log('gettting aws cognito user ', user);
    if (user.Error) {
      Alert.alert(user.Error.code, user.Error.message);
      return;
    }
    console.log('userId', user.userSub);
    await setUserId(user.userSub);
    const createuser = await createUser({
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      password: data.password,
      userId: user.userSub,
      role: userType[data.index] === 'Employer' ? 'employer' : 'applicant',
    });
    console.log('after creating user ', createuser);
    if (createuser.Error) {
      Alert.alert('Error!', create_user.Error.message);
      return;
    }
    Alert.alert('Successful!', 'User has beed created successfuly!');
    navigation.navigate('VerifyOTP');
    // signUp(foundUser);
  };
  return (
    <View style={styles2.container}>
      <StatusBar backgroundColor={theme.primary} barStyle="light-content" />
      <View style={styles2.header}>
        <Text style={styles2.text_header}>Sign up here!</Text>
      </View>
      <ScrollView>
        <Animatable.View style={styles2.footer} animation="fadeInUpBig">
          <Text style={styles2.text_footer}>First Name</Text>
          <View style={styles2.actionName}>
            <FontAwesome name="address-book-o" color="#05375a" size={20} />
            <TextInput
              placeholder="First Name"
              style={styles2.textInput}
              autoCapitalize="none"
              // onChangeText={text => textInputChange(text)}
              onEndEditing={e => handleFirstName(e.nativeEvent.text)}
            />
          </View>
          <Text style={styles2.text_footer}>Last Name</Text>
          <View style={styles2.actionName}>
            <FontAwesome name="address-book-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Last Name"
              style={styles2.textInput}
              autoCapitalize="none"
              // onChangeText={text => textInputChange(text)}
              onEndEditing={e => handleLastName(e.nativeEvent.text)}
            />
          </View>
          <Text style={styles2.text_footer}>Mobile Number</Text>
          <View style={styles2.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Enter Valid Mobile Number"
              style={styles2.textInput}
              autoCapitalize="none"
              onChangeText={text => textInputChange(text)}
              onEndEditing={e => handleValidUser(e.nativeEvent.text)}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          {data.isValidUser ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles2.errorMsg}>Mobile number must be 10 characters long.</Text>
            </Animatable.View>
          )}
          <Text style={[styles2.text_footer, { marginTop: 35 }]}>Password</Text>
          <View style={styles2.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Password"
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
          <Text style={[styles2.text_footer, { marginTop: 35 }]}>Confirm Password</Text>
          <View style={styles2.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Confirm Password"
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
          <Text style={[styles2.text_footer, { marginTop: 35 }]}>Select your role</Text>
          <View style={styles2.action}>
            <ButtonGroup
              onPress={i => setData({ ...data, index: i })}
              selectedIndex={data.index}
              buttons={userType}
              containerStyle={{ height: 40, width: '80%', borderRadius: 10, fontFamily: 'Roboto-Bold' }}
              selectedButtonStyle={{ backgroundColor: theme.primary }}
              textStyle={{ fontFamily: 'Roboto-Bold', fontSize: 16 }}
              selectedTextStyle={{ color: '#fff', fontFamily: 'Roboto-Bold', fontSize: 16 }}
            />
          </View>
          <View style={styles2.button}>
            <TouchableOpacity
              style={{ width: '100%' }}
              onPress={() => {
                handleSignUp(navigation);
              }}
            >
              <LinearGradient colors={[theme.primary, theme.light]} style={styles2.signIn}>
                <Text style={[styles2.textSign, { color: '#fff' }]}>Sign Up</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignInScreen')}
              style={[
                styles2.signIn,
                {
                  borderColor: theme.primary,
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}
            >
              <Text style={[styles2.textSign, { color: theme.primary }]}>Sign In</Text>
            </TouchableOpacity>
          </View>
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
    fontFamily: 'Roboto-Bold',
  },
  footer: {
    flex: 3,
    backgroundColor: theme.textLight,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    fontFamily: 'Roboto-Regular',
  },
  text_header: {
    color: theme.textLight,
    // fontWeight: 'bold',
    fontSize: 30,
    fontFamily: 'Opticons',
    fontFamily: 'Roboto-Bold',
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionName: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
    marginBottom: 15,
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
    fontFamily: 'Roboto-Regular',
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
    // fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
  },
  errorMsg: {
    color: 'red',
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
});
