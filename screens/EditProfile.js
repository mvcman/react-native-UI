/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { ToastAndroid, View, Text, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { updateUserDetails } from '../components/db-functions';
import { AuthContext } from '../components/context';
import { theme } from '../components/ThemeColor';

const EditProfileScreen = props => {
  const { user, signOut } = React.useContext(AuthContext);
  const colors = {
    text: 'black',
  };
  const [preferences, setPreferences] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    isFName: false,
    isLName: false,
    isPreference: false,
  });

  const handleSubmit = async () => {
    if (firstName === '') {
      setData({
        isFName: true,
        isLName: false,
        isPreference: false,
      });
      setError('Firstname cannot be empty');
    } else if (lastName === '') {
      setData({
        isFName: false,
        isLName: true,
        isPreference: false,
      });
      setError('Lastname cannot be empty');
    } else if (preferences === '') {
      setData({
        isFName: false,
        isLName: false,
        isPreference: true,
      });
      setError('Preferences cannot be empty');
    } else {
      setLoading(true);
      const data = await updateUserDetails(user.userId, firstName, lastName, preferences);
      if (data.update_User.affected_rows === 1) {
        ToastAndroid.show('User details updated', ToastAndroid.SHORT);
        setError('');
        setFirstName('');
        setLastName('');
        setPreferences('');
        setLoading(false);
        props.navigation.navigate('Profile');
        setData({
          isFName: false,
          isLName: false,
          isPreference: false,
        });
        setError('');
      } else {
        setData({
          isFName: false,
          isLName: false,
          isPreference: true,
        });
        setError('set preferences separated by "," for example aws,sql,react');
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text style={{ fontSize: 26, marginTop: 20, marginBottom: 20 }}>Enter details to update</Text> */}

      <View style={styles.witherror}>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="First Name"
            placeholderTextColor="grey"
            autoCorrect={false}
            value={firstName}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            onChangeText={setFirstName}
          />
        </View>
        {data.isFName ? (
          <Text style={{ color: 'red', fontSize: 14, marginBottom: 5, marginLeft: 20 }}>{error}</Text>
        ) : null}
      </View>

      <View style={styles.witherror}>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Last Name"
            value={lastName}
            placeholderTextColor="grey"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            onChangeText={setLastName}
          />
        </View>
        {data.isLName ? (
          <Text style={{ color: 'red', fontSize: 14, marginBottom: 5, marginLeft: 20 }}>{error}</Text>
        ) : null}
      </View>

      <View style={styles.witherror}>
        <View style={styles.action}>
          <FontAwesome name="star" color={colors.text} size={20} />
          <TextInput
            placeholder='Enter preferences separated by " , "'
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={preferences}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            onChangeText={setPreferences}
          />
        </View>
        {data.isPreference ? (
          <Text style={{ color: 'red', fontSize: 14, marginBottom: 5, marginLeft: 20 }}>{error}</Text>
        ) : null}
      </View>

      <View style={styles.action2}>
        <FontAwesome name="user-o" color={colors.text} size={20} />
        <TextInput
          value={user.userType}
          placeholderTextColor="#666666"
          autoCorrect={false}
          editable={false}
          style={[
            styles.textInput,
            {
              color: colors.text,
            },
          ]}
        />
      </View>
      <View style={styles.action2}>
        <Feather name="phone" color={colors.text} size={20} />
        <TextInput
          placeholder={user.userName}
          placeholderTextColor="#666666"
          keyboardType="number-pad"
          editable={false}
          autoCorrect={false}
          style={[
            styles.textInput,
            {
              color: colors.text,
            },
          ]}
        />
      </View>

      <TouchableOpacity style={styles.commandButton} onPress={() => handleSubmit()}>
        <Text style={styles.panelButtonTitle}>Submit</Text>
      </TouchableOpacity>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      )}
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  commandButton: {
    // padding: 15,
    // borderRadius: 10,
    // backgroundColor: 'blue',
    // alignItems: 'center',
    // marginTop: 10,
    backgroundColor: theme.primary,
    width: '100%',
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 5,
  },
  panelHeader: {
    alignItems: 'center',
  },
  witherror: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 10,
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: theme.primary,
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  action: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  action2: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
    paddingHorizontal: 10,
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
    // eslint-disable-next-line no-undef
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  loading: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
