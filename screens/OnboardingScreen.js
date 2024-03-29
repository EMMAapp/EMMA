import React, {useState} from 'react'
import {Dimensions, TouchableOpacity} from 'react-native'
import {store, syncPatientData} from '../store';
import localization from "../utils/localization";
import NumericInput from "../components/NumericInput";
import CalendarModalPicker from "../components/CalendarModalPicker";
import {momentToDisplayString, wixDateToMoment} from "../utils/dayTime";
import Text from "../components/Text";
import Container from "../components/Container";
import Colors from "../constants/Colors";
import Box from "../components/Box";
import Row from "../components/Row";
import YesNoBoxes from "../components/YesNoBoxes";
import ButtonPrimary from "../components/ButtonPrimary";
import {marginStyle, paddingStyle} from "../constants/Styles"
import IconAndText from "../components/IconAndText";
import BirthPicker from "../components/BirthPicker";
import Image from "../components/Image";
import appContext from "../utils/context";
import {TUTORIAL} from "../navigation/Routes";

const QuestionText = (props) =>
    <Text
        style={[paddingStyle(15, 'top'), paddingStyle(5, 'bottom')]}
        {...props}>
        {props.children}
    </Text>;

export const fixPeriodCycleValue = (value) => {
    if (value < 20 || value > 45) {
        return 28;
    }
    return value;
};

const OnboardingScreen = ({navigation, setIsLoading}) => {

    const [birth, setBirth] = useState({month: 1, year: 1990});
    const [lastPeriodDate, setLastPeriodDate] = useState(null);
    const [isPeriodRegular, setIsPeriodRegular] = useState(false);
    const [averagePeriodCycleDays, setAveragePeriodCycleDays] = useState(28);
    const [isCalendarPickerVisible, setCalendarPickerVisible] = useState(false);

    const submit = async () => {
        setIsLoading(true);
        const periods = [{date: lastPeriodDate}];
        const patientData = {...store.patientData, averagePeriodCycleDays: fixPeriodCycleValue(averagePeriodCycleDays), isPeriodRegular, periods};
        await syncPatientData(patientData);
        setIsLoading(false);
        navigation.navigate(TUTORIAL);
    };

    const canSubmit = !!lastPeriodDate;

    return (
        <Container widthPercentage={90}>
            <Text bold color={Colors.purple} size={13}>{localization('onboardingTitle')}</Text>
            <Text size={9} style={paddingStyle(5, 'top')}>{localization('onboardingSubTitle')}</Text>

            <QuestionText>{localization('whenBorn')}</QuestionText>
            <BirthPicker
                month={birth.month}
                year={birth.year}
                setMonth={month => setBirth({...birth, month: month || 1})}
                setYear={year => setBirth({...birth, year: year || 1990})}
            />

            <QuestionText>{localization('lastPeriod')}</QuestionText>
            <Box height={25} width={'90%'}>
                <TouchableOpacity onPress={() => setCalendarPickerVisible(true)}>
                    <IconAndText name='calendar' bold>
                        {lastPeriodDate ? momentToDisplayString(wixDateToMoment(lastPeriodDate)) : localization('selectDay')}
                    </IconAndText>
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
                    <QuestionText style={paddingStyle(2, 'bottom')}>{localization('periodCyclePrefix')}</QuestionText>
                    <NumericInput
                        value={averagePeriodCycleDays}
                        setValue={value => {
                            setAveragePeriodCycleDays(value);
                            setTimeout(() => setAveragePeriodCycleDays(value => fixPeriodCycleValue(value)), 2000)
                        }}
                        style={marginStyle(5)}
                    />
                    <QuestionText style={paddingStyle(2, 'bottom')}>{localization('periodCycleSuffix')}</QuestionText>
                </Row> : null
            }

            <ButtonPrimary onPress={submit} disabled={!canSubmit} style={[marginStyle(15, 'top'), marginStyle(15, 'bottom')]}>
                {localization('onboardingSubmit')}
            </ButtonPrimary>

            <Row center style={paddingStyle(20, 'top')}>
                <Image name={"confetti"} height={100} width={Dimensions.get("window").width * 0.9}/>
            </Row>
        </Container>
    )
};

const {Consumer} = appContext;

export default (props) => <Consumer>
    {
        context => <OnboardingScreen {...props} {...context}/>
    }
</Consumer>
