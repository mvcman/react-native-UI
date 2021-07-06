import React from 'react';
import { View, Text, StyleSheet, MaskedViewComponent, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ActivityIndicator } from 'react-native-paper';
import { theme } from './ThemeColor';

export default function LoadingComponent({ message }) {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={[theme.primary, '#B0D6FC']} style={styles.container}>
        <ActivityIndicator />
        <Text style={styles.text}>{message}</Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    color: '#fff',
  },
});
