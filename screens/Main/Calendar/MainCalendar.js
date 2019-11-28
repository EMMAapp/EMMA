import React from 'react';
import {Calendar} from "react-native-calendars";
import Colors from "../../../constants/Colors";
import {pushByMapKey} from "../../../utils/utils";
import {calendarTheme} from "../../../constants/Styles";
import {marginStyle} from "../../../constants/Styles";

const selectedDayColoring = {selected: true, marked: true, selectedColor: Colors.purple};

export default function CalendarTab({
    selectedDay,
    setSelectedDay,
    markedDates,
    dayRender,
    clearDayFromCache
}) {

    const currentMarkedDates = {...markedDates};
    pushByMapKey(currentMarkedDates, selectedDay, selectedDayColoring);


    return (
        <Calendar
            style={[marginStyle(10, 'top'), marginStyle(10, 'bottom')]}
            current={selectedDay}
            onDayPress={(day) => {
                clearDayFromCache(selectedDay);
                clearDayFromCache(day.dateString);
                setSelectedDay(day.dateString);
            }}
            markedDates={currentMarkedDates}
            markingType={'multi-dot'}
            monthFormat={'yyyy MM'}
            firstDay={0} // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
            dayComponent={dayRender}
            theme={calendarTheme}
        />
    );
}