import React from 'react'
import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import {colors} from '../utils/index'
import {FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons'

const {PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR} = colors


export default function WeatherDetails({currentWeather, unitsSystem}) {
    const {
        main: {feels_like, humidity, pressure}, 
        wind: {speed},
    } = currentWeather

    const windSpeed = unitsSystem == 'metric' ? `${Math.round(speed)} m/s` : `${Math.round(speed)} miles/hr` 

    return (
        <View style = {styles.weatherDetails}>
            <View style = {styles.weatherDetailsRow}>
                <View style = {{...styles.weatherDetailsBox, borderRightWidth: 2, borderRightColor: BORDER_COLOR}}>
                    <View style = {styles.weatherDetailsRow}>
                        <FontAwesome5 name="temperature-low" size={25} color={PRIMARY_COLOR} />
                        <View style = {styles.weatherDetailsItems}>
                            <Text>Feels like: </Text>
                            <Text style = {styles.textSecondary}>{feels_like}°</Text>
                        </View>
                    </View>
                </View>
                <View style = {styles.weatherDetailsBox}>
                    <View style = {styles.weatherDetailsRow}>
                        <MaterialCommunityIcons name="water" size={30} color={PRIMARY_COLOR} />
                        <View style = {styles.weatherDetailsItems}>
                            <Text>Humidity: </Text>
                            <Text style = {styles.textSecondary}>{humidity}%</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style = {{...styles.weatherDetailsRow, borderTopWidth: 2, borderTopColor: BORDER_COLOR}}>
                <View style = {{...styles.weatherDetailsBox, borderRightWidth: 2, borderRightColor: BORDER_COLOR}}>
                    <View style = {styles.weatherDetailsRow}>
                        <MaterialCommunityIcons name="weather-windy" size={30} color={PRIMARY_COLOR} />
                        <View style = {styles.weatherDetailsItems}>
                            <Text>Wind Speed: </Text>
                            <Text style = {styles.textSecondary}>{windSpeed}</Text>
                        </View>
                    </View>
                </View>
                <View style = {styles.weatherDetailsBox}>
                    <View style = {styles.weatherDetailsRow}>
                        <MaterialCommunityIcons name="speedometer" size={30} color={PRIMARY_COLOR} />
                        <View style = {styles.weatherDetailsItems}>
                            <Text>Pressure: </Text>
                            <Text style = {styles.textSecondary}>{pressure} hPa</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    weatherDetails: {
        marginTop: 'auto',
        margin: 15,
        borderWidth: 2,
        borderColor: BORDER_COLOR,
        borderRadius: 50,
        backgroundColor: rgb(0,0,0),
        shadowColor: "#000",
        shadowOffset: {
	    width: 0,
	    height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 50.00,

    elevation: 50,
    },

    weatherDetailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    weatherDetailsBox: {
        flex: 1,
        padding: 20,
        backgroundColor: rgb(0,255,154),
        borderRadius: 50
    },

    weatherDetailsItems: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },

    textSecondary: {
        fontSize: 15,
        color: SECONDARY_COLOR,
        fontWeight: '700',
        margin: 7,
    }
})
