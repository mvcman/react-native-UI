import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform, Dimensions, TextInput, StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import {theme} from './ThemeColor';

export default function ForgotPassword({navigation}) {
  return (
    <View style={styles2.container}>
      <StatusBar backgroundColor={theme.light} barStyle="light-content" />
      <View style={styles2.header}>
        <Text style={styles2.text_header}>Forgot Password!</Text>
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
          {/* {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null} */}
        </View>
        <View style={styles2.button}>
          <LinearGradient colors={[theme.primary, theme.light]} style={styles2.signIn}>
            <Text style={[styles2.textSign, {color: '#fff'}]}>Update</Text>
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
            <Text style={[styles2.textSign, {color: theme.primary}]}>Back</Text>
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
});
