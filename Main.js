import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  Platform,
  Dimensions,
  TextInput,
  StatusBar,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import {valid} from 'joi';
import {valueToNode} from '@babel/types';
import {AuthContext} from './components/context';
import AsyncStorage from '@react-native-community/async-storage';

const RootStack = createStackNavigator();

function SplashScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duration={1500}
          source={require('./assets/logo.png')}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={styles.title}>Stay Connected with everyone...</Text>
        <Text style={styles.text}>Sign In with account</Text>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignInScreen');
            }}>
            <LinearGradient
              colors={['#08d4c4', '#01ab9d']}
              style={styles.signIn}>
              <Text style={styles.textSign}>Get Started</Text>
              <MaterialIcons name="navigate-next" color="#fff" size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
}

function LoginScreen({navigation}) {
  const [data, setData] = React.useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
  });
  const {signIn} = React.useContext(AuthContext);
  const textInputChange = value => {
    if (value.length !== 0) {
      setData({
        ...data,
        email: value,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        check_textInputChange: false,
      });
    }
  };

  const handlePasswordChange = value => {
    setData({
      ...data,
      password: value,
    });
  };
  const passwordView = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleLogin = (user, pass) => {
    signIn(user, pass);
  };
  return (
    <View style={styles2.container}>
      <StatusBar backgroundColor="#009487" barStyle="light-content" />
      <View style={styles2.header}>
        <Text style={styles2.text_header}>Welcome!</Text>
      </View>
      <Animatable.View style={styles2.footer} animation="fadeInUpBig">
        <Text style={styles2.text_footer}>Email</Text>
        <View style={styles2.action}>
          <FontAwesome name="user-o" color="#05375a" size={20} />
          <TextInput
            placeholder="Your email"
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
            <Feather
              name="eye-off"
              color="grey"
              size={20}
              onPress={() => passwordView()}
            />
          ) : (
            <Feather
              name="eye"
              color="grey"
              size={20}
              onPress={() => passwordView()}
            />
          )}
        </View>
        <View style={styles2.button}>
          <LinearGradient
            colors={['#08d4c4', '#01ab9d']}
            style={styles2.signIn}>
            <Text
              style={[styles2.textSign, {color: '#fff'}]}
              onPress={() => handleLogin(data.email, data.password)}>
              Sign In
            </Text>
          </LinearGradient>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUpScreen')}
            style={[
              styles2.signIn,
              {
                borderColor: '#009387',
                borderWidth: 1,
                marginTop: 15,
              },
            ]}>
            <Text style={[styles2.textSign, {color: '#009387'}]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
}

function SignUpScreen({navigation}) {
  const [data, setData] = React.useState({
    email: '',
    password: '',
    cpassword: '',
    check_textInputChange: false,
    secureTextEntry: true,
    confirmSecureTextEntry: true,
  });

  const textInputChange = value => {
    if (value.length !== 0) {
      setData({
        ...data,
        email: valueToNode,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        check_textInputChange: false,
      });
    }
  };

  const handlePasswordChange = value => {
    setData({
      ...data,
      password: value,
    });
  };

  const handleCPasswordChange = value => {
    setData({
      ...data,
      cpassword: value,
    });
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

  return (
    <View style={styles2.container}>
      <StatusBar backgroundColor="#009487" barStyle="light-content" />
      <View style={styles2.header}>
        <Text style={styles2.text_header}>Sign up here!</Text>
      </View>
      <Animatable.View style={styles2.footer} animation="fadeInUpBig">
        <Text style={styles2.text_footer}>Email</Text>
        <View style={styles2.action}>
          <FontAwesome name="user-o" color="#05375a" size={20} />
          <TextInput
            placeholder="Your email"
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
            <Feather
              name="eye-off"
              color="grey"
              size={20}
              onPress={() => passwordView()}
            />
          ) : (
            <Feather
              name="eye"
              color="grey"
              size={20}
              onPress={() => passwordView()}
            />
          )}
        </View>
        <Text style={[styles2.text_footer, {marginTop: 35}]}>
          Confirm Password
        </Text>
        <View style={styles2.action}>
          <Feather name="lock" color="#05375a" size={20} />
          <TextInput
            placeholder="confirm Password"
            secureTextEntry={data.confirmSecureTextEntry}
            style={styles2.textInput}
            autoCapitalize="none"
            onChangeText={text => handleCPasswordChange(text)}
          />
          {data.confirmSecureTextEntry ? (
            <Feather
              name="eye-off"
              color="grey"
              size={20}
              onPress={() => cpasswordView()}
            />
          ) : (
            <Feather
              name="eye"
              color="grey"
              size={20}
              onPress={() => cpasswordView()}
            />
          )}
        </View>
        <View style={styles2.button}>
          <LinearGradient
            colors={['#08d4c4', '#01ab9d']}
            style={styles2.signIn}>
            <Text style={[styles2.textSign, {color: '#fff'}]}>Sign Up</Text>
          </LinearGradient>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignInScreen')}
            style={[
              styles2.signIn,
              {
                borderColor: '#009387',
                borderWidth: 1,
                marginTop: 15,
              },
            ]}>
            <Text style={[styles2.textSign, {color: '#009387'}]}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
}
export default function Main() {
  return (
    <RootStack.Navigator headerMode="none">
      <RootStack.Screen name="SplashScreen" component={SplashScreen} />
      <RootStack.Screen name="SignInScreen" component={LoginScreen} />
      <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
    </RootStack.Navigator>
  );
}

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
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
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    color: 'grey',
    marginTop: 5,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
});
