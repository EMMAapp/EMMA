import React, {useRef, useState} from "react";
import {StyleSheet, View, TouchableOpacity, Text} from "react-native";
import TimePicker from "react-native-24h-timepicker";

export default ({dayTime, setDayTime, disabled}) => {
    const timePickerRef = useRef(null);

    const onClose = () => {
        timePickerRef.current.close();
    };

    const onConfirm = (hour, minute) => {
        onClose();
        setDayTime({hour: hour, minute: minute});
    };

    return <View>
        <TouchableOpacity
            onPress={() => {
                if (disabled) {
                    return;
                }
                timePickerRef.current.open();
            }}
        >
            <Text>{disabled ? '-' : `${dayTime.hour}:${dayTime.minute}`}</Text>
        </TouchableOpacity>
        <TimePicker
            ref={timePickerRef}
            onCancel={onClose}
            onConfirm={onConfirm}
        />
    </View>
}
