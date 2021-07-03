// import React from 'react';
// import { SafeAreaView, StatusBar, View, Text, Button, TouchableOpacity } from 'react-native';
// import { createStackNavigator } from '@react-navigation/stack';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { theme } from '../components/ThemeColor';
// import { AuthContext } from '../components/context';
// import PushNotification from 'react-native-push-notification';

// const Stack = createStackNavigator();

// const Profile = ({ navigation }) => {
//   const { user, signOut } = React.useContext(AuthContext);
//   const sendNotification = data => {
//     PushNotification.localNotification({
//       channelId: 'demoApp',
//       title: data.title,
//       message: data.message,
//     });
//   };
//   return (
//     <SafeAreaView>
//       <StatusBar barStyle={'light-content'} />
//       <View>
//         <Text>Profile Screen</Text>
//         <Button title="Go to View details" onPress={() => navigation.navigate('Jobs')} />
//         <Text>Welcome, {user.userName}</Text>
//         <Text>{user.userType}</Text>
//         <Text>{user.userToken}</Text>
//         <TouchableOpacity onPress={() => signOut()}>
//           <View
//             style={{
//               backgroundColor: theme.primary,
//               width: '90%',
//               height: 40,
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               textAlign: 'center',
//               borderRadius: 10,
//             }}
//           >
//             <Text style={{ color: '#fff', fontSize: 22, fontWeight: 'bold' }}>Sign Out</Text>
//           </View>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() =>
//             sendNotification({
//               title: 'demo',
//               message: 'Notification sent!',
//             })
//           }
//         >
//           <View
//             style={{
//               backgroundColor: theme.primary,
//               width: '90%',
//               height: 40,
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               textAlign: 'center',
//               borderRadius: 10,
//             }}
//           >
//             <Text style={{ color: '#fff', fontSize: 22, fontWeight: 'bold' }}>Send Notification</Text>
//           </View>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const ProfileScreenStack = ({ navigation }) => {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerStyle: {
//           backgroundColor: theme.primary,
//         },
//         headerTintColor: theme.textLight,
//         headerTitleStyle: {
//           fontWeight: 'bold',
//         },
//       }}
//     >
//       <Stack.Screen
//         name="Profile"
//         component={Profile}
//         // options={{
//         //   headerLeft: () => (
//         //     <Icon
//         //       name="ios-menu"
//         //       size={35}
//         //       backgroundColor={theme.primary}
//         //       color={theme.textLight}
//         //       onPress={() => navigation.openDrawer()}
//         //       style={{marginLeft: 10}}
//         //     />
//         //   ),
//         // }}
//       />
//     </Stack.Navigator>
//   );
// };

// export default ProfileScreenStack;
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome/';
import { theme } from '../components/ThemeColor';
import { AuthContext } from '../components/context';
import ChipComponent from '../components/chip';
import { useSubscription } from '@apollo/client';
import { gql } from '@apollo/client';
import EditProfileScreen from './EditProfile';
import ViewPostedJobs from './ViewPostedJob';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

const Stack = createStackNavigator();

