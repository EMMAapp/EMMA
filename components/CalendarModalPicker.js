import {Calendar} from "react-native-calendars";
import React from "react";
import Modal from "react-native-modal";
import {StyleSheet, View} from "react-native";

export default ({isVisible, onDayPress}) => {
    return <Modal isVisible={isVisible}>
        <View style={styles.content}>
            <Calendar
                current={Date()}
                onDayPress={day => onDayPress(day.dateString)}
                firstDay={0} // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
            />
        </View>
    </Modal>
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    }
});
