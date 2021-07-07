import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { theme } from '../components/ThemeColor';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

export default function ViewApplicationScreen({ route, navigation }) {
  //console.log('route details', route.params.data);
  const app = route.params.data;
  //const app1 = app.map((a,i))
  const Item = ({ item }) => {
    console.log('item details', item);
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Applicant', { data: item })}>
        <View style={[styles.listItem, styles.shadow]}>
          <Image
            source={require('../assets/profile.png')}
            style={{ position: 'absolute', top: 25, width: 60, height: 60, borderRadius: 50, zIndex: 99 }}
            resizeMode="center"
          />

          <View style={styles.content}>
            <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 18, color: theme.primary }}>
              {item.item.User.firstName} {item.item.User.lastName}
            </Text>
            <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 14, color: theme.textDark }}>
              {item.item.dateOfApplication}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      // <View style = {styles.listItem}>
      //     <Image
      //     source={require('../assets/profile.png')}
      //     style={{width: 60, height: 60, borderRadius: 30}}
      //     />

      //     <View style={{alignItems: 'center', flex: 1, justifyContent:'center'}}>
      //         <Text style={{fontWeight: 'bold'}}>{item.item.User.firstName} {item.item.User.lastName}</Text>
      //         <Text style={{fontWeight: 'bold'}}>{item.item.dateOfApplication}</Text>
      //     </View>

      //     <TouchableOpacity
      //     style={{
      //     height: 50,
      //     width: 50,
      //     justifyContent: 'center',
      //     alignItems: 'center',
      //     }}>
      //     <Text
      //     style={{color: 'blue'}}
      //     onPress={() => navigation.navigate('Applicant', {data: item})}>
      //         View
      //     </Text>
      //     </TouchableOpacity>

      // </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        style={{ flex: 1 }}
        numColumns={2}
        data={app}
        renderItem={item => <Item item={item} />}
        keyExtractor={item => item.applicationId}
      />
    </View>
    // <ScrollView>
    // <View style={styles.view}>

    // {
    //   app.map((a,i) => <View key={i} style={{width:'100%', alignItems:'center', justifyContent:'flex-end'}}>
    //   <View style={{width:'100%', alignItems:'center', fontSize:20}}>
    //     <Text style={{fontSize: 20}}>Applicant Name: {a.User.firstName} {' '} {a.User.lastName}</Text>
    //   </View>
    //   <Text style={{fontSize: 16}}>Date of Application: {a.dateOfApplication}</Text>
    //   <Text style={{fontSize: 16}}>Contact No: {a.User.contactNumber}</Text>
    //   <Text></Text>
    //   </View>
    //   )
    //}

    // </View>
    // </ScrollView>
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
});
