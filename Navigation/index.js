import 'react-native-gesture-handler';
import React from 'react'
import Home from '../components/Home'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Search from '../components/Search'
import Octicons from "react-native-vector-icons/Octicons"
import Ionicons from "react-native-vector-icons/Ionicons"


const Drawer = createDrawerNavigator()

const NavContainer = () => {

    return (
        <NavigationContainer >
            <Drawer.Navigator screenOptions={{
                drawerType: "slide",
                headerStyle: {
                    backgroundColor: "#eee",
                },
                headerTitleAlign: "center",
                headerTitleStyle: {
                    fontSize: 20,
                    color: "black"
                },
                drawerActiveBackgroundColor: "lightblue",
                drawerActiveTintColor: "black",
            }}>
                <Drawer.Screen name='Home' component={Home}
                    options={{
                        drawerIcon: () => (
                            <Ionicons name='home' size={20} color="black"
                                style={{ marginLeft: 10 }}
                            />
                        )
                    }}
                />
                <Drawer.Screen name='Search' component={Search} options={{
                    title: "Weather in your city",
                    headerTitleStyle: {
                        fontSize: 20
                    },
                    drawerIcon: () => (
                        <Octicons name='search' size={20} color="black"
                            style={{ marginLeft: 10 }}
                        />
                    )
                }} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default NavContainer
