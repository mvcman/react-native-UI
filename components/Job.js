import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { theme } from './ThemeColor';
import PushNotification from 'react-native-push-notification';

export default function Job({ item, navigation }) {
  const sendNotification = data => {
    // PushNotification.checkPermissions();
    // PushNotification.cancelAllLocalNotifications();
    // PushNotification.localNotification({
    //   channelId: 'demoApp',
    //   title: data.title,
    //   message: data.message,
    //   color: theme.primary,
    // });
    // PushNotification.localNotificationSchedule({
    //   channelId: 'demoApp',
    //   title: data.title,
    //   message: data.message,
    //   date: new Date(Date.now() + 10 * 1000),
    //   allowWhileIdle: true,
    // });
  };
  return (
    <TouchableOpacity
      onPress={() => {
        sendNotification({
          title: item.jobTitle,
          message: `You are viewing ${item.companyName} details`,
        });
        navigation.navigate('Job Details', { data: item });
      }}
    >
      <View style={[styles.listItem, styles.shadow]}>
        <Image
          source={[{ uri: `https://logo.clearbit.com/${item.companyName}.com` }]}
          style={{ position: 'absolute', top: 25, width: 60, height: 60, borderRadius: 50, zIndex: 99 }}
        />
        <View style={styles.content}>
          <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 18, color: theme.primary }}>{item.companyName}</Text>
          <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 14, color: theme.textDark }}>{item.jobTitle}</Text>
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
