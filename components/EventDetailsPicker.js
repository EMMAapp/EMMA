import React from 'react'
import {Text, View, Switch} from 'react-native'
import localization from "../utils/localization";
import DayTimeInput from "./DayTimeInput";
import {dayTimeSubtract} from "../utils/dayTime";

export default ({eventAndReminder, setEventAndReminder, defaultRemindMinutes}) => {

    const {event, reminder, reminderDisabled} = eventAndReminder;

    const toggleReminder = (enabled) => {
        let reminder = enabled ? dayTimeSubtract(event, defaultRemindMinutes) : null;
        setEventAndReminder({...eventAndReminder, reminderDisabled: !enabled, reminder})
    };

    return (
        <View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{color: '#e93766', flex: 1}}>{localization('timeOfEvent')}</Text>
                <DayTimeInput
                    style={{flex: 1}}
                    dayTime={event}
                    setDayTime={dayTime => setEventAndReminder({...eventAndReminder, event: dayTime})}
                    disabled={false}
                />
                <Text style={{color: '#e93766', flex: 1}}>{localization('reminder')}</Text>
                <DayTimeInput
                    style={{flex: 1}}
                    dayTime={reminder}
                    setDayTime={dayTime => setEventAndReminder({...eventAndReminder, reminder: dayTime})}
                    disabled={reminderDisabled}
                />
                <Switch style={{flex: 1}}
                        value={!reminderDisabled}
                        onValueChange={(enabled) => toggleReminder(enabled)}
                />
            </View>
        </View>
    )
};
