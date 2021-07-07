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
  Dimensions,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Feather from 'react-native-vector-icons/Feather';
import { theme } from '../components/ThemeColor';
import JobDetail from '../components/JobDetail';
import Job from '../components/Job';
import { fetchJobs } from '../components/db-functions';
import { AuthContext } from '../components/context';
import ViewApplicantDetails from '../screens/ViewApplicantDetails';
import ApplicantsList from '../components/ApplicantsList';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { fetchUsers } from './db-functions';
import LoadingComponent from './LoadingComponent';

export default function HomeApplicants({ navigation }) {
  //   const [userList, setuserList] = useState([]);
  const [list, setList] = useState([]);
  //   const [refreshing, setRefreshing] = React.useState(false);
  //   const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [userList, setUserList] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const { height } = Dimensions.get('screen');
  const fetchData = async () => {
    setLoading(true);

    const fetchedUsers = await fetchUsers();
    setUserList(fetchedUsers);
    setList(fetchedUsers);
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
  // console.log(userList);
  const SearchResult = t => {
    if (t === 'demo') {
      setList(userList);
      setInput('');
      return;
    }
    setList(data);

    const data = userList.filter(
      f =>
        f.firstName === null ||
        f.lastName === null ||
        f.firstName.toLowerCase().includes(input) ||
        f.lastName.toLowerCase().includes(input) ||
        input.toLowerCase().includes(f.firstName) ||
        input.toLowerCase().includes(f.lastName),
    );
    setList(data);
  };
  const numColumns = 2;
  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
      ) : (
        <View style={{ flex: 1, position: 'relative', paddingBottom: 30 }}>
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
              <Feather name="search" color="grey" size={24} />
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
          <FlatList
            style={{
              flex: 1,
              padding: 10,
              paddingTop: 65,
              marginBottom: 50,
            }}
            data={list}
            renderItem={({ item }) => <ApplicantsList navigation={navigation} item={item} />}
            keyExtractor={item => item.userId}
            refreshing={refreshing}
            onRefresh={onRefresh}
            numColumns={numColumns}
          />
        </View>
      )}
    </View>
  );
}

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
    color: 'grey',
    fontSize: 18,
    marginBottom: -3,
  },
});
