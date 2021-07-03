/* eslint-disable no-useless-escape */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import { fetchUsers } from './db-functions';


function Item({item, navigation}) {
    console.log(item);
  return (
    <View style={styles.listItem}>
      <Image
        source={require('../assets/logo.png')}
        style={{width: 60, height: 60, borderRadius: 30}}
        resizeMode="center"
        />
      <View style={{alignItems: 'center', flex: 1}}>
        <Text style={{fontWeight: 'bold'}}>{item.firstName} {item.lastName}</Text>
        <Text style={{fontWeight: 'bold'}}>{item.contactNumber}</Text>
      </View>
      <TouchableOpacity
        style={{
          height: 50,
          width: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{color: 'blue'}}
          onPress={() => navigation.navigate('viewApplicantDetails', {data: item})}
          >
          View
        </Text>
      </TouchableOpacity>
    </View>
  );
}
export default function ApplicantsList({navigation}) {
  const [userList, setUserList] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);

    const fetchedUsers = await fetchUsers();
    setUserList(fetchedUsers);
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

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (
        <FlatList
          style={{flex: 1}}
          data={userList}
          renderItem={({item}) => <Item navigation={navigation} item={item} />}
          keyExtractor={item => item.userId}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    backgroundColor: '#F3F3F3',
    // marginTop: 10,
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
});
