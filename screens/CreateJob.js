import React from 'react';
import {SafeAreaView, StatusBar, View, Text, Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {theme} from '../components/ThemeColor';

const Stack = createStackNavigator();

const CreateJob = ({navigation}) => {
  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} />
      <View>
        <Text>Create Job Screen</Text>
        <Button title="Go to View details" onPress={() => navigation.navigate('Home')} />
      </View>
    </SafeAreaView>
  );
};

const CreateJobStack = ({navigation}) => {
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
        name="CreateJob"
        component={CreateJob}
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

export default CreateJobStack;
