import React from 'react';
import {SafeAreaView, StatusBar, View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {theme} from '../components/ThemeColor';

const Stack = createStackNavigator();

const NotificationScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.container}>
        <Text>Notification Screen</Text>
        <TouchableOpacity>
          <View style={styles.btn}>
            <Text style={styles}>Press me to get the notification!</Text>
          </View>
        </TouchableOpacity>
        <Button title="Go to View Jobs" onPress={() => navigation.navigate('Jobs')} />
      </View>
    </SafeAreaView>
  );
};

const NotoficationScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.primary,
        },
        headerTintColor: theme.textLight,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="Notification"
        component={NotificationScreen}
        // options={{
        //   headerLeft: () => (
        //     <Icon
        //       name="ios-menu"
        //       size={35}
        //       backgroundColor={theme.primary}
        //       color={theme.textLight}
        //       onPress={() => navigation.openDrawer()}
        //       style={{marginLeft: 10}}
        //     />
        //   ),
        // }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
});
export default NotoficationScreenStack;
