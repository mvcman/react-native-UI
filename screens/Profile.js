import React from 'react';
import {SafeAreaView, StatusBar, View, Text, Button, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {theme} from '../components/ThemeColor';
import {AuthContext} from '../components/context';

const Stack = createStackNavigator();

const Profile = ({navigation}) => {
  const {user, signOut} = React.useContext(AuthContext);
  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} />
      <View>
        <Text>Profile Screen</Text>
        <Button title="Go to View details" onPress={() => navigation.navigate('Jobs')} />
        <Text>Welcome, {user.userName}</Text>
        <Text>{user.userType}</Text>
        <Text>{user.userToken}</Text>
        <TouchableOpacity onPress={() => signOut()}>
          <View
            style={{
              backgroundColor: theme.primary,
              width: '90%',
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              marginHorizontal: 'auto',
            }}
          >
            <Text style={{color: '#fff', fontSize: 22, fontWeight: 'bold'}}>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const ProfileScreenStack = ({navigation}) => {
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
        name="Profile"
        component={Profile}
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

export default ProfileScreenStack;
