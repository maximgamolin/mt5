import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

import {Main} from './src';

function App(): JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Main />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default App;
