import {Calendar} from "react-native-calendars";
import React from "react";
import {momentToWixDate, wixDateToMoment} from "../utils/dayTime";

export default ({onDayPress, coloredDays}) => {

    let markedDates = {};
    coloredDays.forEach(day => {
        let momentDate = wixDateToMoment('2016-05-01');
        momentDate.add(day - 1, 'days');
        markedDates[momentToWixDate(momentDate)] = {color: 'pink', startingDay: true, endingDay: true};
    });

    return <Calendar
        current={'2016-05-01'}
        minDate={'2016-05-01'}
        maxDate={'2016-05-31'}
        onDayPress={day => onDayPress(day.day)}
        firstDay={0}
        hideArrows={true}
        hideExtraDays={true}
        disableMonthChange={true}
        hideDayNames={true}
        markedDates={markedDates}
        markingType={'period'}
        monthFormat={''}
    />
}
