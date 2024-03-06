/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';

const App = () => {
  return (
    <View style={styles.root}>
      <ImageBackground
        source={require('./assets/bg.jpg')}
        resizeMode="cover"
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  image:{
    flex: 1,
    flexDirection: 'column',
  }
});
export default App;
