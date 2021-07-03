import React from 'react';
import { View, Text, StyleSheet, MaskedViewComponent, Animated } from 'react-native';

export default function LoadingComponent() {
  const ColorLayer = () => <View style={[StyleSheet.absoluteFill, { backgroundColor: '#7f2309' }]} />;
  return (
    <View style={{ flex: 1 }}>
      <ColorLayer />
      <MaskedViewComponent
        style={{ flex: 1 }}
        maskElement={
          <View style={styles.centered}>
            <Animated.Image source={{ uri: '' }} style={{ width: 1000 }} resizeMode="contain"></Animated.Image>
          </View>
        }
      >
        <Animated.View style={styles.centered}>
          <Text>Your App goes here!</Text>
        </Animated.View>
      </MaskedViewComponent>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
