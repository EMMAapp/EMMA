import {Calendar} from "react-native-calendars";
import React, {useState} from "react";

export default ({onDayPress, coloredDays}) => {
    const [current, setCurrent] = useState(Date());

    let markedDates = {};
    coloredDays.forEach(day => {
        markedDates[day] = {color: 'pink', startingDay: true, endingDay: true};
    });

    return <Calendar
        current={current}
        onDayPress={day => {
            setCurrent(day.dateString);
            onDayPress(day);
        }}
        firstDay={0} // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
        markedDates={markedDates}
        markingType={'period'}
    />
}
