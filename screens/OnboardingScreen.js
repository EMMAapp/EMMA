import React, {useState} from 'react'
import {TouchableOpacity} from 'react-native'
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
import styles from "../constants/Styles"

const QuestionText = (props) => <Text style={[styles.pt15, styles.pb5]} {...props}>{props.children}</Text>;

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
            <Text bold color={Colors.purple} size={13}>{localization('onboardingTitle')}</Text>
            <Text size={9} style={styles.pt5}>{localization('onboardingSubTitle')}</Text>

            <QuestionText>{localization('howOldAreYou')}</QuestionText>
            <NumericInput value={age} setValue={setAge}/>

            <QuestionText>{localization('lastPeriod')}</QuestionText>
            <Box height={25} width={'90%'}>
                <TouchableOpacity onPress={() => setCalendarPickerVisible(true)}>
                    <Row>
                        <Icon name='calendar'/>
                        <Text bold={true} style={styles.pl5}>{lastPeriodDate ? momentToDisplayString(wixDateToMoment(lastPeriodDate)) : localization('selectDay')}</Text>
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
                    <QuestionText style={styles.pb2}>{localization('periodCyclePrefix')}</QuestionText>
                    <NumericInput value={averagePeriodCycleDays} setValue={setAveragePeriodCycleDays} style={styles.m5}/>
                    <QuestionText style={styles.pb2}>{localization('periodCycleSuffix')}</QuestionText>
                </Row> : null
            }

            <ProtocolPicker selectedProtocol={selectedProtocol} setSelectedProtocol={setSelectedProtocol}/>

            <TermsModal isVisible={termsIsVisible} dismiss={() => setTermsIsVisible(false)}/>
            <Row style={styles.mt40}>
                <Checkbox
                        value={agreeTerms}
                        setValue={(enabled) => setAgreeTerms(enabled)}
                />
                <Row style={[styles.pb10, styles.fullWidth]}>
                    <QuestionText>{localization('acceptTermsPrefix')}</QuestionText>
                    <TouchableOpacity onPress={() => setTermsIsVisible(true)} style={styles.pl2}>
                        <QuestionText color={Colors.purple} underline>{localization('acceptTermsLink')}</QuestionText>
                    </TouchableOpacity>
                </Row>
            </Row>

            <ButtonPrimary onPress={submit} disabled={!canSubmit} style={styles.mt15}>
                {localization('onboardingSubmit')}
            </ButtonPrimary>
        </Container>
    )
}
