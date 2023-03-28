import { StyleSheet, Text, View, ActivityIndicator, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import Feather from "react-native-vector-icons/Feather"
import Fontisto from "react-native-vector-icons/Fontisto"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Ionicons from "react-native-vector-icons/Ionicons"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import LinearGradient from 'react-native-linear-gradient'

const Search = () => {

  const [show, setShow] = useState(false)
  const [currentData, setCurrentData] = useState([])
  const [searchText, setSearchText] = useState("")
  const [loading, setLoading] = useState(false)
  const [inputTxt, setInputTxt] = useState("")
  const [error, setError] = useState("")

  const fetchSearchedData = async () => {

    setLoading(true)
    const API_KEY = "0e964c6041950b0d404997cce53e1f3a";
    const current_weather_URL =
      `https://api.openweathermap.org/data/2.5/weather?q=${searchText}&appid=${API_KEY}&units=metric`


    const response = await fetch(current_weather_URL)
    const data = await response.json()

    if (!response.ok) {
      setError(`To make it more precise put the city's name, comma, 2-letter country code (ISO3166). You will get all proper cities in chosen country.The order is important - the first is city name then comma then country. Example - London, GB or New York, US.`)
      setLoading(false)
      setShow(false)
    } else {
      setInputTxt("")
      setError(false)
      setShow(true)
      setCurrentData(data)
      setLoading(false)
    }
  }

  const { name } = currentData

  return (
    <View>
      <StatusBar backgroundColor={"#eee"} barStyle="dark-content" />
      <View style={styles.textView}>
        <TextInput
          style={styles.textInput}
          placeholder='Search for Specific Region'
          placeholderTextColor="grey"
          defaultValue={inputTxt}
          onChangeText={(text) => {
            setSearchText(text)
          }}
          onSubmitEditing={() => fetchSearchedData()}
        />
        <Feather
          name='search'
          size={20}
          style={{ marginLeft: 15, marginTop: 10, position: "absolute" }} />
      </View>
      {loading && <ActivityIndicator size={"large"} animating={loading} />}
      {error && <View style={{ margin: 15 }}>
        {error && <Text style={{ fontSize: 19, fontWeight: "bold", marginBottom: 10 }}>Search engine is very flexible. How it works:</Text>}
        <Text >
          {error}
        </Text>
      </View>}
      <ScrollView>
        {show &&
          <View style={{ margin: 20 }}>
            <LinearGradient colors={["#6a5acd", "#e6a8d7"]} style={{
              alignSelf: "flex-start",
              paddingHorizontal: 10,
              paddingVertical: 16,
              borderRadius: 8,
            }}>
              <View style={{
                flexDirection: "row",
              }}>
                <Text style={styles.name}>{name}</Text>
                <Text style={{ color: "white" }}>{currentData?.sys?.country}</Text>
              </View>
            </LinearGradient>
            <View style={{ marginTop: 20 }}>
              <LinearGradient colors={["#e6a8d7", "#ACE1AF"]} style={{ marginRight: 10, padding: 20, borderRadius: 10 }}>
                <Text style={{ fontSize: 19, fontWeight: "500", color: "white" }}>{currentData.weather && currentData?.weather[0].main}</Text>
              </LinearGradient>
            </View>
            <LinearGradient colors={["#e6a8d7", "#ACE1AF"]}
              style={{ marginTop: 20, borderRadius: 10, }}>
              <View style={{
                padding: 30,
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
                <View>
                  <Text style={{ color: "white", marginBottom: 10 }}>Tempxerature </Text>
                  <Text style={styles.style_margin}>{currentData?.main?.temp}&#176;</Text>
                  <Ionicons name='md-thermometer-outline' size={20} color="white" />
                </View>
                <View>
                  <Text style={{ color: "white", marginBottom: 10 }}>Minimum Temperature </Text>
                  <Text style={styles.style_margin}>{currentData?.main?.temp_min}&#176;</Text>
                  <FontAwesome5 name='thermometer-quarter' size={20} color="white" />
                </View>
              </View>
            </LinearGradient>
            <LinearGradient colors={["#e6a8d7", "#ACE1AF"]}
              style={{
                marginTop: 20,
                borderRadius: 10
              }}
            >
              <View style={{
                padding: 30,
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
                {currentData?.wind?.gust && <View>
                  <Text style={styles.style_margin}>{currentData?.wind?.gust}</Text>
                  <Fontisto name='cloudy-gusts' size={20} color="white" />
                </View>}
                <View>
                  <Text style={styles.style_margin}>{currentData?.wind?.deg}</Text>
                  <MaterialCommunityIcons name='rotate-360' size={20} color="white" />
                </View>
                <View>
                  <Text style={styles.style_margin}>{currentData?.wind?.speed}km/h</Text>
                  <Feather name='wind' size={20} color="white" />
                </View>
              </View>
            </LinearGradient>
            <View style={{ height: 70 }}></View>
          </View>
        }
      </ScrollView>
    </View >
  )
}

export default Search


const styles = StyleSheet.create({
  name: {
    fontSize: 25,
    marginRight: 4,
    fontWeight: "bold",
    color: "white"
  },
  fontStyle: {
    color: "white",
    fontSize: 20,
    marginTop: 10
  },
  textView: {
    width: '90%',
    marginLeft: 20,
    marginTop: 15,
    flexDirection: "row"
  },
  textInput: {
    backgroundColor: '#D8D8D8',
    borderRadius: 25,
    paddingLeft: 20,
    height: 40,
    fontSize: 15,
    marginBottom: 15,
    width: "100%",
    paddingLeft: 45,
  },
  style_margin: {
    color: "white",
    marginBottom: 15
  },
})