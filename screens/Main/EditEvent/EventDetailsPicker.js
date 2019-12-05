import React from 'react'
import {View} from 'react-native'
import localization from "../../../utils/localization";
import DayTimeInput from "../../../components/DayTimeInput";
import {dayTimeSubtract} from "../../../utils/dayTime";
import Text from "../../../components/Text";
import Checkbox from "../../../components/Checkbox";
import Row from "../../../components/Row";
import styled from "styled-components";
import Colors from "../../../constants/Colors";
import {borderRadiusStyle, marginStyle} from "../../../constants/Styles";

const StyledView = styled(View)`
background-color: ${Colors.grayLight};
border-color: ${Colors.grayMedium};
border-width: 1px;
justify-content: center;
align-items: center;
text-align: center;
`;

export default ({eventAndReminder, setEventAndReminder, defaultRemindMinutes, color}) => {

    const {event, reminder, reminderDisabled} = eventAndReminder;

    const toggleReminder = (enabled) => {
        let reminder = enabled ? dayTimeSubtract(event, defaultRemindMinutes) : null;
        setEventAndReminder({...eventAndReminder, reminderDisabled: !enabled, reminder})
    };

    return (
        <Row>
            <View>
                <Text>{localization('timeOfEvent')}</Text>
                <StyledView style={[borderRadiusStyle(5), marginStyle(2, 'top')]}>
                    <DayTimeInput
                        style={{flex: 1}}
                        dayTime={event}
                        setDayTime={dayTime => setEventAndReminder({...eventAndReminder, event: dayTime})}
                        disabled={false}
                    />
                </StyledView>
            </View>
            <View style={marginStyle(20, 'left')}>
                <Text>{localization('reminder')}</Text>
                <StyledView style={[borderRadiusStyle(5), marginStyle(2, 'top')]}>
                    <Row>
                        <DayTimeInput
                            dayTime={reminder}
                            setDayTime={dayTime => setEventAndReminder({...eventAndReminder, reminder: dayTime})}
                            disabled={reminderDisabled}
                        />
                        <Checkbox
                            color={color}
                            value={!reminderDisabled}
                            setValue={(enabled) => toggleReminder(enabled)}
                        />
                    </Row>
                </StyledView>
            </View>
        </Row>
    )
};
