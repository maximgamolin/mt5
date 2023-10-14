import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import YaMap from 'react-native-yamap';
import {API_KEY} from './API/index';

YaMap.init(API_KEY);

export function Main() {
  return (
    <View style={styles.container}>
      <Text>Test123</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
