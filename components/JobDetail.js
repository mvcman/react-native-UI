import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Button,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import { Divider } from 'react-native-elements';
import { theme } from './ThemeColor';
import { AuthContext } from './context';
import { applyJobMutation } from './db-functions';

export default function JobDetail({ route, navigation }) {
  const { user } = React.useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    const data = await applyJobMutation(route.params.data.jobId, user.userId);
    if (data.insert_Application.affected_rows === 1) {
      setLoading(false);
      ToastAndroid.show('Application sent successfully', ToastAndroid.SHORT);
      navigation.navigate('Home');
    } else {
      setLoading(false);
      ToastAndroid.show('Please try again', ToastAndroid.SHORT);
    }
  };

  const { companyName, jobDescription, jobTitle, preferencesType, salary, startDate } = route.params.data;
  return (
    <ScrollView style={styles.container}>
      <Image
        source={[{ uri: `https://logo.clearbit.com/${companyName}.com` }]}
        style={{ width: '100%', height: 200, borderRadius: 2, resizeMode: 'contain' }}
      />
      <View style={styles.content}>
        <View style={{ marginBottom: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.heading}>{companyName}</Text>
          <Text style={styles.sub}>{jobDescription}</Text>
          <Divider orientation="horizontal" height={1} />
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.label}>Job Title:- </Text>
          <Text style={styles.title}>{jobTitle}</Text>
        </View>
        <Divider orientation="horizontal" height={1} />
        <View style={{ marginBottom: 10, display: 'flex' }}>
          <Text style={styles.label}>Start Date:-</Text>
          <Text style={styles.title}>{startDate}</Text>
        </View>
        <Divider orientation="horizontal" height={1} />
        <View style={{ marginBottom: 10, display: 'flex' }}>
          <Text style={styles.label}>Salary:-</Text>
          <Text style={styles.title}>Rs {salary}</Text>
        </View>
        <Divider orientation="horizontal" height={1} />
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.label}>Preference Type:-</Text>
          {preferencesType.map((p, i) => (
            <Text key={i} style={styles.title}>
              {p}
            </Text>
          ))}
        </View>
        {user.userType === 'employer' ? (
          <Text />
        ) : (
          <TouchableOpacity style={styles.applyButton} onPress={() => handleSubmit()}>
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        )}
      </View>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 80,
    backgroundColor: 'white',
  },
  applyButton: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: theme.primary,
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  listItem: {
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    width: '90%',
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 50,
  },
  loading: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
    // borderColor: theme.primary,
    // borderRadius: 5,
    // borderWidth: 2,
  },
  heading: {
    color: theme.secondary,
    fontSize: 26,
    fontFamily: 'Roboto-Bold',
    marginBottom: 5,
  },
  sub: {
    color: theme.secondary,
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
    marginBottom: 2,
  },
  label: {
    color: theme.secondary,
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    marginBottom: 2,
  },
  title: {
    color: theme.primary,
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    marginBottom: 2,
  },
});
