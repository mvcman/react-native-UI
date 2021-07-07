/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { Chip } from 'react-native-elements';
import { theme } from './ThemeColor';

export default function ChipComponent(props) {
  console.log(props.title);
  return (
    <View style={styles.main}>
      {props.title ? (
        <>
          {props.title.map(i => (
            <View style={{ margin: 3 }} key={i}>
              {/* <Chip title={i} key={i} type="outline" /> */}
              {/* <Text>Deo</Text> */}
              <View
                style={{
                  height: 30,
                  borderWidth: 1,
                  borderColor: theme.primary,
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 10,
                }}
              >
                <Text style={{ fontFamily: 'Roboto-Regular', color: theme.primary, fontSize: 14 }}>{i}</Text>
              </View>
            </View>
          ))}
        </>
      ) : (
        <View>
          <View style={{ height: 30, borderWidth: 1, borderColor: theme.primary, borderRadius: 10 }}>
            <Text style={{ fontFamily: 'Roboto-Regular', color: theme.primary, fontSize: 14 }}>No preference</Text>
          </View>
          {/* <Chip title="no preferences" type="outline" /> */}
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
