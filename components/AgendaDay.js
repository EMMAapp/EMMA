import React, {useEffect, useState} from "react";
import {Animated, FlatList, Platform, View} from "react-native";
import {dayTimeToDisplayString, isAfterOrEquals, momentToDisplayString, wixDateToMoment} from "../utils/dayTime";
import _ from "lodash";
import shortid from "shortid";
import Text from "./Text";
import Colors from "../constants/Colors";
import {eventColor, marginStyle, paddingStyle} from "../constants/Styles";
import Image from "./Image";
import localization, {isRTL} from "../utils/localization";
import Icon from "./Icon";
import moment from "moment";
import Row from "./Row";
import Divider from "./Divider";
import IconButton from "./IconButton";

const NoItems = () => {
    const [marginTopAnimation] = useState(new Animated.Value(0));
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(
                    marginTopAnimation,
                    {
                        toValue: 10,
                        duration: 800
                    }
                ),
                Animated.timing(
                    marginTopAnimation,
                    {
                        toValue: 0,
                        duration: 800
                    }
                )
            ])
        ).start()
    }, []);

    return (<View style={{alignItems: 'center', height: '100%'}}>
        <Image name='beachAnimation' height={Platform.OS === 'ios' ? 80 : 60} width={200}/>
        <Text bold size={12} color={Colors.pink}>{localization('addTreatmentPlan')}</Text>
        {
            Platform.OS === 'ios' && <View style={{height: '20%'}}/>
        }
        <Animated.View style={[{marginTop: marginTopAnimation}, isRTL ? marginStyle(12, 'left') : {}]}>
            <Icon name='down' color={Colors.pink} scale={1.5} style={marginStyle(7, 'right')}/>
        </Animated.View>
    </View>)
};

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

export function AgendaDay({momentDate, events, onEventPressed, withPadding}) {
    return <View style={
        withPadding ? [
            paddingStyle(15),
            paddingStyle(2, 'top')
        ] : []
    }>
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
    const filteredEvents = _.filter(eventedDateMoments, dateMoment =>
        isAfterOrEquals(dateMoment, moment()) || isAfterOrEquals(dateMoment, wixDateToMoment(selectedDay))
    );
    return _.isEmpty(filteredEvents) ?
        <NoItems/> :
        <View>
            <View style={[
                paddingStyle(15),
                paddingStyle(2, 'top')
            ]}>
                <FlatList
                    data={filteredEvents}
                    renderItem={({item}) => agendaDayRender(item)}
                    keyExtractor={item => item.toString()}
                    ItemSeparatorComponent={() => <Divider/>}
                />
            </View>
            <Image name='motorcycle' height={140} width={'100%'} style={marginStyle(-30, 'top')}/>
        </View>
}
