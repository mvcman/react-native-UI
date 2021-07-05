/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip } from 'react-native-elements';

export default function ChipComponent(props) {
  console.log(props.title);
  return (
    <View style={styles.main}>
      {props.title ? (
        <>
          {props.title.map(i => (
            <View style={{ margin: 3 }} key={i}>
              <Chip title={i} key={i} type="outline" />
            </View>
          ))}
        </>
      ) : (
        <View>
          <Chip title="no preferences" type="outline" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignContent: 'space-around',
  },
});
