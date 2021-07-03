/* eslint-disable no-useless-escape */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import ChipComponent from '../components/Chip';
import SendSMS from 'react-native-sms';

export default function ViewApplicantDetails(props) {
  const initiateSMS = () => {
    console.log('Initiating SMS');

    SendSMS.send(
      {
        body: 'Contacted via OneRecruit: Hi, your profile looks interesting. Would you be interested for a job?',
        recipients: [props.route.params.data.contactNumber],
        successTypes: ['sent', 'queued', 'completed'],
      },
      (completed, cancelled, error) => {

        if (completed) {
          console.log('SMS Sent Completed');
          ToastAndroid.show(
            'Message has been sent successfully',
            ToastAndroid.SHORT,
          );
        } else if (cancelled) {
          console.log('SMS Sent Cancelled');
        } else if (error) {
          console.log('Some error occured');
          ToastAndroid.show(
            'Something went wrong. Try again',
            ToastAndroid.SHORT,
          );
        }
      },
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
           {/* <Image
            source={require('../assets/profilePicture.jpg')}
            style={{width: 60, height: 60, borderRadius: 30}}
            resizeMode="center"
            /> */}
          <Text style={styles.name}>{props.route.params.data.firstName} {props.route.params.data.lastName}</Text>
          <Text style={styles.role}>
            {props.route.params.data.role}
          </Text>
          <Text style={styles.preferences}>
            Preferences
          </Text>
          <Text style={styles.preferences}>
          {props.route.params.data.preferences === null ?
            <Text style={styles.preferences}>
            None Provided
            </Text>
            :
            <ChipComponent title={props.route.params.data.preferences} />
            }
          </Text>
        </View>
        <View style={{padding: 15, top: '5%'}}>
          <TouchableOpacity style={styles.contactButton} onPress={initiateSMS}>
            <Text style={styles.contactButtonText}>Contact</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: '20%',
    backgroundColor: '#F3F3F3',
  },
  companyImage: {
    width: 200,
    height: 200,
  },
  companyDetails: {
    top: '15%',
  },
  preferences: {
    top: 10,
    fontSize: 20,
    fontStyle: 'italic',
    alignContent: 'center',
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: 'bold',
  },

  role: {
    textAlign: 'center',
    marginTop: 5,
    color: '#696969',
  },

  btnColor: {
    height: 30,
    width: 30,
    borderRadius: 30,
    marginHorizontal: 3,
  },
  btnSize: {
    height: 40,
    width: 40,
    borderRadius: 40,
    borderColor: '#778899',
    borderWidth: 1,
    marginHorizontal: 3,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  contactButton: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'blue',
  },
  contactButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
});
