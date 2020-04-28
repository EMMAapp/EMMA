import React, {useRef} from 'react';
import {Image} from 'react-native';
import {Calendar} from "react-native-calendars";
import {calendarTheme} from "../constants/Styles";
import {calendarFirstDay} from "../store";
import Swipe from "./Swipe";
import {isRTL} from "../utils/localization";

const rightImage =  require('react-native-calendars/src/calendar/img/next.png');
const leftImage =  require('react-native-calendars/src/calendar/img/previous.png');

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
    const calendarRef = useRef(null);
    return (
        <Swipe
            onLeft={() => calendarRef.current.addMonth(-1)}
            onRight={() => calendarRef.current.addMonth(1)}
        >
            <Calendar
                ref={calendarRef}
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
                renderArrow={direction =>
                    <Image
                        source={direction === 'right' ? (isRTL ? leftImage : rightImage) : (isRTL ? rightImage : leftImage)}
                        style={{tintColor: calendarTheme['arrowColor']}}
                    />
                }
            />
        </Swipe>
    );
}
