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
import {AuthContext} from './context';
import {Users} from './users';
import {theme} from './ThemeColor';
import {SignIn as AWS_SignIn} from './aws-functions';

export default function SignIn({navigation}) {
  const [data, setData] = React.useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });
  const {signIn} = React.useContext(AuthContext);
  const textInputChange = value => {
    if (value.trim().length >= 4) {
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
  const passwordView = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = val => {
    if (val.trim().length >= 4) {
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

  const handleLogin = async (user, pass) => {
    const foundUser = Users.filter(item => {
      return user === item.username && pass === item.password;
    });
    console.log(foundUser);
    if (data.username.length === 0 || data.password.length === 0) {
      Alert.alert('Wrong Input!', 'Username or Password field cannot be empty.');
      return;
    }
    // if (foundUser.length === 0) {
    //   Alert.alert('Invalid User!', 'Username or Password is incorrect!');
    //   return;
    // }
    const authenticated_user = await AWS_SignIn('+91' + data.username, data.password);
    if (authenticated_user.Error) {
      Alert.alert(authenticated_user.Error.name, authenticated_user.Error.message);
      return;
    }
    signIn({
      userId: authenticated_user.attributes.sub,
      token: authenticated_user.signInUserSession.accessToken.jwtToken,
    });
  };
  return (
    <View style={styles2.container}>
      <StatusBar backgroundColor={theme.light} barStyle="light-content" />
      <View style={styles2.header}>
        <Text style={styles2.text_header}>Welcome!</Text>
      </View>
      <Animatable.View style={styles2.footer} animation="fadeInUpBig">
        <Text style={styles2.text_footer}>Username</Text>
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
            <Text style={styles2.errorMsg}>Username must be 4 characters long.</Text>
          </Animatable.View>
        )}
        <Text style={[styles2.text_footer, {marginTop: 35}]}>Password</Text>
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
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text
            style={{
              color: theme.primary,
              fontSize: 18,
              fontWeight: 'bold',
              marginTop: 20,
            }}
          >
            Forgot Password
          </Text>
        </TouchableOpacity>
        <View style={styles2.button}>
          <LinearGradient colors={[theme.primary, theme.light]} style={styles2.signIn}>
            <Text
              style={[styles2.textSign, {color: theme.textLight}]}
              onPress={() => handleLogin(data.username, data.password)}
            >
              Sign In
            </Text>
          </LinearGradient>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUpScreen')}
            style={[
              styles2.signIn,
              {
                borderColor: theme.primary,
                borderWidth: 1,
                marginTop: 15,
              },
            ]}
          >
            <Text style={[styles2.textSign, {color: theme.primary}]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
}

const {height} = Dimensions.get('screen');
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
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
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
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
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
    fontWeight: 'bold',
  },
  errorMsg: {
    color: 'red',
    fontSize: 14,
  },
});
