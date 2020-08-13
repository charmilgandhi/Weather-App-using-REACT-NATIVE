import React from 'react'
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native'
import {colors} from '../utils/index'
import { Shadow } from 'react-native-neomorph-shadows';
import { NeomorphBlur } from 'react-native-neomorph-shadows';


const {PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR} = colors


export default function WeatherInfo({currentWeather}) {
    const {main: {temp},
            weather: [details],
            name} = currentWeather

    const {icon, main, description} = details
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`
    return (
        <View style = {{...styles.weatherInfo,  borderWidth: 2, borderColor: BORDER_COLOR}}>
            <Text style = {{fontWeight:'800', fontSize: 20, color: SECONDARY_COLOR, marginTop: 20}}>{name}</Text>
            <Image style = {styles.weatherIcon}  source = {{uri: iconUrl}} />
            <Text style = {styles.textPrimary}>{temp}°</Text>
            <Text style = {styles.weatherDescription}>{description}</Text>
            <Text style = {styles.textSecondary}>{main}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    weatherInfo: {
        alignItems: 'center',
        width: 300,
        height: 300,
        marginLeft: 30,
        marginTop: 20,
        borderRadius: 200,
        backgroundColor: rgb(168,202,247),
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 50.00,

        elevation: 50,
    },

    weatherDescription: {
        textTransform: 'capitalize',
    },

    weatherIcon: {
        width: 100,
        height: 100
    },

    textPrimary: {
        fontSize: 40,
        color: PRIMARY_COLOR,
    },

    textSecondary: {
        fontSize: 20,
        color: SECONDARY_COLOR,
        fontWeight: '500',
        marginTop: 10
    },
})