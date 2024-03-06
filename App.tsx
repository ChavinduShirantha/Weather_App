/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import axios from 'axios';

const App = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
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
    })
      .then(res => {
        console.log(res.data);
        setData(res.data);
      })
      .catch(e => {
        console.dir(e);
      })
      .finally(() => setLoading(false));
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
        {data && (
          <View style={styles.infoView}>
            <Text
              style={
                styles.cityCountryText
              }>{`${data?.name}, ${data?.sys?.country}`}</Text>
            <Text style={styles.dateText}>{new Date().toDateString()}</Text>
            <Text style={styles.tempText}>{`${Math.round(
              data?.main?.temp,
            )} °C`}</Text>
            <Text style={styles.minMaxText}>{`Min ${Math.round(
              data?.main?.temp_min,
            )} °C  / Max ${Math.round(data?.main?.temp_max)} °C`}</Text>
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
  infoView: {
    alignItems: 'center',
  },
  cityCountryText: {
    color: '#49494d',
    fontSize: 40,
    fontWeight: 'bold',
  },
  dateText: {
    color: '#49494d',
    fontSize: 22,
    marginVertical: 10,
  },
  tempText: {
    color: '#49494d',
    fontSize: 45,
    marginVertical: 10,
  },
  minMaxText: {
    color: '#49494d',
    fontSize: 22,
    marginVertical: 10,
    fontWeight: '500',
  },
});

export default App;
