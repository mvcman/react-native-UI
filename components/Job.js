import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {theme} from './ThemeColor';

export default function Job({item, navigation}) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Job Details', {data: item})}>
      <View style={[styles.listItem, styles.shadow]}>
        <Image
          source={[{uri: `https://logo.clearbit.com/${item.companyName}.com`}]}
          style={{width: 60, height: 60, borderRadius: 50}}
        />
        <View style={{padding: 10, flex: 1}}>
          <Text style={{fontWeight: 'bold', fontSize: 22, color: theme.primary}}>{item.companyName}</Text>
          <Text style={{fontWeight: 'normal', fontSize: 18, color: theme.secondary}}>{item.jobTitle}</Text>
        </View>
        <TouchableOpacity
          style={{
            height: 50,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        ></TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
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
});
