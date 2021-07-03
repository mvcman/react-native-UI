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
} from 'react-native';
import { Divider } from 'react-native-elements';
import { theme } from './ThemeColor';

export default function JobDetail({ route, navigation }) {
  const { companyName, jobDescription, jobTitle, preferencesType, salary, startDate } = route.params.data;
  return (
    <ScrollView style={styles.container}>
      <Image
        source={[{ uri: `https://logo.clearbit.com/${companyName}.com` }]}
        style={{ width: '100%', height: 200, borderRadius: 2, resizeMode: 'contain' }}
      />
      <View style={styles.content}>
        <View style={{ marginBottom: 10 }}>
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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 80,
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
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingTop: 10,
    paddingBottom: 10,
    // borderColor: theme.primary,
    // borderRadius: 5,
    // borderWidth: 2,
  },
  heading: {
    color: theme.secondary,
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sub: {
    color: theme.secondary,
    fontSize: 18,
    fontWeight: 'normal',
    marginBottom: 2,
  },
  label: {
    color: theme.secondary,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  title: {
    color: theme.primary,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
});
