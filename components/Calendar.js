import {Calendar} from "react-native-calendars";
import React from "react";

export default ({onDayPress, coloredDays}) => {

    let markedDates = {};
    coloredDays.forEach(day => {
        markedDates[day] = {color: 'pink', startingDay: true, endingDay: true};
    });
    console.log(markedDates);

    return <Calendar
        current={Date()}
        onDayPress={onDayPress}
        firstDay={0} // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
        markedDates={markedDates}
        markingType={'period'}
    />
}
