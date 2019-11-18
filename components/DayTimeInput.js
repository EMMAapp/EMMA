import React, {useState} from "react";
import {View, TouchableOpacity, Text} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import localization from "../utils/localization";
import {dateToDayTime, dayTimeToDate, dayTimeToDisplayString} from "../utils/dayTime";

export default ({dayTime, setDayTime, disabled}) => {
    const [isVisible, setIsVisible] = useState(false);

    return <View>
        <TouchableOpacity
            onPress={() => {
                if (disabled) {
                    return;
                }
                setIsVisible(true);
            }}
        >
            <Text>{disabled ? '-' : dayTimeToDisplayString(dayTime)}</Text>
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
