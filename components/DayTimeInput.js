import React, {useRef, useState} from "react";
import {StyleSheet, View, TouchableOpacity, Text} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import localization from "../utils/localization";

export default ({dayTime, setDayTime, disabled}) => {
    const [isVisible, setIsVisible] = useState(false);

    const dayTimeToDate = (dt) => {
        if (!dt) {
            return Date.now();
        }
        let dateTime = new Date();
        dateTime.setHours(dt.hour);
        dateTime.setMinutes(dt.minute);
        dateTime.setSeconds(0);
        dateTime.setMilliseconds(0);
        return dateTime;
    };

    const dateToDayTime = (date) => {
        return {hour: date.getHours(), minute: date.getMinutes()};
    };

    const dayTimeToString = (dt) => {
        let {hour, minute} = dt;
        const suffix = hour <= 11 ? 'AM' : 'PM';
        hour = hour % 12;
        return `${hour <= 9 ? '0' + hour : hour}:${minute <= 9 ? '0' + minute : minute} ${suffix}`;
    };

    return <View>
        <TouchableOpacity
            onPress={() => {
                if (disabled) {
                    return;
                }
                setIsVisible(true);
            }}
        >
            <Text>{disabled ? '-' : dayTimeToString(dayTime)}</Text>
        </TouchableOpacity>
        <DateTimePicker
            mode='time'
            is24Hour={false}
            isVisible={isVisible}
            date={dayTimeToDate(dayTime)}
            onConfirm={date => {
                setIsVisible(false);
                setDayTime(dateToDayTime(date));
            }}
            onCancel={() => setIsVisible(false)}
            titleIOS={localization('pickTime')}
        />
    </View>;
}
