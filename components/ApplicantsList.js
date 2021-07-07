import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { theme } from './ThemeColor';
import PushNotification from 'react-native-push-notification';

export default function ApplicantsList({ item, navigation }) {
  //   const sendNotification = data => {
  //     // PushNotification.checkPermissions();
  //     // PushNotification.cancelAllLocalNotifications();
  //     PushNotification.localNotification({
  //       channelId: 'demoApp',
  //       title: data.title,
  //       message: data.message,
  //       color: theme.primary,
  //     });
  //     // PushNotification.localNotificationSchedule({
  //     //   channelId: 'demoApp',
  //     //   title: data.title,
  //     //   message: data.message,
  //     //   date: new Date(Date.now() + 10 * 1000),
  //     //   allowWhileIdle: true,
  //     // });
  //   };
  return (
    <TouchableOpacity
      onPress={() => {
        // sendNotification({
        //   title: item.firstName,
        //   message: `You are viewing ${item.firstName} ${item.lastName} details`,
        // });
        navigation.navigate('Applicant Details', { data: item });
      }}
    >
      <View style={[styles.listItem, styles.shadow]}>
        <Image
          source={require('../assets/profile.png')}
          style={{ position: 'absolute', top: 25, width: 60, height: 60, borderRadius: 50, zIndex: 99 }}
          resizeMode="center"
        />
        <View style={styles.content}>
          <Text style={{ fontSize: 18, color: theme.primary, fontFamily: 'Roboto-Bold' }}>
            {item.firstName} {item.lastName}
          </Text>
          <Text style={{ fontSize: 14, color: theme.textDark, fontFamily: 'Roboto-Regular' }}>
            {item.contactNumber}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const { width } = Dimensions.get('screen');
const styles = StyleSheet.create({
  listItem: {
    position: 'relative',
    width: width / 2 - 14,
    flex: 1,
    height: 150,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#ffffff',
    margin: 2,
    padding: 5,
    borderRadius: 3,
  },
  shadow: {
    shadowColor: '#7f5df0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 2,
  },
  content: {
    padding: 10,
    paddingTop: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EAEDED',
    width: '100%',
    height: '60%',
  },
});
