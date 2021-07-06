import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert, ToastAndroid} from 'react-native'
import { Divider } from 'react-native-elements';
import { theme } from '../components/ThemeColor';
import ChipComponent from '../components/chip';
import { rejectclick, acceptClick } from '../components/db-functions';
let resp;
export default function ViewApplicantScreen({route,navigation}) {

    const handleAccept = async (a_id) => {
        resp = await acceptClick(a_id);
        if(resp.Error){
            Alert.alert('Error', resp.Error.message);
            return;
        }
        console.log('response', resp);
        console.log(route.params.data.item.status);
        //Alert.alert('Success', 'Application accepted');
        ToastAndroid.show('Application approved', ToastAndroid.LONG);
    }

    const handleReject = async (r_id) => {
        const resp = await rejectclick(r_id);
        if(resp.Error){
            Alert.alert('Error', resp.Error.message);
            return;
        }
        console.log('response', resp);
        //Alert.alert('Success', 'Application rejected');
        ToastAndroid.show('Application rejected', ToastAndroid.LONG);
    }

    return (
        <View style = {styles.container}>
            <ScrollView>
               <Image
                  source={require('../assets/profile.png')}
                  style={{ width: '100%', height: 150, borderRadius: 2, resizeMode: 'contain' }}
                  resizeMode="center"
                />
                <View style={styles.content}>
                   <View style={{ marginBottom: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={styles.heading}>{route.params.data.item.User.firstName} {route.params.data.item.User.lastName}</Text>
                      <Text style={styles.sub}>{route.params.data.item.User.contactNumber}</Text>
                      <Divider orientation="horizontal" height={1} />
                   </View>
                  {/* <View>
                  <Text style={styles.role}>{route.params.data.item.status}</Text>
                  </View> */}
                  <View style={{ marginBottom: 10 }}>
                    <Text style={styles.role}>{route.params.data.item.User.role}</Text>
                  </View>
                  <Divider orientation="horizontal" height={1} />  
                  <View style={{ margin: 10 }}>
                    <Text style={styles.label}>Preferences</Text>
                    <Text style={styles.title}>
                      {route.params.data.item.User.preferences === null ? (
                        <Text style={styles.preferences}>None Provided</Text>
                      ) : (
                      <ChipComponent title={route.params.data.item.User.preferences} />
                      )}
                    </Text>
                  </View>
                  {
                    route.params.data.item.status === 'applied' || route.params.data.item.status === 'Applied' ?
                      <View>
                      <View style={{padding: 15, top: '5%', flex:1, flexDirection:'row', justifyContent:'center'}}>
                        <TouchableOpacity style={styles.acceptButton} onPress={ () => handleAccept(route.params.data.item.applicationId)}>
                            <View>
                            <Text style={styles.buttonText}>Approve</Text>
                            </View>
                        </TouchableOpacity>
                        <Text>{'     '}</Text>
                        <TouchableOpacity style={styles.rejectButton} onPress={ () => handleReject(route.params.data.item.applicationId)}> 
                            <View>
                            <Text style={styles.buttonText}>Reject</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    </View>
                    : (
                      <View></View>
                    )
                  }

                  {
                    route.params.data.item.status === 'Accepted' ?
                      <View style={{padding: 15, top: '5%', flex:1, flexDirection:'row', justifyContent:'center'}}>
                        <Text style={styles.role}>This application is already approved</Text>
                    </View>
                    : (
                      <View></View>
                    )
                  }

                  {
                    route.params.data.item.status === 'Rejected' ?
                      <View style={{padding: 15, top: '5%', flex:1, flexDirection:'row', justifyContent:'center'}}>
                        <Text style={styles.role}>This application is already rejected</Text>
                    </View>
                    : (
                      <View></View>
                    )
                  }
                    
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      padding: 10,
      marginBottom: 80,
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
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 2,
    },
    title: {
      color: theme.primary,
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 2,
    },
    // preferences: {
    //   top: 10,
    //   fontSize: 20,
    //   //height: 100,
    //   fontStyle: 'italic',
    //   alignContent: 'center',
    // },
    name: {
      fontSize: 28,
      color: '#696969',
      fontWeight: 'bold',
    },
  
    role: {
      color: theme.primary,
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 2,
      textAlign: 'center',
    },
  
    btnColor: {
      height: 30,
      width: 30,
      borderRadius: 30,
      marginHorizontal: 3,
    },
  
    acceptButton: {
      marginTop: 10,
      height: 45,
      width:100,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 30,
      backgroundColor: 'blue',
      marginBottom:10
    },

    rejectButton: {
        marginTop: 10,
        height: 45,
        width:100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: 'red',
        marginBottom:10
      },

    buttonText: {
      color: '#FFFFFF',
      fontSize: 20,
    },
  });