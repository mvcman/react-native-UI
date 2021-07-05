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
import { useSubscription } from '@apollo/client';
import { gql } from '@apollo/client';
import Job from '../components/Job';
import { AuthContext } from '../components/context';

const Stack = createStackNavigator();

const ViewPostedJobs = ({ navigation }) => {
  const { user } = React.useContext(AuthContext);
  const numColumns = 2;
  const viewPostedJobs = gql`
  subscription viewJobsSubscription
  {
    Job(order_by: {}, where: {userId: {_eq: "${user.userId}"}}) {
      jobId
      userId
      jobTitle
      startDate
      salary
      jobDescription
      preferencesType
      companyName
      companyDetail
    }
  }
`;
  const { loading, error, data } = useSubscription(viewPostedJobs);

  if (error) {
    return <Text>Error! ${error.message}</Text>;
  }
  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (
        <View style={{ flex: 1, marginBottom: '25%' }}>
          <Text style={{ fontSize: 26, paddingLeft: '22%', paddingBottom: '5%' }}>Your Posted Jobs</Text>

          <FlatList
            style={{ flex: 1, paddingHorizontal: 10 }}
            data={data.Job}
            renderItem={({ item }) => <Job navigation={navigation} item={item} />}
            keyExtractor={item => item.jobId}
            numColumns={numColumns}
          />
        </View>
      )}
    </View>
  );
};
export default ViewPostedJobs;

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
