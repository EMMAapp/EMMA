import {FlatList, Platform, View} from "react-native";
import {dayTimeToDisplayString, isAfterOrEquals, momentToDisplayString, wixDateToMoment} from "../utils/dayTime";
import _ from "lodash";
import React from "react";
import shortid from "shortid";
import Text from "./Text";
import Colors from "../constants/Colors";
import {eventColor, marginStyle} from "../constants/Styles";
import Image from "./Image";
import localization from "../utils/localization";
import Icon from "./Icon";
import moment from "moment";
import Row from "./Row";
import Divider from "./Divider";
import IconButton from "./IconButton";

const NoItems = () =>
    <View style={{flex: 1, alignItems: 'center'}}>
        <Image name='beachAnimation' height={Platform.OS === 'ios' ? 80 : 65} width={200}/>
        <Text bold size={12} color={Colors.pink}>{localization('addTreatmentPlan')}</Text>
        <Icon name='down' color={Colors.pink} scale={1.5} style={marginStyle(7, 'right')}/>
    </View>;

const AgendaItem = ({dayTime, details, onEventPressed, noDivider, disabled}) => {
    const AgendaItemBody = () => (
        <View>
            <Row>
                <Text color={eventColor(!!details.medication)}>
                    {dayTimeToDisplayString(dayTime)}
                </Text>
                <Text
                    color={eventColor(!!details.medication)}
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
                    <Text size={7} color={Colors.gray} style={marginStyle(2, 'top')}>
                        {details.note}
                    </Text>
                    : null
            }
        </View>
    );
    return disabled ? <AgendaItemBody/> :
        <View>
            <Row style={{minHeight: 37}}>
                <AgendaItemBody/>
                <View style={{flex: 1}}/>
                <IconButton name='edit' backgroundColor={Colors.purple} iconColor='white' onPress={() => onEventPressed(details)}/>
            </Row>
            {
                noDivider ? null : <Divider/>
            }
        </View>
};

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
                        disabled={!isAfterOrEquals(momentDate, moment.utc().startOf('day'))}
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
            <Image name='motorcycle' height={80} width={230} style={marginStyle(10, 'top')}/>
        </View>
}
