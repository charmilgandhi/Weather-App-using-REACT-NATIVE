import React, {Component, useEffect, useState} from 'react'
import {View, Text, StyleSheet, ActivityIndicator, ImageBackground, Image} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import * as Location from 'expo-location'
import { AppLoading } from 'expo'
import WeatherInfo from './components/WeatherInfo'
import UnitsPicker from './components/UnitsPicker'
import {colors} from './utils/index'
import ReloadIcon from './components/ReloadIcon'
import WeatherDetails from './components/WeatherDetails'
//import {WEATHER_API_KEY} from 'react-native-dotenv'


const WEATHER_API_KEY = '93eda94547509b7f5439015421cd6fdf'
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'
const image = { uri: "C:\Users\DELL\Desktop\Programming\ReactNative\WeatherApp-Using-REACT-NATIVE\bg.jpg" };


export default function App() {
  const [errorMessage, setErrorMessage] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)
  const [unitsSystem, setUnitSystem] = useState('metric')

  useEffect(() => {
    load()
  }, [unitsSystem])

  async function load() {
    setCurrentWeather(null)
    setErrorMessage(null)
    try {
      let { status } = await Location.requestPermissionsAsync()
      if(status != 'granted') {
        setErrorMessage('Access to location is needed to run this App.')
        return
      }
      const location = await Location.getCurrentPositionAsync()
      const {latitude, longitude} = location.coords
      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`
      const response = await fetch(weatherUrl)
      const result = await response.json()
      
      if (response.ok) {
        setCurrentWeather(result)
      }
      else {
        setErrorMessage(result.message)
      }

    } catch (error) {
      setErrorMessage(errorMessage)
    }
  }
  
  if (currentWeather) {
    return(
        <View style = {styles.container}>
          <StatusBar style = "auto" />
          <ImageBackground source={image} style={styles.backgroundImage}>
          <View style = {styles.main}>
            <UnitsPicker unitsSystem = {unitsSystem} setUnitSystem = {setUnitSystem} />
            <ReloadIcon load={load}  />
            <WeatherInfo currentWeather = {currentWeather}/>
          </View>
          <View>
            <WeatherDetails currentWeather = {currentWeather} unitsSystem = {unitsSystem} />
          </View>
          </ImageBackground>
        </View>
    )
  }
  else if (errorMessage){
    return(
      <View style = {styles.container}>
        <ReloadIcon load={load} />
        <Text style = {{textAlign: 'center'}}>{errorMessage}</Text>
        <StatusBar style = "auto" />
      </View>
    )
  }
  else {
    return(
      <View style = {styles.container}>
        <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
        <StatusBar style = "auto" />
      </View>
    )
  }
}

const styles  = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    backgroundColor: rgb(188,188,188),
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 50.00,

    elevation: 50,
  },

  main: {
    justifyContent: 'center',
    flex: 1
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  }
})
