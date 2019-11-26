import React, {useState} from 'react'
import {TouchableOpacity, View, Button, Switch} from 'react-native'
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
import YesNoBoxes from "../components/YesNoBoxes";
import ButtonPrimary from "../components/ButtonPrimary";
import Checkbox from "../components/Checkbox";

const QuestionText = ({children}) => <Text style={{paddingTop: 20, paddingBottom: 10}}>{children}</Text>;

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
            <Text bold color={Colors.purple} size={16}>{localization('onboardingTitle')}</Text>
            <Text size={12} style={{paddingTop: 6}}>{localization('onboardingSubTitle')}</Text>

            <QuestionText>{localization('howOldAreYou')}</QuestionText>
            <NumericInput value={age} setValue={setAge}/>

            <QuestionText>{localization('lastPeriod')}</QuestionText>
            <Box height={40} width={'95%'}>
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

            <QuestionText>{localization('regularPeriod')}</QuestionText>
            <YesNoBoxes selected={isPeriodRegular} setSelected={setIsPeriodRegular}/>

            {
                isPeriodRegular ? <Row>
                    <QuestionText>{localization('periodCyclePrefix')}</QuestionText>
                    <NumericInput value={averagePeriodCycleDays} setValue={setAveragePeriodCycleDays} style={{margin: 10}}/>
                    <QuestionText>{localization('periodCycleSuffix')}</QuestionText>
                </Row> : null
            }

            <ProtocolPicker selectedProtocol={selectedProtocol} setSelectedProtocol={setSelectedProtocol}/>

            <TermsModal isVisible={termsIsVisible} toClose={() => setTermsIsVisible(false)}/>
            <View style={{flexDirection: 'row'}}>
                <Checkbox
                        value={agreeTerms}
                        setValue={(enabled) => setAgreeTerms(enabled)}
                />
                <TouchableOpacity style={{backgroundColor: 'red'}} onPress={() => setTermsIsVisible(true)}>
                    <Text>{localization('acceptTerms')}</Text>
                </TouchableOpacity>
            </View>

            <ButtonPrimary onPress={submit} disabled={!canSubmit} style={{marginTop: 20}}>
                {localization('onboardingSubmit')}
            </ButtonPrimary>
        </Container>
    )
}

