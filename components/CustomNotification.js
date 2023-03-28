import { Text, View, Dimensions } from 'react-native'
import React from 'react'

const CustomNotification = () => {


    return (
        <View style={{ backgroundColor: "white", alignSelf: "flex-start", position: "absolute", bottom: 20, left: Dimensions.get("screen").width / 4, borderRadius: 10, width: 150 }}>
            <Text style={{ padding: 10, fontSize: 17, fontWeight: "bold", textAlign: "center" }}>Loading...</Text>
        </View>
    )
}

export default CustomNotification
