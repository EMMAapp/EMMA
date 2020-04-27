import React, {useState} from "react";
import {View} from "react-native";
import {addDays, momentToWixDate, wixDateToMoment} from "../../../utils/dayTime";
import moment from "moment";
import localization from "../../../utils/localization";
import {calendarTheme, marginStyle, paddingStyle} from "../../../constants/Styles";
import Text from "../../../components/Text";
import Colors from "../../../constants/Colors";
import ButtonPrimary from "../../../components/ButtonPrimary";
import Button from "../../../components/Button";
import Row from "../../../components/Row";
import Calendar from "../../../components/Calendar";

const QuestionText = (props) =>
    <Text
        style={[paddingStyle(15, 'top'), paddingStyle(5, 'bottom')]}
        {...props}>
        {props.children}
    </Text>;

export default ({lastPeriod, setPeriod}) => {
    const [selectedDate, setSelectedDate] = useState(momentToWixDate(moment()));
    const markedDates = {[selectedDate]: {startingDay: true, endingDay: true, color: Colors.purple, textColor: 'white'}};

    return <View>
        <QuestionText>{localization('lastPeriod')}</QuestionText>
        <Calendar
            current={selectedDate}
            minDate={momentToWixDate(addDays(wixDateToMoment(lastPeriod.date), 1))}
            maxDate={momentToWixDate(moment())}
            onDayPress={day => setSelectedDate(day.dateString)}
            markedDates={markedDates}
            markingType={'period'}
            theme={calendarTheme}
        />
        <Row center>
            <ButtonPrimary
                style={[marginStyle(5, 'top')]}
                onPress={() => setPeriod({date: selectedDate})}>
                {localization('save')}
            </ButtonPrimary>
        </Row>
        <Row center>
            <Button
                style={[marginStyle(5, 'top')]}
                onPress={() => setPeriod(null)}>
                {localization('cancel')}
            </Button>
        </Row>
    </View>
}
