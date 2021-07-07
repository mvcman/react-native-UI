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
import { AuthContext } from '../components/context';
import ViewApplicantDetails from './ViewApplicantDetails';
import HomeApplicants from '../components/HomeApplicants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LoadingComponent from '../components/LoadingComponent';
import { useFocusEffect } from '@react-navigation/native';

const Home = createStackNavigator();
const jobsStack = createStackNavigator();
const applicantStack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  const { user } = React.useContext(AuthContext);
  const [jobList, setJobList] = useState([]);
  const [list, setList] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');

  const fetchData = async () => {
    setLoading(true);

    const fetchedJobs = await fetchJobs(user.userId);
    setJobList(fetchedJobs);
    setList(fetchedJobs);
    setLoading(false);
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setInput('');
    fetchData();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, []),
  );

  const SearchResult = t => {
    if (t === 'demo') {
      setList(jobList);
      setInput('');
      return;
    }
    const data = jobList.filter(
      f =>
        f.companyName.toLowerCase().includes(input) ||
        f.jobTitle.toLowerCase().includes(input) ||
        input.toLowerCase().includes(f.companyName) ||
        input.toLowerCase().includes(f.jobTitle),
    );
    setList(data);
  };
  const numColumns = 2;
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, position: 'relative' }}>
        <View
          style={{
            position: 'absolute',
            height: 60,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            paddingHorizontal: 10,
            backgroundColor: theme.primary,
          }}
        >
          <View style={styles.action}>
            <Feather name="search" color="black" size={24} />
            <TextInput
              placeholder="Search"
              placeholderTextColor="black"
              style={styles.textInput}
              autoCapitalize="none"
              value={input}
              onChangeText={text => {
                setInput(text);
                SearchResult(input);
              }}
              onEndEditing={t => SearchResult(t)}
            />
            {input === '' || input === 'demo' ? null : (
              <TouchableOpacity onPress={() => SearchResult('demo')}>
                <Feather name="x" color="grey" size={16} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color={theme.primary} />
          </View>
        ) : (
          <FlatList
            style={{
              flex: 1,
              padding: 10,
              paddingTop: 65,
              marginBottom: 60,
            }}
            data={list}
            renderItem={({ item }) => <Job navigation={navigation} item={item} />}
            keyExtractor={item => item.jobId}
            refreshing={refreshing}
            onRefresh={onRefresh}
            numColumns={numColumns}
          />
        )}
      </View>
    </View>
  );
};

const HomeScreenStack = ({ navigation }) => {
  const { user } = React.useContext(AuthContext);

  return (
    <Home.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {user.userType === 'applicant' ? (
        <>
          <jobsStack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <jobsStack.Screen
            name="Job Details"
            component={JobDetail}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: theme.primary,
              },
              headerTintColor: theme.textLight,
              headerTitleStyle: {
                fontFamily: 'Roboto-Bold',
              },
            }}
          />
        </>
      ) : (
        <>
          <applicantStack.Screen
            name="Applicants"
            component={HomeApplicants}
            options={{
              headerShown: false,
            }}
          />
          <applicantStack.Screen
            name="Applicant Details"
            component={ViewApplicantDetails}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: theme.primary,
              },
              headerTintColor: theme.textLight,
              headerTitleStyle: {
                // fontWeight: 'bold',
                fontFamily: 'Roboto-Bold',
              },
            }}
            // options={{
            //   headerShown: true,
            // }}
          />
        </>
      )}
    </Home.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
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
    width: '100%',
    borderRadius: 5,
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
    color: 'black',
    fontSize: 18,
    marginBottom: -3,
    fontFamily: 'Roboto-Regular',
  },
});
export default HomeScreenStack;
