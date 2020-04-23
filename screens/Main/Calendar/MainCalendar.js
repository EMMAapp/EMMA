import React from 'react';
import {Calendar} from "react-native-calendars";
import Colors from "../../../constants/Colors";
import {pushByMapKey} from "../../../utils/utils";
import {calendarTheme, marginStyle} from "../../../constants/Styles";
import {calendarFirstDay} from "../../../store";

const selectedDayColoring = {selected: true, marked: true, selectedColor: Colors.purple};

export default function CalendarTab({
    selectedDay,
    setSelectedDay,
    markedDates,
    dayRender,
}) {

    const currentMarkedDates = {...markedDates};
    pushByMapKey(currentMarkedDates, selectedDay, selectedDayColoring);

    return (
        <Calendar
            style={[marginStyle(5, 'bottom')]}
            current={selectedDay}
            onDayPress={(day) => setSelectedDay(day.dateString)}
            markedDates={currentMarkedDates}
            monthFormat={'yyyy MM'}
            firstDay={calendarFirstDay()}
            dayComponent={dayRender}
            theme={{
                ...calendarTheme,
                'stylesheet.day.basic': {
                    visibleDot: {
                        opacity: 0
                    },
                },
                textMonthFontSize: 12,
                textDayHeaderFontSize: 12,
            }}
        />
    );
}
