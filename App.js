/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {NavigationContainer, DarkTheme, DefaultTheme} from '@react-navigation/native';
// import {createDrawerNavigator, DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
// import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {Title, Caption, TouchableRipple, Drawer as Drawer1, useTheme} from 'react-native-paper';
import Main from './screens/Main';
import {AuthContext} from './components/context';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
// import {withAuthenticator} from 'aws-amplify-react-native';

import HomeScreenStack from './screens/Home';
import JobScreenStack from './screens/Jobs';
import CreateJobStack from './screens/CreateJob';
import ApplicationStack from './screens/Applications';
import ProfileScreenStack from './screens/Profile';
// import NotificationScreenStack from './screens/Notifications';
import {theme} from './components/ThemeColor';
import {fetchSingleUser} from './components/db-functions';

const Tab = createBottomTabNavigator();
// const Drawer = createDrawerNavigator();

const TabNavigator = () => {
  const {user} = React.useContext(AuthContext);
  const CustomTabBarButton = ({children, onPress}) => {
    return (
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          ...styles.shadow,
        }}
        onPress={onPress}
      >
        <View
          style={{
            top: -30,
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: '#FF5733',
            color: '#fff',
          }}
        >
          {children}
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          bottom: 10,
          left: 10,
          right: 10,
          elevation: 0,
          borderRadius: 15,
          height: 70,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreenStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FontAwesomeIcon name="home" size={20} color={focused ? '#FF5733' : '#CCD1D1'} />
              <Text style={{color: focused ? '#FF5733' : '#CCD1D1'}}>Home</Text>
            </View>
          ),
        }}
      />
      {/* <Tab.Screen
        name="Jobs"
        component={JobScreenStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FontAwesomeIcon name="address-card" size={20} color={focused ? '#FF5733' : '#CCD1D1'} />
              <Text style={{color: focused ? '#FF5733' : '#CCD1D1'}}>Jobs</Text>
            </View>
          ),
        }}
      /> */}
      {user.userType === 'employer' ? (
        <Tab.Screen
          name="Create"
          component={CreateJobStack}
          options={{
            tabBarIcon: ({focused}) => <FontAwesomeIcon name="plus" size={35} color={focused ? '#FFF' : '#FFF'} />,
            tabBarButton: props => <CustomTabBarButton {...props} />,
          }}
        />
      ) : null}
      {/* <Tab.Screen
        name="Applications"
        component={ApplicationStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FontAwesomeIcon name="address-book" size={20} color={focused ? '#FF5733' : '#CCD1D1'} />
              <Text style={{color: focused ? '#FF5733' : '#CCD1D1'}}>Appllied</Text>
            </View>
          ),
        }}
      /> */}
      <Tab.Screen
        name="Profile"
        component={ProfileScreenStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FontAwesomeIcon name="user" size={20} color={focused ? '#FF5733' : '#CCD1D1'} />
              <Text style={{color: focused ? '#FF5733' : '#CCD1D1'}}>Profile</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// const DrawerContent = props => {
//   console.log('props ', props.loginState);
//   const {signOut, toggleTheme, user} = React.useContext(AuthContext);
//   // const user = props.loginState.userName;
//   // console.log(user);
//   const paperTheme = useTheme();
//   return (
//     <View style={{flex: 1}}>
//       <DrawerContentScrollView>
//         <View style={styles.drawerContent}>
//           <View style={styles.userInfoSection}>
//             {/* <View
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 padding: 20,
//               }}
//             > */}
//             {/* <Avatar.Image
//                 source={{
//                   uri:
//                     'https://render.fineartamerica.com/images/rendered/search/flat/tapestry/images/artworkimages/medium/2/kanye-west-richard-day.jpg?&targetx=0&targety=-68&imagewidth=930&imageheight=930&modelwidth=930&modelheight=794&backgroundcolor=9E6A5A&orientation=1&producttype=tapestry-50-61',
//                 }}
//                 size={60}
//               /> */}
//             <View style={{flexDirection: 'column'}}>
//               <Title style={styles.title}>Welcome!</Title>
//               <Title style={styles.subtitle}>{user.userName}</Title>
//               <Caption style={styles.caption}>{user.userType}</Caption>
//             </View>
//             {/* </View> */}
//           </View>
//           <Drawer1.Section style={styles.drawerSection}>
//             <DrawerItem
//               label="Home"
//               icon={({color, size}) => <Icon name="ios-home" color={color} size={size} />}
//               onPress={() => {
//                 props.navigation.navigate('HomeDrawer');
//               }}
//             />
//             {/* <DrawerItem
//               label="Details"
//               icon={({color, size}) => <Icon name="ios-home" color={color} size={size} />}
//               onPress={() => {
//                 props.navigation.navigate('Details');
//               }}
//             />
//             <DrawerItem
//               label="Settings"
//               icon={({color, size}) => <Icon name="ios-settings" color={color} size={size} />}
//               onPress={() => {
//                 props.navigation.navigate('Settings');
//               }}
//             />
//             <DrawerItem
//               label="Notifications"
//               icon={({color, size}) => <Icon name="ios-notifications" color={color} size={size} />}
//               onPress={() => {}}
//             />{' '}
//             */}
//             <DrawerItem
//               label="Notification"
//               icon={({color, size}) => <Icon name="ios-notifications" color={color} size={size} />}
//               onPress={() => {
//                 props.navigation.navigate('Notification');
//               }}
//             />
//           </Drawer1.Section>
//           {/* <Drawer1.Section>
//             <TouchableRipple onPress={() => toggleTheme()}>
//               <View>
//                 <Text>Dark theme</Text>
//                 <View pointerEvents="none">
//                   <Switch value={paperTheme.dark} />
//                 </View>
//               </View>
//             </TouchableRipple>
//           </Drawer1.Section> */}
//         </View>
//       </DrawerContentScrollView>
//       <Drawer1.Section style={StyleSheet.bottomDrawerSection}>
//         <DrawerItem
//           label="Sign Out"
//           icon={({color, size}) => <Icon name="ios-power" color={color} size={size} />}
//           onPress={() => signOut()}
//         />
//       </Drawer1.Section>
//     </View>
//   );
// };

function App() {
  // const [isLoading, setLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null);
  const [isDark, setIsDark] = React.useState(false);
  const [state, setState] = React.useState({
    isLoading: true,
    userName: null,
    userToken: null,
    userType: null,
    userId: null,
  });
  // const initialState = {
  //   isLoading: true,
  //   userName: null,
  //   userToken: null,
  //   userType: null,
  // };

  const CustomDefaultTheme = {
    ...DefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      ...PaperDefaultTheme.colors,
    },
  };

  const CustomDarkTheme = {
    ...DarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...DarkTheme.colors,
      ...PaperDarkTheme.colors,
    },
  };

  const signIn = async ({userId, token}) => {
    // setUserToken('lmn');
    // setLoading(false);
    // console.log('App.js', foundUser);
    try {
      const getUser = await fetchSingleUser(userId);
      console.log(getUser);
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('userType', getUser.role || 'applicant');
      await AsyncStorage.setItem('userName', getUser.contactNumber || '8945738478');
      await AsyncStorage.setItem('userId', userId);
      // dispatch({type: 'LOGIN', id: username, token: userToken, userType: userType});
      setState({
        userName: getUser.contactNumber,
        userToken: token,
        userType: getUser.role,
        userId: userId,
        isLoading: false,
      });
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const signUp = async action => {
    setState({
      userName: action.userName,
      userToken: action.token,
      userType: action.userType,
      isLoading: false,
    });
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userName');
    await AsyncStorage.removeItem('userType');
    setState({
      userName: null,
      userToken: null,
      userType: null,
      isLoading: false,
    });
  };

  const getToken = async action => {
    setState({
      userName: action.userName,
      userToken: action.userToken,
      userType: action.userType,
      isLoading: false,
    });
  };

  const setUserId = userId => {
    setState({
      ...state,
      userId: userId,
    });
  };
  const theme = isDark ? CustomDarkTheme : CustomDefaultTheme;
  // const loginReducer = (prevState, action) => {
  //   switch (action.type) {
  //     case 'LOGIN':
  //       return {
  //         ...prevState,
  //         userName: action.id,
  //         userToken: action.token,
  //         userType: action.userType,
  //         isLoading: false,
  //       };
  //     case 'LOGOUT':
  //       return {
  //         ...prevState,
  //         userName: null,
  //         userToken: null,
  //         userType: null,
  //         isLoading: false,
  //       };
  //     case 'REGISTER':
  //       return {
  //         ...prevState,
  //         userName: action.id,
  //         userToken: action.token,
  //         userType: action.userType,
  //         isLoading: false,
  //       };
  //     case 'GET_TOKEN':
  //       return {
  //         ...prevState,
  //         userName: action.id,
  //         userToken: action.token,
  //         userType: action.userType,
  //         isLoading: false,
  //       };
  //   }
  // };

  // const [loginState, dispatch] = React.useReducer(loginReducer, initialState);
  // const authContext = React.useMemo(
  //   () => ({
  //     signIn: async foundUser => {
  //       // setUserToken('lmn');
  //       // setLoading(false);
  //       console.log('App.js', foundUser);
  //       let userToken;
  //       userToken = foundUser[0].token;
  //       const username = foundUser[0].username;
  //       const userType = foundUser[0].usertype;
  //       try {
  //         await AsyncStorage.setItem('userToken', userToken);
  //         await AsyncStorage.setItem('userType', userType);
  //         await AsyncStorage.setItem('userName', username);
  //         dispatch({type: 'LOGIN', id: username, token: userToken, userType: userType});
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     },
  //     signOut: async () => {
  //       try {
  //         await AsyncStorage.removeItem('userToken');
  //         await AsyncStorage.removeItem('userName');
  //         await AsyncStorage.removeItem('userType');
  //         dispatch({type: 'LOGOUT'});
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     },
  //     signUp: (username, password) => {
  //       // setUserToken('lmn');
  //       // setLoading(false);
  //       let userToken;
  //       if (username === 'user' && password === 'pass') {
  //         userToken = 'lmn';
  //       }
  //       dispatch({type: 'REGISTER', id: username, token: userToken});
  //     },
  //     toggleTheme: () => {
  //       setIsDark(!isDark);
  //     },
  //     user: loginState,
  //   }),
  //   [],
  // );
  React.useEffect(() => {
    console.log('Executing useEffect!');
    setTimeout(() => {
      const getToken1 = async () => {
        let userToken;
        userToken = null;
        let userType = null;
        try {
          userToken = await AsyncStorage.getItem('userToken');
          userType = await AsyncStorage.getItem('userType');
          userName = await AsyncStorage.getItem('userName');
          // dispatch({type: 'GET_TOKEN', id: userName, token: userToken, userType: userType});
          console.log('fetching data', userToken, userType);
          getToken({
            userToken: userToken,
            userType: userType,
            userName: userName,
          });
        } catch (err) {
          console.log(err);
        }
      };
      getToken1();
    }, 1000);
  }, []);
  if (state.isLoading) {
    return (
      <View style={[{flex: 1, justifyContent: 'center', alignItems: 'center'}]}>
        <ActivityIndicator size="large" color="grey" />
      </View>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        user: state,
        signIn: signIn,
        signUp: signUp,
        signOut: signOut,
        getToken: getToken,
        setUserId: setUserId,
      }}
    >
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          {state.userToken === null ? <Main /> : <TabNavigator />}
          {/* {loginState.userToken === null ? (
            <Main />
          ) : loginState.userType === 'employee' ? (
            <Drawer.Navigator initialRouteName="HomeDrawer" drawerContent={props => <DrawerContent {...props} />}>
              <Drawer.Screen name="HomeDrawer" component={TabNavigator} />
              <Drawer.Screen name="Notification" component={NotificationScreenStack} />
            </Drawer.Navigator>
          ) : (
            <Drawer.Navigator initialRouteName="HomeDrawer" drawerContent={props => <DrawerContent {...props} />}>
              <Drawer.Screen name="HomeDrawer" component={TabNavigator} />
              <Drawer.Screen name="Notification" component={NotificationScreenStack} />
            </Drawer.Navigator>
          )} */}
        </NavigationContainer>
      </PaperProvider>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 22,
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 'normal',
    color: theme.light,
  },
  subtitle: {
    fontSize: 36,
    marginTop: 3,
    fontWeight: 'bold',
    color: theme.light,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  shadow: {
    shadowColor: '#7f5df0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

// export default withAuthenticator(App);

export default App;