const Profile = ({ navigation }) => {
  const { user, signOut } = React.useContext(AuthContext);
  const fetchUserProfile = gql`
  subscription MySubscription {
    User_by_pk(userId: "${user.userId}") {
      userId
      firstName
      lastName
      contactNumber
      preferences
      role
      Jobs {
        jobId
        userId
        jobTitle
        jobDescription
        startDate
        salary
        preferencesType
        companyDetail
        companyName
      }
      Applications {
        applicationId
        jobId
        userId
        dateOfApplication
        status
      }
    }
  }
`;
  const { loading, error, data } = useSubscription(fetchUserProfile);

  if (error) {
    return <Text>Error! ${error.message}</Text>;
  }
  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.backgroundImageParent}>
            <ImageBackground style={styles.backgroundImage} source={require('../assets/profileBackgroundWhite.jpg')}>
              <Icon
                name="power-off"
                size={35}
                color="black"
                style={styles.logout}
                onPress={() => {
                  signOut();
                }}
              />

              <View style={styles.profileImage}>
                <Image source={require('../assets/profilePicture.jpg')} style={styles.image} resizeMode="center" />
                <View style={styles.add}>
                  <Icon
                    name="edit"
                    size={25}
                    color="white"
                    onPress={() => navigation.navigate('editProfile', { navigation: { navigation } })}
                  />
                </View>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.infoContainer}>
            <Text style={[styles.text, { fontWeight: '200', fontSize: 30 }]}>
              {data.User_by_pk.firstName ? data.User_by_pk.firstName : 'Firstname'}{' '}
              {data.User_by_pk.lastName ? data.User_by_pk.lastName : 'LastName'}
            </Text>
            <Text style={[styles.text, { color: 'black', fontSize: 14 }]}>{data ? data.User_by_pk.role : 'role'}</Text>
            <Text style={[styles.text, { color: 'black', fontSize: 14 }]}>
              {data ? data.User_by_pk.contactNumber : 'number'}
            </Text>
          </View>
          <View style={styles.statsContainer}>
            {user.userType === 'employer' ? (
              <View style={styles.statsBox}>
                <Text
                  style={[styles.text, { fontSize: 24, color: theme.primary }]}
                  onPress={() => navigation.navigate('viewPostedJobs')}
                >
                  {data.User_by_pk.Jobs.length}
                </Text>
                <Text style={[styles.text, styles.subText, { color: theme.primary }]}>Jobs posted</Text>
              </View>
            ) : (
              <Text />
            )}
            <View style={[styles.statsBox, { borderColor: '#DFD8C8', borderLeftWidth: 1, borderRightWidth: 1 }]}>
              {data.User_by_pk.preferences ? (
                <Text style={[styles.text, { fontSize: 24 }]}>{data.User_by_pk.preferences.length}</Text>
              ) : (
                <Text style={[styles.text, { fontSize: 24 }]}>0</Text>
              )}
              <Text style={[styles.text, styles.subText]}>Interests</Text>
            </View>
            <View style={styles.statsBox}>
              {data ? (
                data.User_by_pk.role === 'employer' ? (
                  <View style={styles.statsBox}>
                    <Text
                      style={[styles.text, { fontSize: 24, color: theme.primary }]}
                      onPress={() => navigation.navigate('appliedJobs')}
                    >
                      {data.User_by_pk.Applications.length}
                    </Text>
                    <Text style={[styles.text, styles.subText, { color: theme.primary }]}>Applications</Text>
                  </View>
                ) : (
                  <View style={styles.statsBox}>
                    <Text
                      style={[styles.text, { fontSize: 24, color: theme.primary }]}
                      onPress={() => navigation.navigate('appliedJobs')}
                    >
                      {data.User_by_pk.Applications.length}
                    </Text>

                    <Text style={[styles.text, styles.subText, { color: theme.primary }]}>Applied</Text>
                  </View>
                )
              ) : (
                <Text Text style={[styles.text, styles.subText]}>
                  loading
                </Text>
              )}
            </View>
          </View>
          <View>
            <Text
              style={[
                styles.text,
                {
                  color: 'black',
                  fontSize: 20,
                  left: '3%',
                  top: '10%',
                },
              ]}
            >
              Your Interests are as follows:
            </Text>
            <View
              style={{
                height: 'auto',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                alignContent: 'space-around',
                padding: 15,
              }}
            >
              {data ? (
                <ChipComponent title={data.User_by_pk.preferences} />
              ) : (
                <View style={{ flex: 1 }}>
                  <View style={styles.loading}>
                    <ActivityIndicator size="large" color="blue" />
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const ProfileScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="editProfile" component={EditProfileScreen} />
      <Stack.Screen name="viewPostedJobs" component={ViewPostedJobs} />
    </Stack.Navigator>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    fontFamily: 'HelveticaNeue',
    color: '#52575D',
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'space-evenly',
  },
  backgroundImageParent: {
    width: '100%',
    height: 250,
  },
  logout: {
    top: '10%',
    left: '85%',
  },

  subText: {
    fontSize: 12,
    color: '#AEB5BC',
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 70,
    overflow: 'hidden',
    alignSelf: 'center',
    top: 0,
  },
  add: {
    backgroundColor: '#41444B',
    position: 'absolute',
    bottom: 10,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
  },
  statsBox: {
    alignItems: 'center',
    flex: 1,
  },
  loading: {
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
export default ProfileScreenStack;
