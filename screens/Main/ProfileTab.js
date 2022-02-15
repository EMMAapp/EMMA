import React, {useState} from 'react';
import store, {syncPatientData} from "../../store";
import RouteGuard from "../../navigation/RouteGuard";
import localization, {changeLanguage} from "../../utils/localization";
import {ONBOARDING, PROFILE, TUTORIAL} from "../../navigation/Routes";
import Container from "../../components/Container";
import {testNotification} from "../../utils/notifications";
import Colors from "../../constants/Colors";
import {marginStyle, paddingStyle} from "../../constants/Styles";
import NumericInput from "../../components/NumericInput";
import Row from "../../components/Row";
import shortid from 'shortid';
import Text from "../../components/Text";
import Divider from "../../components/Divider";
import BinaryBoxes from "../../components/BinaryBoxes";
import LongTextModal from "../../components/LongTextModal";
import {TouchableOpacity, View} from "react-native";
import Image from "../../components/Image";
import appContext from "../../utils/context";
import ButtonPrimary from "../../components/ButtonPrimary";
import _ from "lodash";
import {fixPeriodCycleValue} from "../OnboardingScreen";
import Autocomplete from "../../components/Autocomplete";
import i18n from 'i18n-js';
import locales, {localesForAutocomplete} from "../../utils/locales";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import terms from "../../assets/legal/terms";
import privacy from "../../assets/legal/privacy";

const version = require("../../app").expo.version;

const QuestionText = (props) =>
    <Text
        style={[paddingStyle(15, 'top'), paddingStyle(5, 'bottom')]}
        {...props}>
        {props.children}
    </Text>;

const AboutModal = ({isVisible, dismiss}) =>
    <Modal isVisible={isVisible} onBackdropPress={dismiss} noContainer>
        <Text size={7} style={[marginStyle(5, 'top'), marginStyle(10, 'bottom')]}>{localization('aboutText')}</Text>
        <Text size={6}>{localization('appVersion')} {version}</Text>
        <Button onPress={dismiss} style={marginStyle(15, 'top')}>
            {localization('close')}
        </Button>
    </Modal>;

