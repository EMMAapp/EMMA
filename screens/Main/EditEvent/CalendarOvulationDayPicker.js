import {Calendar} from "react-native-calendars";
import React from "react";
import {addDays, momentToWixDate, wixDateToMoment} from "../../../utils/dayTime";
import Colors from "../../../constants/Colors";
import {borderRadiusStyle, calendarTheme, marginStyle} from "../../../constants/Styles";
import Text from "react-native-web/dist/exports/Text";

export default ({onDayPress, coloredDays}) => {

    const hackyMoment = wixDateToMoment('2016-05-01'); // month with 31 days and sunday the 1st :)

    let markedDates = {};
    coloredDays.forEach(day => {
        markedDates[momentToWixDate(addDays(hackyMoment, day - 1))]
            = {startingDay: true, endingDay: true, color: Colors.fuchsia, textColor: 'white'};
    });

    return <Calendar
        current={momentToWixDate(hackyMoment)}
        minDate={momentToWixDate(hackyMoment)}
        maxDate={momentToWixDate(addDays(hackyMoment, 30))}
        onDayPress={day => onDayPress(day.day)}
        firstDay={0}
        hideArrows={true}
        hideExtraDays={true}
        disableMonthChange={true}
        hideDayNames={true}
        markedDates={markedDates}
        markingType={'period'}
        monthFormat={''}
        style={[borderRadiusStyle(5), marginStyle(5, 'top'), {borderWidth: 1, borderColor: Colors.grayMedium}]}
        theme={{
            ...calendarTheme,
            textDayFontSize: 14,
            calendarBackground: Colors.grayLight,
            dayTextColor: Colors.pink,
            "stylesheet.calendar.header": {
                header: {
                    height: 0,
                    opacity: 0
                }
            },
            "stylesheet.day.period": {
                base: {
                    width: 38,
                    height: 24,
                    alignItems: 'center'
                },
            }
        }}
    />
}
