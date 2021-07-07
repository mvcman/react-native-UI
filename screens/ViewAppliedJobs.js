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
import { useSubscription } from '@apollo/client';
import { gql } from '@apollo/client';
import AppliedJobsUser from '../components/AppliedJobsUser';
import { AuthContext } from '../components/context';
import { theme } from '../components/ThemeColor';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width } = Dimensions.get('screen');
const Stack = createStackNavigator();

const ViewAppliedJobs = ({ navigation }) => {
  const { user } = React.useContext(AuthContext);
  const [index, setIndex] = React.useState(0);
  const numColumns = 2;
  const viewPostedJobs = gql`
  subscription MySubscription {
    Application(where: {userId: {_eq: "${user.userId}"}}) {
      applicationId
      dateOfApplication
      jobId
      status
      Job {
        jobId
        jobDescription
        jobTitle
        preferencesType
        salary
        startDate
        companyName
        companyDetail
      }
    }
  }
`;

  const Tabs = () => {
    return (
      <View
        style={{
          height: 50,
          width: width,
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <TouchableOpacity
          onPress={() => setIndex(0)}
          style={[
            index === 0 && styles.activeTab,
            styles.tab,
            { borderRightWidth: 2, borderRightColor: theme.secondary },
          ]}
        >
          <Text style={{ fontSize: 18, fontFamily: 'Roboto-Bold', color: theme.primary }}>Accepted</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIndex(1)}
          style={[
            index === 1 && styles.activeTab,
            styles.tab,
            { borderRightWidth: 2, borderRightColor: theme.secondary },
          ]}
        >
          <Text style={{ fontSize: 18, fontFamily: 'Roboto-Bold', color: theme.primary }}>Rejected</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIndex(2)} style={[index === 2 && styles.activeTab, styles.tab]}>
          <Text style={{ fontSize: 18, fontFamily: 'Roboto-Bold', theme.primary }}>Applied</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const { loading, error, data } = useSubscription(viewPostedJobs);
  if (error) {
    return <Text>Error! ${error.message}</Text>;
  }
  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <Tabs />
          <View style={{ flex: 1, marginBottom: '15%' }}>
            <FlatList
              style={{ flex: 1, paddingHorizontal: 10, paddingTop: 10 }}
              data={
                index === 1
                  ? data.Application.filter(a => a.status.toLowerCase() === 'rejected')
                  : index === 2
                  ? data.Application.filter(a => a.status.toLowerCase() === 'applied')
                  : data.Application.filter(a => a.status.toLowerCase() === 'accepted')
              }
              renderItem={({ item }) => <AppliedJobsUser navigation={navigation} item={item} />}
              keyExtractor={item => item.jobId}
              numColumns={numColumns}
            />
          </View>
        </View>
      )}
    </View>
  );
};
export default ViewAppliedJobs;

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
  tab: {
    width: width / 3,
    height: '100%',
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightColor: '#fff',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: theme.primary,
  },
});
