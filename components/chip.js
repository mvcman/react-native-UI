/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
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
              {/* <Text>Deo</Text> */}
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

const { width } = Dimensions.get('screen');
const styles = StyleSheet.create({
  main: {
    width: width,
    // flex: 1,
    // backgroundColor: 'black',
    // display: 'flex',
    // flexWrap: 'wrap',
    // justifyContent: 'space-around',
    // alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexGrow: 1,
  },
});
