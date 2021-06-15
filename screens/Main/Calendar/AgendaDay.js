import React, {useEffect, useState} from "react";
import {Animated, Platform, View} from "react-native";
import {addDays, dayTimeToDisplayString, isInFuture, momentToDisplayString} from "../../../utils/dayTime";
import _ from "lodash";
import shortid from "shortid";
import Text from "../../../components/Text";
import Colors from "../../../constants/Colors";
import {eventColor, marginStyle, paddingStyle} from "../../../constants/Styles";
import Image from "../../../components/Image";
import localization, {isRTL} from "../../../utils/localization";
import Icon from "../../../components/Icon";
import Row from "../../../components/Row";
import Divider from "../../../components/Divider";
import IconButton from "../../../components/IconButton";
import {medicationsService} from "../../../constants/Medications";
import {checkupsService} from "../../../constants/Checkups";
import BloodTestResults from "../../../components/BloodTestResults";
import UltrasoundResults from "../../../components/UltrasoundResults";
import store, {syncPatientData} from "../../../store";

const ANIMATION_USE_NATIVE_DRIVER = false;

const NoItems = () => {
    const [marginTopAnimation] = useState(new Animated.Value(0));
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(
                    marginTopAnimation,
                    {
                        toValue: 10,
                        duration: 800,
                        useNativeDriver: ANIMATION_USE_NATIVE_DRIVER
                    }
                ),
                Animated.timing(
                    marginTopAnimation,
                    {
                        toValue: 0,
                        duration: 800,
                        useNativeDriver: ANIMATION_USE_NATIVE_DRIVER
                    }
                )
            ]),
            {useNativeDriver: ANIMATION_USE_NATIVE_DRIVER}
        ).start()
    }, []);

    return (<View style={{alignItems: 'center', height: '100%'}}>
        <Image name='beachAnimation' height={Platform.OS === 'ios' ? 70 : 60} width={200}/>
        <Text bold size={12} color={Colors.pink}>{localization('addTreatmentPlan')}</Text>
        {
            Platform.OS === 'ios' && <View style={{height: '20%'}}/>
        }
        <Animated.View style={[{marginTop: marginTopAnimation}, isRTL ? marginStyle(12, 'left') : {}]}>
            <Icon name='down' color={Colors.pink} scale={1.5} style={marginStyle(7, 'right')}/>
        </Animated.View>
    </View>)
};

const hasResultsDropdown = (details) => details.checkup && (details.checkup === "bloodTest" || details.checkup === "ultrasound");

const AgendaItem = ({dayTime, details, onEventPressed, noDivider, momentDate, setIsLoading}) => {
    const [isExpanded, setExpanded] = useState(false);
    const updateResults = async (results) => {
        try {
            details.results = results;
            setIsLoading(true);
            store.patientData.events[details.id].results = results;
            await syncPatientData(store.patientData);
        } finally {
            setIsLoading(false);
            setExpanded(false);
        }
    };
    const disabled = !isInFuture(addDays(momentDate, 1));
    const canSetResults = !isInFuture(momentDate);
    return <View>
        <Row style={{minHeight: 37}}>
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
                    {
                        details.medication
                            ? medicationsService.getNameByKey(details.medication)
                            : checkupsService.getNameByKey(details.checkup)
                    }
                </Text>
            </Row>
            <View style={{flex: 1}}/>
            {
                canSetResults &&
                hasResultsDropdown(details) &&
                <IconButton name={isExpanded ? "up" : "down"} color={Colors.purple} onPress={() => setExpanded(!isExpanded)}/>
            }
            {
                !disabled &&
                <IconButton name='edit' backgroundColor={Colors.purple} iconColor='white' onPress={() => onEventPressed(details)}/>
            }
        </Row>
        {
            details.note && !isExpanded ?
                <Text size={7} color={Colors.gray} style={marginStyle(2, 'top')}>
                    {details.note}
                </Text> : null
        }
        {
            details.checkup === "bloodTest" &&
            <BloodTestResults isExpanded={isExpanded} results={details.results || {}} setResults={updateResults}/>
        }
        {
            details.checkup === "ultrasound" &&
            <UltrasoundResults isExpanded={isExpanded} results={details.results || {}} setResults={updateResults}/>
        }
        {
            noDivider ? null : <Divider/>
        }
    </View>
};

export function AgendaDay({momentDate, events, onEventPressed, setIsLoading}) {
    return <View style={[
        paddingStyle(15),
        paddingStyle(2, 'top')
    ]}>
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
                        momentDate={momentDate}
                        setIsLoading={setIsLoading}
                    />)
                : <NoItems/>
        }
    </View>
}
