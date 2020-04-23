import {Calendar} from "react-native-calendars";
import React, {useState} from "react";
import {borderRadiusStyle, calendarTheme, marginStyle} from "../../../constants/Styles";
import Colors from "../../../constants/Colors";
import {calendarFirstDay} from "../../../store";

export default ({onDayPress, coloredDays}) => {
    const [current, setCurrent] = useState(Date());

    let markedDates = {};
    coloredDays.forEach(day => {
        markedDates[day] = {startingDay: true, endingDay: true, color: Colors.turquoise, textColor: 'white'};
    });

    return <Calendar
        current={current}
        onDayPress={day => {
            setCurrent(day.dateString);
            onDayPress(day);
        }}
        firstDay={calendarFirstDay()}
        markedDates={markedDates}
        markingType={'period'}
        style={[borderRadiusStyle(5), marginStyle(5, 'top'), {borderWidth: 1, borderColor: Colors.grayMedium}]}
        theme={{
            ...calendarTheme,
            calendarBackground: Colors.grayLight,
            todayTextColor: Colors.turquoise,
            arrowColor: Colors.turquoise,
            textDayFontSize: 14,
            textMonthFontSize: 12,
            textDayHeaderFontSize: 12
        }}
    />
}
