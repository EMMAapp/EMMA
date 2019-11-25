import React, {useState} from "react";
import {View, Text, Switch, TouchableOpacity} from "react-native";
import localization from "../utils/localization";
import _ from 'lodash'
import {addOrRemove} from "../utils/utils";
import shortid from 'shortid';

export default ({dismiss, potentialSyncEvents, syncEventsWithNewPeriod}) => {
    const [eventIdsToSync, setEventIdsToSync] = useState([]);

    const row = (title, enabled, onToggle) => (
        <View key={shortid.generate()} style={{flexDirection: 'row'}}>
            <Text>{title}</Text>
            <Switch style={{flex: 1}}
                    value={enabled}
                    onValueChange={(enabled) => onToggle(enabled)}
            />
        </View>
    );

    const eventRowTitle = (potential) => {
        const eventName = potential.event.checkup ? potential.event.checkup : potential.event.medication;
        if (potential.count === 0) {
            return eventName;
        }
        return `${eventName} - ${potential.count} ${localization('eventsCountSuffix')}`
    };

    const toggleAll = (enabled) => {
        if (enabled) {
            setEventIdsToSync(potentialSyncEvents.map(potential => potential.event.id));
        } else {
            setEventIdsToSync([]);
        }
    };

    const toggleEvent = (event) => {
        setEventIdsToSync(addOrRemove(eventIdsToSync, event.id));
    };

    return <View>
        <Text>{localization('syncEventsTitle')}</Text>
        <Text>{localization('syncEventsSubTitle')}</Text>
        {
            potentialSyncEvents.length > 1 ?
                row(localization('selectAllEvents'), eventIdsToSync.length === potentialSyncEvents.length, toggleAll)
                : null
        }
        {
            potentialSyncEvents.map(potential =>
                row(eventRowTitle(potential), _.includes(eventIdsToSync, potential.event.id), () => toggleEvent(potential.event))
            )
        }
        <TouchableOpacity onPress={async () => {
            dismiss();
            await syncEventsWithNewPeriod(eventIdsToSync);
        }}>
            <Text>{localization('sync')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dismiss()}>
            <Text>{localization('cancel')}</Text>
        </TouchableOpacity>
        <Text>{localization('syncEventsNote')}</Text>
    </View>
}
