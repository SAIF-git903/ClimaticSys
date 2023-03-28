import React from 'react'
import { Picker } from "@react-native-picker/picker"

const UnitPicker = (props) => {

    const { unit, setUnit } = props

    return (
        <Picker
            style={{ color: "white", width: 120 }}
            dropdownIconColor="white"
            dropdownIconRipple={{ radius: 30 }}
            selectedValue={unit}
            onValueChange={(item) => setUnit(item)}>
            <Picker.Item label='F' value="imperial" style={{ fontSize: 25 }} />
            <Picker.Item label="C" value="metric" style={{ fontSize: 25 }} />
        </Picker>
    )
}

export default UnitPicker