import {FlatList, TouchableOpacity, View} from "react-native";
import {dayTimeToDisplayString, isAfterOrEquals, momentToDisplayString, wixDateToMoment} from "../utils/dayTime";
import _ from "lodash";
import React from "react";
import shortid from "shortid";
import Text from "./Text";
import Colors from "../constants/Colors";
import {marginStyle} from "../constants/Styles";
import Image from "./Image";
import localization from "../utils/localization";
import Icon from "./Icon";
import moment from "moment";

const NoItems = () =>
    <View style={{flex: 1, alignItems: 'center'}}>
        <Image name='beachAnimation' height={80} width={200}/>
        <Text bold size={12} color={Colors.pink}>{localization('addTreatmentPlan')}</Text>
        <Icon name='down' color={Colors.pink} scale={1.5}/>
    </View>;

const AgendaItem = ({dayTime, details, onEventPressed}) => (
    <View>
        <Text>
            {dayTimeToDisplayString(dayTime)} - {details.medication ? details.medication : details.checkup}
        </Text>
        <TouchableOpacity onPress={() => onEventPressed(details)}>
            <Text>
                Note: {details.note}
            </Text>
        </TouchableOpacity>
    </View>
);

export function AgendaDay({momentDate, events, onEventPressed}) {
    return <View>
        <Text size={7} color={Colors.gray} style={marginStyle(8, 'bottom')}>
            {momentToDisplayString(momentDate)}
        </Text>
        {
            !_.isEmpty(events) ?
                events.map(({dayTime, details}) =>
                    <AgendaItem
                        key={shortid.generate()}
                        dayTime={dayTime}
                        details={details}
                        onEventPressed={onEventPressed}
                    />)
                : <NoItems/>
        }
    </View>
}

export function Agenda({selectedDay, eventedDateMoments, agendaDayRender}) {
    return _.isEmpty(eventedDateMoments) ?
        <NoItems/> :
        <FlatList
            data={_.filter(eventedDateMoments, dateMoment =>
                isAfterOrEquals(dateMoment, moment()) || isAfterOrEquals(dateMoment, wixDateToMoment(selectedDay))
            )}
            renderItem={({item}) => agendaDayRender(item)}
            keyExtractor={item => item.toString()}
        />
}
