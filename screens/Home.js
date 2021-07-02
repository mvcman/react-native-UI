import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  TextInput,
  ActivityIndicator,
  FlatList,
  View,
  Text,
  StyleSheet,
  Button,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Feather from 'react-native-vector-icons/Feather';
import { theme } from '../components/ThemeColor';
import JobDetail from '../components/JobDetail';
import Job from '../components/Job';
import { fetchJobs } from '../components/db-functions';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [jobList, setJobList] = useState([]);
  const [list, setList] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');

  const fetchData = async () => {
    setLoading(true);

    const fetchedJobs = await fetchJobs();
    setJobList(fetchedJobs);
    setList(fetchedJobs);
    setLoading(false);
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const SearchResult = t => {
    const data = jobList.filter(f => f.companyName.toLowerCase().includes(input));
    setList(data);
  };
  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (
        <View style={{ flex: 1, position: 'relative' }}>
          <View
            style={{
              position: 'absolute',
              height: 60,
              width: '100%',
              backgroundColor: theme.primary,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 9999,
            }}
          >
            <View style={styles.action}>
              <Feather name="search" color="grey" size={24} />
              <TextInput
                placeholder="Search by Company"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={text => setInput(text)}
                onEndEditing={t => SearchResult(t)}
              />
            </View>
          </View>
          <FlatList
            style={{ flex: 1, paddingVertical: 50, paddingHorizontal: 10 }}
            data={list}
            renderItem={({ item }) => <Job navigation={navigation} item={item} />}
            keyExtractor={item => item.jobId}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        </View>
      )}
    </View>
  );
};

const HomeScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator
    // screenOptions={{
    //   headerShown: false,
    // }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          // headerLeft: () => (
          //   <Icon
          //     name="ios-menu"
          //     size={35}
          //     backgroundColor={theme.primary}
          //     color={theme.textLight}
          //     onPress={() => navigation.openDrawer()}
          //     style={{marginLeft: 10}}
          //   />
          // ),
        }}
      />
      <Stack.Screen
        name="Job Details"
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    // padding: 10,
  },
  loading: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: 'silver',
    justifyContent: 'center',
    alignItems: 'center',
  },
  action: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 20,
    paddingHorizontal: 20,
    height: 40,
    margin: 'auto',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: 'grey',
    fontSize: 18,
    marginBottom: -3,
  },
});
export default HomeScreenStack;
