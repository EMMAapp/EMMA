import {Calendar} from "react-native-calendars";
import React, {useState} from "react";
import {Button, View} from "react-native";
import {addDays, momentToWixDate, wixDateToMoment} from "../../../utils/dayTime";
import moment from "moment";
import ProtocolPicker from "../../../components/PlanPicker";
import localization from "../../../utils/localization";

export default ({lastPeriod, setPeriod}) => {
    const [selectedProtocol, setSelectedProtocol] = useState(lastPeriod.protocol);
    const [selectedDate, setSelectedDate] = useState(momentToWixDate(moment()));
    const markedDates = {[selectedDate]: {color: 'pink', startingDay: true, endingDay: true}};

    return <View>
        <Calendar
            current={selectedDate}
            minDate={momentToWixDate(addDays(wixDateToMoment(lastPeriod.date), 1))}
            //maxDate={momentToWixDate(moment())}
            onDayPress={day => setSelectedDate(day.dateString)}
            markedDates={markedDates}
            markingType={'period'}
            firstDay={0} // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
        />
        <ProtocolPicker selectedProtocol={selectedProtocol} setSelectedProtocol={setSelectedProtocol}/>
        <Button title={localization('save')} color="#e93766" onPress={() => setPeriod({date: selectedDate, protocol: selectedProtocol})}/>
        <Button title={localization('cancel')} color="#e93766" onPress={() => setPeriod(null)}/>
    </View>
}
