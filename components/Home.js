import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Alert, Linking } from 'react-native'
import { StatusBar } from 'react-native'
import Feather from "react-native-vector-icons/Feather"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import moment from 'moment'
import LinearGradient from 'react-native-linear-gradient'
import UnitPicker from './UnitPicker'
import { useNavigation } from '@react-navigation/native'
import GetLocation from 'react-native-get-location'
import CustomNotification from './CustomNotification'


const Home = () => {

  //  * STATES 
  const [currentWeather, setcurrentWeather] = useState([])
  const [forecaseWeather, setForecaseWeather] = useState([])
  const [unit, setUnit] = useState("metric")
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const [loading, setLoading] = useState(false)
  const [componentLoading, setComponentLoading] = useState(true)

  const navigation = useNavigation()


  const handleCurrentWeather = () => {

    Linking.canOpenURL("gps")
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000
    })
      .then((location) => {
        setLongitude(location.longitude)
        setLatitude(location.latitude)
        console.log(location.latitude)
        console.log(location.longitude)
      })
      .catch((err) => {
        const { code, message } = err;

        console.warn(code, message);
        if (code === 'CANCELLED') {
          console.log('Location cancelled by user or by another request');
        }
        if (code === 'UNAVAILABLE') {
          // console.log('Please turn on location');
          Alert.alert("Please turn on location")
        }
        if (code === 'TIMEOUT') {
          console.log('Location request timed out');
        }
        if (code === 'UNAUTHORIZED') {
          console.log('Authorization denied');
        }
      })

    hourlyForecastData()
    fetchData()

  }


  const fetchData = async () => {
    setLoading(true)
    const API_KEY = "0e964c6041950b0d404997cce53e1f3a";

    if (latitude || longitude) {
      const current_weather_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${unit}`

      const response = await fetch(current_weather_URL)
      const data = await response.json()

      if (!response.ok) {
        console.log("something went wrong.")
      } else {
        setcurrentWeather(data)
      }
    } else {
      const current_weather_URL =
        `https://api.openweathermap.org/data/2.5/weather?q=islamabad&appid=${API_KEY}&units=${unit}`

      const response = await fetch(current_weather_URL)
      const data = await response.json()

      if (!response.ok) {
        console.log("SomeThing went Wrong...")
      } else {
        setcurrentWeather(data)
      }
    }
  }

  const hourlyForecastData = async () => {
    const API_KEY = "0e964c6041950b0d404997cce53e1f3a";

    if (latitude || longitude) {
      const forecast_weather_url =
        `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${unit}`

      const response = await fetch(forecast_weather_url)
      const data = await response.json()

      if (!response.ok) {
        console.log("SomeThing went Wrong...")
      } else {
        setComponentLoading(true)
        setLoading(false)
        setForecaseWeather(data.list)
        setComponentLoading(false)
      }
    } else {
      const forecast_weather_url =
        `http://api.openweathermap.org/data/2.5/forecast?q=islamabad&appid=${API_KEY}&units=${unit}`

      const response = await fetch(forecast_weather_url)
      const data = await response.json()

      console.log("hourly data not found")

      if (!response.ok) {
        console.log("SomeThing went Wrong...")
      } else {
        setComponentLoading(true)
        setLoading(false)
        setForecaseWeather(data.list)
        setComponentLoading(false)
      }
    }
  }

  useLayoutEffect(() => {
    fetchData()
    hourlyForecastData()
  }, [unit, latitude, longitude])


  const { main, weather } = currentWeather

  console.log(currentWeather)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => {
          fetchData()
          hourlyForecastData()
        }}>
          <MaterialIcons name='refresh' size={27} style={{ marginRight: 20 }} color="black" />
        </TouchableOpacity>
      )
    })
  }, [])


  return (
    <>
      <StatusBar backgroundColor={"#eee"} barStyle="dark-content" />
      {
        !componentLoading && <ScrollView>
          <View style={{ backgroundColor: "#eee", flex: 1, }}>
            <View style={styles.container}>
              <LinearGradient colors={["#6a5acd", "#e6a8d7"]}
                style={{
                  paddingHorizontal: 25,
                  paddingVertical: 10,
                  borderRadius: 30,
                }}>
                <Text style={styles.city_name}>{currentWeather?.name}</Text>
                <Text style={{ fontSize: 20, color: "white" }}>{currentWeather?.sys?.country}</Text>
                <View style={styles.icon}>
                  <Image
                    style={{ width: 150, height: 150, marginTop: 20 }}
                    source={{ uri: `http://openweathermap.org/img/wn/${weather && weather[0]?.icon}@2x.png` }}
                  />
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.current_weather_temp}>{currentWeather?.main?.temp}&#176;</Text>
                  <UnitPicker unit={unit} setUnit={setUnit} />
                </View>
                <Text style={styles.air_quality}>{weather && weather[0]?.main}</Text>
              </LinearGradient>
              <View style={styles.inline_detail}>
                <LinearGradient colors={["#9370db", "#e6a8d7"]} style={styles.flex}>
                  <Feather name='droplet' size={20} color="white" />
                  <Text style={styles.humidity}>{main?.humidity}%</Text>
                </LinearGradient>
                <LinearGradient colors={["#9370db", "#e6a8d7"]} style={styles.flex}>
                  <Feather name='wind' size={20} color="white" />
                  <Text style={styles.speed}>{currentWeather?.wind?.speed}km/h</Text>
                </LinearGradient>
                <LinearGradient colors={["#9370db", "#e6a8d7"]} style={styles.flex}>
                  <FontAwesome5 name='temperature-low' size={20} color="white" />
                  <Text style={styles.feels_like}>{currentWeather?.main?.feels_like}</Text>
                </LinearGradient>
              </View>
            </View>
            <View style={styles.next_days}>
              <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 10, color: "black" }}>Weather Forecast</Text>
              <ScrollView style={{ marginTop: 10, backgroundColor: "#eee", }} horizontal={true} showsHorizontalScrollIndicator={false}>
                {
                  forecaseWeather.map((weather, index) => (
                    <LinearGradient colors={["#e6a8d7", "#ACE1AF"]} style={styles.horizontal_scrollView} key={index}>
                      <Text style={styles.forecast_date}>{moment(weather?.dt_txt).format("dddd")}</Text>
                      <Text style={styles.forecast_temp}>{weather?.main?.temp}&#176;</Text>
                      <View>
                        <Image
                          style={{ width: 70, height: 70, }}
                          source={{ uri: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` }}
                        />
                      </View>
                      <Text style={styles.forecast_time}>{moment(weather?.dt_txt).format("h A")}</Text>
                    </LinearGradient>
                  ))
                }
              </ScrollView>
              <View style={{ height: 10 }}></View>
            </View>
            {loading && <CustomNotification />}
          </View>
        </ScrollView>
      }
      <TouchableOpacity style={styles.current_location} onPress={() => handleCurrentWeather()}>
        <MaterialIcons name='my-location' size={35} color="black" />
      </TouchableOpacity>
    </>
  )
}

export default Home


const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 10,
  },
  city_name: {
    fontSize: 25,
    fontWeight: "600",
    color: "#FAF9F6",
    marginTop: 13
  },
  icon: {
    position: "absolute",
    right: 30,
    width: 100,
    height: 100,
    top: -30
  },
  current_weather_temp: {
    fontSize: 50,
    fontWeight: "600",
    marginTop: 10,
    color: "white"
  },
  inline_detail: {
    marginTop: 50,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  humidity: {
    marginLeft: 5,
    fontWeight: "600",
    color: "white",
    paddingHorizontal: 5,
  },
  speed: {
    marginLeft: 5,
    fontWeight: "600",
    color: "white",
    paddingHorizontal: 5,
  },
  feels_like: {
    marginLeft: 5,
    fontWeight: "600",
    color: "white",
    paddingHorizontal: 5,
  },
  flex: {
    flexDirection: "row",
    paddingVertical: 7,
    paddingHorizontal: 8,
    borderRadius: 15,
  },
  next_days: {
    marginTop: 25,
    marginHorizontal: 8,
  },
  forecast_date: {
    fontSize: 15,
    marginTop: 10,
  },
  forecast_time: {
    marginBottom: 20,
  },
  forecast_temp: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20
  },
  air_quality: {
    fontSize: 16,
    color: "white",
    fontWeight: "500",
    marginTop: 10,
    marginBottom: 15
  },
  horizontal_scrollView: {
    marginLeft: 5,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,

    borderRadius: 15,
  },
  current_location: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    bottom: 20,
    right: 30,
    padding: 10,
    position: "absolute",
    borderRadius: 20
  },
})