const ProfileTab = ({navigation, setMainCalendarRefresh, setIsLoading}) => {
    RouteGuard(navigation, PROFILE);
    if (store.noData()) {
        return <View/>
    }

    const [updateToken, setUpdateToken] = useState(null);
    const [termsIsVisible, setTermsIsVisible] = useState(false);
    const [privacyIsVisible, setPrivacyIsVisible] = useState(false);
    const [newAveragePeriodCycleDays, setAveragePeriodCycleDays] = useState(null);
    const [newWeekStartDay, setWeekStartDay] = useState(null);
    const [locale, setLocale] = useState(i18n.locale);
    const [aboutModalVisible, setAboutModalVisible] = useState(false);

    const {patientData} = store;

    if (store.noData()) {
        return <View/>
    }

    const {averagePeriodCycleDays, weekStartDay} = patientData;

    const setStoredData = async (keyValues) => {
        try {
            setIsLoading(true);
            _.forEach(keyValues, ({key, value}) => patientData[key] = value);
            await syncPatientData(patientData);
            setUpdateToken(shortid.generate());
            setMainCalendarRefresh(shortid.generate());
        } finally {
            setIsLoading(false);
            setAveragePeriodCycleDays(null);
            setWeekStartDay(null);
        }
    };

    return <Container widthPercentage={90} key={updateToken}>
        <Text color={Colors.purple} size={13}>{localization('profileTitle')}</Text>

        <Row center>
            <Image name-={"catbook"} height={70} width={100}/>
        </Row>

        <Row>
            <QuestionText style={paddingStyle(2, 'bottom')}>{localization('periodCyclePrefix')}</QuestionText>
            <NumericInput
                value={newAveragePeriodCycleDays || averagePeriodCycleDays}
                setValue={value => {
                    setAveragePeriodCycleDays(value);
                    setTimeout(() => setAveragePeriodCycleDays(value => fixPeriodCycleValue(value)), 2000)
                }}
                style={marginStyle(5)}
            />
            <QuestionText style={paddingStyle(2, 'bottom')}>{localization('periodCycleSuffix')}</QuestionText>
        </Row>

        <Row>
            <QuestionText style={paddingStyle(2, 'bottom')}>{localization('myWeekStartOn')}</QuestionText>
            <BinaryBoxes
                style={marginStyle(5)}
                option1={localization('sunday')}
                option2={localization('monday')}
                width={50}
                selected={newWeekStartDay || weekStartDay}
                setSelected={index => setWeekStartDay(index)}
                middleSpan={7}
            />
        </Row>

        <Row style={{zIndex: 2}}>
            <Text>{localization('appLanguage')}</Text>
            <View>
                <Autocomplete
                    style={marginStyle(5, 'left')}
                    items={localesForAutocomplete}
                    itemWidth={150}
                    center
                    selectedItem={{item: locales[locale]}}
                    setSelectedItem={value => setLocale(_.keys(locales).filter(locale => locales[locale] === value)[0])}
                    placeholderKey={"language"}
                />
            </View>
        </Row>

        <ButtonPrimary
            style={marginStyle(5, 'top')}
            disabled={!newAveragePeriodCycleDays && !newWeekStartDay && locale === i18n.locale}
            width={50}
            onPress={async () => {
                let keyValues = [];
                if (newAveragePeriodCycleDays) {
                    keyValues.push({key: 'averagePeriodCycleDays', value: fixPeriodCycleValue(newAveragePeriodCycleDays)});
                }
                if (newWeekStartDay) {
                    keyValues.push({key: 'weekStartDay', value: newWeekStartDay})
                }
                await setStoredData(keyValues);

                if (locale !== i18n.locale) {
                    await changeLanguage(locale);
                }
            }}
        >
            {localization('save')}
        </ButtonPrimary>

        <Divider margin={10}/>

        <AboutModal isVisible={aboutModalVisible} dismiss={() => setAboutModalVisible(false)}/>
        <Row>
            <TouchableOpacity activeOpacity={1} onPress={() => setAboutModalVisible(true)} style={paddingStyle(3, 'bottom')}>
                <QuestionText underline color={Colors.purple}>{localization('openAboutRef')}</QuestionText>
            </TouchableOpacity>
        </Row>

        <LongTextModal text={terms} isVisible={termsIsVisible} dismiss={() => setTermsIsVisible(false)}/>
        <LongTextModal text={privacy} isVisible={privacyIsVisible} dismiss={() => setPrivacyIsVisible(false)}/>

        <TouchableOpacity activeOpacity={1} onPress={() => setTermsIsVisible(true)} style={paddingStyle(3, 'bottom')}>
            <QuestionText underline color={Colors.purple}>{localization('terms')}</QuestionText>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={1} onPress={() => setPrivacyIsVisible(true)} style={paddingStyle(3, 'bottom')}>
            <QuestionText underline color={Colors.purple}>{localization('privacyPolicy')}</QuestionText>
        </TouchableOpacity>

        {
            __DEV__ &&
            <TouchableOpacity onPress={() => navigation.navigate(ONBOARDING)}><QuestionText>onboarding</QuestionText></TouchableOpacity>
        }
        {
            __DEV__ &&
            <TouchableOpacity onPress={() => navigation.navigate(TUTORIAL)}><QuestionText>tutorial</QuestionText></TouchableOpacity>
        }
        {
            __DEV__ &&
            <TouchableOpacity onPress={() => testNotification()}><QuestionText>notification</QuestionText></TouchableOpacity>
        }
    </Container>;
};


const {Consumer} = appContext;

export default (props) => <Consumer>
    {
        context => <ProfileTab {...props} {...context}/>
    }
</Consumer>
