/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useCallback, useState } from "react";
import { ActivityIndicator, ImageBackground, StyleSheet, TextInput, View } from "react-native";

import axios from "axios";
const App = () => {
  const [input,setInput] = useState('');
  const [loading,setLoading] = useState(false);
  const [data,setData] = useState([]);
  const api = {
    key: '9a2e8ebb42f78cbc76941ac42dc13e9b',
    baseUrl: 'https://openweathermap.org/data/2.5',
  };
  const fetchDataHandler = useCallback(() => {
    setLoading(true);
    setInput('');
    axios({
      method: 'GET',
      url: `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${api.key}&units=metric`,
    }).then(res => {
      console.log(res.data);
    });
  }, [api.key, input]);
  return (
    <View style={styles.root}>
      <ImageBackground
        source={require('./assets/bg.jpg')}
        resizeMode="cover"
        style={styles.image}>
        <View>
          <TextInput
            placeholder="Enter Location here ..."
            onChangeText={text => setInput(text)}
            value={input}
            placeholderTextColor={'#000'}
            style={styles.textInput}
            onSubmitEditing={fetchDataHandler}
          />
        </View>
        {loading && (
          <View>
            <ActivityIndicator size="large" color="#000" />
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  image: {
    flex: 1,
    flexDirection: 'column',
  },
  textInput: {
    borderBottomWidth: 4,
    padding: 10,
    paddingVertical: 20,
    marginVertical: 100,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 16,
    borderRadius: 15,
    borderBottomColor: 'rgb(0,69,162)',
  },
});

export default App;
