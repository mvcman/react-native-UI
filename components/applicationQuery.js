import React from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { gql, useQuery, useSubscription } from '@apollo/client';
import { AuthContext } from './context';
import { theme } from './ThemeColor';

export default function applications({ navigation }) {
  const { user, signOut } = React.useContext(AuthContext);
  const JobFromEmployer = gql`
subscription MySubscription {
  Job(where: {userId: {_eq: "${user.userId}"}, _and: {Applications: {applicationId: {_is_null: false}}}}, order_by: {startDate: desc}) {
     jobId
     jobTitle
     companyName
     startDate
     userId
     Applications {
       applicationId
       dateOfApplication
       jobId
       status
       User {
         userId
         firstName
         lastName
         preferences
         contactNumber
         role
       }
     }
   }
 }
 
`;
  const { loading, error, data } = useSubscription(JobFromEmployer);
  // console.log(data);
  //console.log(data.Applications.applicationId);
  if (loading)
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  if (error) return <Text>Error! ${error.message}</Text>;
  const Item = ({ item }) => {
    //console.log('item', item.item.Applications);
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Applications', { data: item.item.Applications })}>
        <View style={[styles.listItem, styles.shadow]}>
          <Image
            source={[{ uri: `https://logo.clearbit.com/${item.item.companyName}.com` }]}
            style={{ position: 'absolute', top: 25, width: 60, height: 60, borderRadius: 50, zIndex: 99 }}
          />

          <View style={styles.content}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, color: theme.primary }}>{item.item.companyName}</Text>
            <Text style={{ fontWeight: 'normal', fontSize: 14, color: theme.textDark }}>{item.item.jobTitle}</Text>
          </View>
        </View>
      </TouchableOpacity>
      // <View style={styles.listItem}>
      //   <Image
      //   source={[{uri: `https://logo.clearbit.com/${item.item.companyName}.com`}]}
      //   style={{width: 60, height: 60, borderRadius: 30}}
      //   />

      //   <View style={{alignItems: 'center', flex: 1, justifyContent:'center'}}>
      //   <Text style={{fontWeight: 'bold'}}>{item.item.companyName}</Text>
      //     <Text style={{fontWeight: 'bold'}}>{item.item.jobTitle}</Text>
      //   </View>

      //   <TouchableOpacity
      //   style={{
      //     height: 50,
      //     width: 50,
      //     justifyContent: 'center',
      //     alignItems: 'center',
      //   }}>
      //     <Text style={{color: 'blue'}}
      //     onPress={() => navigation.navigate('Applications', {data:item.item.Applications})} >
      //       View
      //     </Text>
      //   </TouchableOpacity>
      // </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        style={{ flex: 1 }}
        numColumns={2}
        data={data.Job}
        renderItem={item => <Item item={item} />}
        keyExtractor={item => item.jobId}
      />
    </View>
  );
}

const { width } = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    backgroundColor: '#F3F3F3',
    padding: 10,
    // marginTop: 10,
  },
  listItem: {
    position: 'relative',
    width: width / 2 - 14,
    flex: 1,
    height: 150,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#ffffff',
    margin: 2,
    padding: 5,
    borderRadius: 3,
  },
  shadow: {
    shadowColor: '#7f5df0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 2,
  },
  content: {
    padding: 10,
    paddingTop: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EAEDED',
    width: '100%',
    height: '60%',
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
});
