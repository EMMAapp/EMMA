import React, {useState} from 'react'
import {StyleSheet, TouchableOpacity, View, Button, Switch} from 'react-native'
import {syncPatientData, store} from '../store';
import RouteGuard from "../navigation/RouteGuard";
import localization from "../utils/localization";
import NumericInput from "../components/NumericInput";
import CalendarModalPicker from "../components/CalendarModalPicker";
import {wixDateToMoment, momentToDisplayString} from "../utils/dayTime";
import ProtocolPicker from "../components/ProtocolPicker";
import TermsModal from "../components/TermsModal";
import Text from "../components/Text";
import Container from "../components/Container";
import Colors from "../constants/Colors";
import Box from "../components/Box";
import Icon from "../components/Icon";
import Row from "../components/Row";

export default function LoginScreen({navigation, screenProps}) {

    const [selectedProtocol, setSelectedProtocol] = useState(null);
    const [age, setAge] = useState(null);
    const [lastPeriodDate, setLastPeriodDate] = useState(null);
    const [isPeriodRegular, setIsPeriodRegular] = useState(false);
    const [averagePeriodCycleDays, setAveragePeriodCycleDays] = useState(28);
    const [isCalendarPickerVisible, setCalendarPickerVisible] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [termsIsVisible, setTermsIsVisible] = useState(false);
    const {setIsLoading} = screenProps;

    const submit = async () => {
        setIsLoading(true);
        const periods = [{date: lastPeriodDate, protocol: selectedProtocol}];
        const patientData = {...store.patientData, age, averagePeriodCycleDays, isPeriodRegular, periods};
        await syncPatientData(patientData);
        setIsLoading(false);
        RouteGuard(navigation);
    };

    const canSubmit = selectedProtocol && age && lastPeriodDate && agreeTerms;

    return (
        <Container marginHorizontal={30}>
            <Text bold={true} color={Colors.purple} size={16}>{localization('onboardingTitle')}</Text>
            <Text size={12} style={{paddingTop: 6}}>{localization('onboardingSubTitle')}</Text>

            <Text style={{paddingTop: 20, paddingBottom: 10}}>{localization('howOldAreYou')}</Text>
            <NumericInput value={age} setValue={setAge}/>

            <Text style={{paddingTop: 20, paddingBottom: 10}}>{localization('lastPeriod')}</Text>
            <Box height={40} width={'85%'}>
                <TouchableOpacity onPress={() => setCalendarPickerVisible(true)}>
                    <Row>
                        <Icon name='calendar'/>
                        <Text bold={true} style={{paddingLeft: 6}}>{lastPeriodDate ? momentToDisplayString(wixDateToMoment(lastPeriodDate)) : localization('selectDay')}</Text>
                    </Row>
                </TouchableOpacity>
            </Box>

            <CalendarModalPicker
                isVisible={isCalendarPickerVisible}
                onDayPress={dateString => {
                    setCalendarPickerVisible(false);
                    if (dateString) {
                        setLastPeriodDate(dateString);
                    }
                }}
            />

            <Text>{localization('regularPeriod')}</Text>
            <View style={{flexDirection: 'row'}}>
                <Button title={localization('yes')} color={isPeriodRegular ? 'pink' : 'gray'} onPress={() => setIsPeriodRegular(true)}/>
                <Button title={localization('no')} color={!isPeriodRegular ? 'pink' : 'gray'} onPress={() => setIsPeriodRegular(false)}/>
            </View>

            {
                isPeriodRegular ? <View style={{flexDirection: 'row'}}>
                    <Text>{localization('periodCyclePrefix')}</Text>
                    <NumericInput
                        margin={10}
                        style={{borderColor: 'pink', borderWidth: 5, width: 300}}
                        value={averagePeriodCycleDays}
                        setValue={setAveragePeriodCycleDays}
                    />
                    <Text>{localization('periodCycleSuffix')}</Text>
                </View> : null
            }
            <TermsModal isVisible={termsIsVisible} toClose={() => setTermsIsVisible(false)}/>
            <View style={{flexDirection: 'row'}}>
                <Switch style={{flex: 1}}
                        value={agreeTerms}
                        onValueChange={(enabled) => setAgreeTerms(enabled)}
                />
                <TouchableOpacity style={{backgroundColor: 'red'}} onPress={() => setTermsIsVisible(true)}>
                    <Text>{localization('acceptTerms')}</Text>
                </TouchableOpacity>
            </View>

            <ProtocolPicker selectedProtocol={selectedProtocol} setSelectedProtocol={setSelectedProtocol}/>

            <Button title={localization('onboardingSubmit')} color="#e93766" onPress={submit} disabled={!canSubmit}/>
        </Container>
    )
}

