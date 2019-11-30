import {FlatList, TouchableOpacity, View} from "react-native";
import {dayTimeToDisplayString, isAfterOrEquals, momentToDisplayString, wixDateToMoment} from "../utils/dayTime";
import _ from "lodash";
import React from "react";
import shortid from "shortid";
import Text from "./Text";
import Colors from "../constants/Colors";
import {marginStyle, absoluteStyle} from "../constants/Styles";
import Image from "./Image";
import localization from "../utils/localization";
import Icon from "./Icon";
import moment from "moment";
import Row from "./Row";
import Divider from "./Divider";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import IconCircle from "./IconCircle";

const eventColor = (event) => event.medication ? Colors.turquoise : Colors.fuchsia;

const NoItems = () =>
    <View style={{flex: 1, alignItems: 'center'}}>
        <Image name='beachAnimation' height={80} width={200}/>
        <Text bold size={12} color={Colors.pink}>{localization('addTreatmentPlan')}</Text>
        <Icon name='down' color={Colors.pink} scale={1.5}/>
    </View>;

const AgendaItemButtons = () =>
    <Row>
        <IconCircle name='calendar' backgroundColor={Colors.purple} iconColor='white'/>
        <IconCircle name='edit' backgroundColor={Colors.purple} iconColor='white'/>
    </Row>;

const AgendaItem = ({dayTime, details, onEventPressed, noDivider}) => (
    <View>
        <Swipeable renderRightActions={() => <AgendaItemButtons/>}>
            <Row style={{minHeight: 35}}>
                <View>
                    <Row>
                        <Text color={eventColor(details)}>
                            {dayTimeToDisplayString(dayTime)}
                        </Text>
                        <Text
                            color={eventColor(details)}
                            size={9}
                            style={[marginStyle(5, 'right'), marginStyle(5, 'left')]}>
                            •
                        </Text>
                        <Text bold>
                            {details.medication ? details.medication : details.checkup}
                        </Text>
                    </Row>
                    {
                        details.note ?
                            <TouchableOpacity onPress={() => onEventPressed(details)}>
                                <Text size={7} color={Colors.gray} style={marginStyle(2, 'top')}>
                                    {details.note}
                                </Text>
                            </TouchableOpacity>
                            : null
                    }
                </View>
                <View style={[absoluteStyle(175, 0), {opacity: 0.5}]}>
                    <Icon name='right' color={Colors.gray}/>
                </View>
            </Row>
        </Swipeable>

        {
            noDivider ? null : <Divider/>
        }
    </View>
);

export function AgendaDay({momentDate, events, onEventPressed}) {
    return <View>
        <Text size={7} color={Colors.gray} style={marginStyle(8, 'bottom')}>
            {momentToDisplayString(momentDate)}
        </Text>
        {
            !_.isEmpty(events) ?
                events.map(({dayTime, details}, i) =>
                    <AgendaItem
                        key={shortid.generate()}
                        dayTime={dayTime}
                        details={details}
                        onEventPressed={onEventPressed}
                        noDivider={i === events.length - 1}
                    />)
                : <NoItems/>
        }
    </View>
}

export function Agenda({selectedDay, eventedDateMoments, agendaDayRender}) {
    return _.isEmpty(eventedDateMoments) ?
        <NoItems/> :
        <View>
            <FlatList
                data={_.filter(eventedDateMoments, dateMoment =>
                    isAfterOrEquals(dateMoment, moment()) || isAfterOrEquals(dateMoment, wixDateToMoment(selectedDay))
                )}
                renderItem={({item}) => agendaDayRender(item)}
                keyExtractor={item => item.toString()}
                ItemSeparatorComponent={() => <Divider/>}
            />
            <Image name='motorcycle' height={80} width={200} style={marginStyle(10, 'top')}/>
        </View>
}
