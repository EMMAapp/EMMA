import React from 'react';
import {Calendar} from "react-native-calendars";
import {calendarTheme} from "../constants/Styles";
import {calendarFirstDay} from "../store";

export default ({
    current,
    onDayPress,
    style,
    markedDates,
    markingType,
    dayRender,
    theme,
    minDate,
    maxDate
}) => {
    return (
        <Calendar
            style={style}
            current={current}
            onDayPress={onDayPress}
            markedDates={markedDates}
            markingType={markingType}
            firstDay={calendarFirstDay()}
            dayComponent={dayRender}
            minDate={minDate}
            maxDate={maxDate}
            theme={{
                ...calendarTheme,
                ...theme
            }}
        />
    );
}
