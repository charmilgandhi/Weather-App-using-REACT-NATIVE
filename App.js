import React, {Component, useEffect, useState} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import * as Location from 'expo-location'
import { AppLoading } from 'expo'
import WeatherInfo from './components/WeatherInfo'
import UnitsPicker from './components/UnitsPicker'

const WEATHER_API_KEY = '93eda94547509b7f5439015421cd6fdf'
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'

export default function App() {
  const [errorMessage, setErrorMessage] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)
  const [unitsSystem, setUnitSystem] = useState('metric')

  useEffect(() => {
    load()
  }, [unitsSystem])

  async function load() {
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
        <View style = {styles.main}>
          <UnitsPicker unitsSystem = {unitsSystem} setUnitSystem = {setUnitSystem} />
          <WeatherInfo currentWeather = {currentWeather}/>
        </View>
      </View>
    )
   }
  else {
    return(
      <View style = {styles.container}>
        <Text>{errorMessage}</Text>
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
  },

  main: {
    justifyContent: 'center',
    flex: 1
  }
})
