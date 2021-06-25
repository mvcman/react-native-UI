/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  TouchableRipple,
  Switch,
  Drawer as Drawer1,
} from 'react-native-paper';
import Main from './Main';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} />
      <View>
        <Text>Home Screen</Text>
        <Button
          title="Go to View details"
          onPress={() => navigation.navigate('Detail')}
        />
      </View>
    </SafeAreaView>
  );
};

const DetailScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} />
      <View>
        <Text>Detail Screen</Text>
        <Button
          title="Go to View details screen again..."
          onPress={() => navigation.push('Detail')}
        />
        <Button
          title="Go to Home"
          onPress={() => navigation.navigate('Home')}
        />
        <Button title="Go Back" onPress={() => navigation.goBack()} />
        <Button title="Go Back to Top" onPress={() => navigation.popToTop()} />
        <Button
          title="Go To Last"
          onPress={() => navigation.navigate('Last')}
        />
      </View>
    </SafeAreaView>
  );
};

const LastScreen = ({navigation}) => {
  return (
    <View>
      <Text>Last Screen</Text>
      <Button title="Go Back to Top" onPress={() => navigation.popToTop()} />
    </View>
  );
};

const Settings = () => {
  return (
    <View>
      <Text>Settings Component</Text>
    </View>
  );
};

const Explore = () => {
  return (
    <View>
      <Text>Explore Component</Text>
    </View>
  );
};

const HomeScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerLeft: () => (
            <Icon
              name="ios-menu"
              size={25}
              backgroundColor="#009387"
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const DetailScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerLeft: () => (
          <Icon
            name="ios-menu"
            size={25}
            backgroundColor="#009387"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}>
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="Last" component={LastScreen} />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          position: 'absolute',
          bottom: 10,
          left: 10,
          right: 10,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreenStack}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: 'red',
          tabBarIcon: ({color}) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Details"
        component={DetailScreenStack}
        options={{
          tabBarLabel: 'Details',
          tabBarColor: 'red',
          tabBarIcon: ({color}) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarColor: 'red',
          tabBarIcon: ({color}) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarLabel: 'Explore',
          tabBarColor: 'red',
          tabBarIcon: ({color}) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Demo = () => {
  return (
    <View>
      <Text>Demo screen</Text>
    </View>
  );
};
const DrawerContent = props => {
  const [isDark, setIsDark] = React.useState(false);
  const toggleTheme = () => {
    setIsDark(!isDark);
  };
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 20,
              }}>
              <Avatar.Image
                source={{
                  uri:
                    'https://render.fineartamerica.com/images/rendered/search/flat/tapestry/images/artworkimages/medium/2/kanye-west-richard-day.jpg?&targetx=0&targety=-68&imagewidth=930&imageheight=930&modelwidth=930&modelheight=794&backgroundcolor=9E6A5A&orientation=1&producttype=tapestry-50-61',
                }}
                size={60}
              />
              <View style={{flexDirection: 'column', marginLeft: 10}}>
                <Title style={styles.title}>Mandar Waghe</Title>
                <Caption style={styles.caption}>@mvcman</Caption>
              </View>
            </View>
          </View>
          <Drawer1.Section style={styles.drawerSection}>
            <DrawerItem
              label="Home"
              icon={({color, size}) => (
                <Icon name="ios-home" color={color} size={size} />
              )}
              onPress={() => {
                props.navigation.navigate('HomeDrawer');
              }}
            />
            <DrawerItem
              label="Details"
              icon={({color, size}) => (
                <Icon name="ios-home" color={color} size={size} />
              )}
              onPress={() => {
                props.navigation.navigate('Details');
              }}
            />
            <DrawerItem
              label="Settings"
              icon={({color, size}) => (
                <Icon name="ios-settings" color={color} size={size} />
              )}
              onPress={() => {
                props.navigation.navigate('Settings');
              }}
            />
            <DrawerItem
              label="Notifications"
              icon={({color, size}) => (
                <Icon name="ios-notifications" color={color} size={size} />
              )}
              onPress={() => {}}
            />
            <DrawerItem
              label="Demo"
              icon={({color, size}) => (
                <Icon name="ios-notifications" color={color} size={size} />
              )}
              onPress={() => {
                props.navigation.navigate('Demo');
              }}
            />
          </Drawer1.Section>
          <Drawer1.Section>
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}>
              <View>
                <Text>Dark theme</Text>
                <View pointerEvents="none">
                  <Switch value={isDark} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer1.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer1.Section style={StyleSheet.bottomDrawerSection}>
        <DrawerItem
          label="Sign Out"
          icon={({color, size}) => (
            <Icon name="ios-power" color={color} size={size} />
          )}
          onPress={() => {}}
        />
      </Drawer1.Section>
    </View>
  );
};
const App = () => {
  return (
    <NavigationContainer>
      <Main />
      {/* <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="HomeDrawer" component={TabNavigator} />
        <Drawer.Screen name="Demo" component={Demo} />
      </Drawer.Navigator> */}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
