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
import { ForgotPassword as ForgotPass } from './aws-functions';

export default function ForgotPassword({ navigation }) {
  const { setUserName } = React.useContext(AuthContext);
  const [data, setData] = React.useState({
    username: '',
    check_textInputChange: false,
    isValidUser: true,
  });
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

  const forgotPassword = async () => {
    if (data.username.length === 0) {
      Alert.alert('Wrong Input!', 'Username field cannot be empty!');
      return;
    }
    await setUserName(data.username);
    await ForgotPass(data.username);
    Alert.alert('Successful!', 'OTP sent to your respective mobile number please verify your account!');
    navigation.navigate('ForgotPasswordSubmit');
  };
  return (
    <View style={styles2.container}>
      <StatusBar backgroundColor={theme.primary} barStyle="light-content" />
      <View style={styles2.header}>
        <Text style={styles2.text_header}>Forgot Password!</Text>
      </View>
      <Animatable.View style={styles2.footer} animation="fadeInUpBig">
        <Text style={styles2.text_footer}>Mobile Number</Text>
        <View style={styles2.action}>
          <FontAwesome name="user-o" color="#05375a" size={20} />
          <TextInput
            placeholder="Enter your mobile number"
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
            <Text style={styles2.errorMsg}>Username must be 10 characters long.</Text>
          </Animatable.View>
        )}
        <View style={styles2.button}>
          <TouchableOpacity onPress={() => forgotPassword()} style={{ width: '100%' }}>
            <LinearGradient colors={[theme.primary, theme.light]} style={styles2.signIn}>
              <Text style={[styles2.textSign, { color: '#fff' }]}>Update</Text>
            </LinearGradient>
          </TouchableOpacity>
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
    fontFamily: 'Roboto-Bold',
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
    // fontWeight: 'bold',
    fontSize: 30,
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
    fontFamily: 'Roboto-Regular',
  },
  textSign: {
    fontSize: 18,
    // fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
  },
});
