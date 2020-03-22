import React, {useState} from "react";
import styled from 'styled-components'
import {TouchableOpacity, View} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import localization from "../utils/localization";
import {dateToDayTime, dayTimeToDate, dayTimeToDisplayString} from "../utils/dayTime";
import Colors from "../constants/Colors";
import {hwStyle} from "../constants/Styles";
import Text from "./Text";

const StyledView = styled(View)`
justify-content: center;
align-items: center;
text-align: center;
`;

export default ({dayTime, setDayTime, disabled}) => {
    const [isVisible, setIsVisible] = useState(false);

    return <StyledView style={hwStyle(25, 60)}>
        <TouchableOpacity
            onPress={() => {
                if (disabled) {
                    return;
                }
                setIsVisible(true);
            }}
        >
            <Text bold color={disabled ? Colors.grayMedium : Colors.grayDark}>{dayTimeToDisplayString(dayTime)}</Text>
        </TouchableOpacity>
        <DateTimePicker
            mode='time'
            display='spinner'
            is24Hour={false}
            isVisible={isVisible}
            date={dayTimeToDate(dayTime)}
            onConfirm={date => {
                setIsVisible(false);
                setDayTime(dateToDayTime(date));
            }}
            onCancel={() => setIsVisible(false)}
            headerTextIOS={localization('pickTime')}
            cancelTextIOS={localization('cancel')}
            confirmTextIOS={localization('confirm')}
            titleStyle={{fontSize: 16, color: Colors.purple, fontFamily: 'sf-pro-regular'}}
        />
    </StyledView>;
}
