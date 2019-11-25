import {Calendar} from "react-native-calendars";
import React from "react";
import Modal from "./Modal";
import Colors from "../constants/Colors";

export default ({isVisible, onDayPress}) => {
    return <Modal isVisible={isVisible} onBackdropPress={() => onDayPress(null)}>
        <Calendar
            current={Date()}
            maxDate={Date()}
            onDayPress={day => onDayPress(day.dateString)}
            firstDay={0} // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
            theme={{
                todayTextColor: Colors.purple,
                arrowColor: Colors.purple,
            }}
        />
    </Modal>
}
