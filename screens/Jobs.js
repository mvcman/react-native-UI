import React from 'react';
import {SafeAreaView, StatusBar, View, Text, Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {theme} from '../components/ThemeColor';

const Stack = createStackNavigator();

const Jobs = ({navigation}) => {
  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} />
      <View>
        <Text>Jobs Screen</Text>
        <Button title="Go to View details screen again..." onPress={() => navigation.push('Jobs')} />
        <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
        <Button title="Go Back" onPress={() => navigation.goBack()} />
        <Button title="Go Back to Top" onPress={() => navigation.popToTop()} />
        <Button title="Go To Last" onPress={() => navigation.navigate('JobDetail')} />
      </View>
    </SafeAreaView>
  );
};

const JobDetail = ({navigation}) => {
  return (
    <View>
      <Text>Job details Screen</Text>
      <Button title="Go Back to Top" onPress={() => navigation.popToTop()} />
    </View>
  );
};

const JobScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Jobs"
        component={Jobs}
        options={{
          headerStyle: {
            backgroundColor: theme.primary,
          },
          headerTintColor: theme.textLight,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
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
        }}
      />
      <Stack.Screen
        name="JobDetail"
        component={JobDetail}
        options={{
          headerStyle: {
            backgroundColor: theme.primary,
          },
          headerTintColor: theme.textLight,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default JobScreenStack;
