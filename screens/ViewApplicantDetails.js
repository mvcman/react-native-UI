import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Button,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Divider } from 'react-native-elements';
import { theme } from '../components/ThemeColor';
import ChipComponent from '../components/Chip';
import SendSMS from 'react-native-sms';

export default function ViewApplicantDetails({ route, navigation }) {
  const { firstName, lastName, contactNumber, preferences, userId, role } = route.params.data;
  const initiateSMS = () => {
    console.log('Initiating SMS');

    SendSMS.send(
      {
        body: 'Contacted via OneRecruit: Hi, your profile looks interesting. Would you be interested for a job?',
        recipients: [contactNumber],
        successTypes: ['sent', 'queued', 'completed'],
      },
      (completed, cancelled, error) => {
        if (completed) {
          console.log('SMS Sent Completed');
          ToastAndroid.show('Message has been sent successfully', ToastAndroid.SHORT);
        } else if (cancelled) {
          console.log('SMS Sent Cancelled');
        } else if (error) {
          console.log('Some error occured');
          ToastAndroid.show('Something went wrong. Try again', ToastAndroid.SHORT);
        }
      },
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require('../assets/profile.png')}
        style={{ width: '100%', height: 150, borderRadius: 2, resizeMode: 'contain' }}
        resizeMode="center"
      />
      <View style={styles.content}>
        <View style={{ marginBottom: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.heading}>
            {firstName} {lastName}
          </Text>
          <Text style={styles.sub}>{contactNumber}</Text>
          <Divider orientation="horizontal" height={1} />
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.role}>{role}</Text>
        </View>
        <Divider orientation="horizontal" height={1} />
        <View style={{ margin: 10 }}>
          <Text style={styles.label}>Preferences</Text>
          <Text style={styles.title}>
            {preferences === null ? (
              <Text style={styles.preferences}>None Provided</Text>
            ) : (
              <ChipComponent title={preferences} />
            )}
          </Text>
        </View>

        <TouchableOpacity
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            marginTop: 20,
          }}
          onPress={initiateSMS}
        >
          <View
            style={{
              backgroundColor: theme.primary,
              width: '40%',
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              borderRadius: 10,
            }}
          >
            <Text style={{ color: '#fff', fontSize: 22, fontWeight: 'bold' }}>Contact</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 80,
  },
  listItem: {
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    width: '90%',
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 50,
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
  content: {
    paddingTop: 10,
    paddingBottom: 10,
    // borderColor: theme.primary,
    // borderRadius: 5,
    // borderWidth: 2,
  },
  heading: {
    color: theme.secondary,
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sub: {
    color: theme.secondary,
    fontSize: 18,
    fontWeight: 'normal',
    marginBottom: 2,
  },
  label: {
    color: theme.secondary,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  title: {
    color: theme.primary,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  role: {
    color: theme.primary,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
    textAlign: 'center',
  },
});
