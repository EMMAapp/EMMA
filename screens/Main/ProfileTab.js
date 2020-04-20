import React, {useState} from 'react';
import store, {logoutPatient, purgePatient, syncPatientData} from "../../store";
import RouteGuard from "../../navigation/RouteGuard";
import localization from "../../utils/localization";
import {ONBOARDING} from "../../navigation/Routes";
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
import TermsModal from "../../components/TermsModal";
import {TouchableOpacity, View} from "react-native";
import Image from "../../components/Image";
import ValidationModal from "../../components/ValidationModal";
import LicensesModal from "../../components/LicensesModal";
import appContext from "../../utils/context";
import ButtonPrimary from "../../components/ButtonPrimary";
import _ from "lodash";

const QuestionText = (props) =>
    <Text
        style={[paddingStyle(15, 'top'), paddingStyle(5, 'bottom')]}
        {...props}>
        {props.children}
    </Text>;


const ProfileTab = ({navigation, setMainCalendarRefresh, setIsLoading}) => {

    const [updateToken, setUpdateToken] = useState(null);
    const [termsIsVisible, setTermsIsVisible] = useState(false);
    const [licensesIsVisible, setLicensesIsVisible] = useState(false);
    const [showDeleteValidationModal, setShowDeleteValidationModal] = useState(false);
    const [newAveragePeriodCycleDays, setAveragePeriodCycleDays] = useState(null);
    const [newWeekStartDay, setWeekStartDay] = useState(null);

    const {patientData} = store;

    if (store.noData()) {
        return <View/>
    }

    const {averagePeriodCycleDays, weekStartDay} = patientData;

    const logout = async () => {
        await logoutPatient();
        RouteGuard(navigation);
    };

    const purge = async () => {
        await purgePatient();
        RouteGuard(navigation);
    };

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
        <Text bold color={Colors.purple} size={13}>{localization('profileTitle')}</Text>

        <Row center>
            <Image name-={"catbook"} height={70} width={100}/>
        </Row>

        <Row>
            <QuestionText style={paddingStyle(2, 'bottom')}>{localization('periodCyclePrefix')}</QuestionText>
            <NumericInput
                value={newAveragePeriodCycleDays || averagePeriodCycleDays}
                setValue={value => setAveragePeriodCycleDays(value)}
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

        <ButtonPrimary
            style={marginStyle(5, 'top')}
            disabled={!newAveragePeriodCycleDays && !newWeekStartDay}
            width={50}
            onPress={async () => {
                let keyValues = [];
                if (newAveragePeriodCycleDays) {
                    if (newAveragePeriodCycleDays < 20 || newAveragePeriodCycleDays > 45) {
                        setAveragePeriodCycleDays(28);
                        keyValues.push({key: 'averagePeriodCycleDays', value: 28})
                    }
                    else {
                        keyValues.push({key: 'averagePeriodCycleDays', value: newAveragePeriodCycleDays})
                    }
                }
                if (newWeekStartDay) {
                    keyValues.push({key: 'weekStartDay', value: newWeekStartDay})
                }
                await setStoredData(keyValues)
            }}
        >
            {localization('save')}
        </ButtonPrimary>

        <Divider margin={10}/>

        <LicensesModal isVisible={licensesIsVisible} dismiss={() => setLicensesIsVisible(false)}/>
        <Row>
            <TouchableOpacity activeOpacity={1} onPress={() => setLicensesIsVisible(true)} style={paddingStyle(3, 'bottom')}>
                <QuestionText underline color={Colors.purple}>{localization('openSourceRef')}</QuestionText>
            </TouchableOpacity>
        </Row>

        <TermsModal isVisible={termsIsVisible} dismiss={() => setTermsIsVisible(false)}/>
        <Row>
            <TouchableOpacity activeOpacity={1} onPress={() => setTermsIsVisible(true)} style={paddingStyle(3, 'bottom')}>
                <QuestionText underline color={Colors.purple}>{localization('acceptTermsLink')}</QuestionText>
            </TouchableOpacity>
        </Row>

        <Row>
            <TouchableOpacity activeOpacity={1} onPress={() => logout()} style={paddingStyle(3, 'bottom')}>
                <QuestionText underline color={Colors.purple}>{localization('logout')}</QuestionText>
            </TouchableOpacity>
        </Row>

        <ValidationModal
            isVisible={showDeleteValidationModal}
            title={localization('areYouSureDeleteAllData')}
            positive={localization('delete')}
            setResult={async (shouldDelete) => {
                if (!shouldDelete) {
                    setShowDeleteValidationModal(false);
                }
                else {
                    await purge();
                }
            }}
        />

        <Row>
            <TouchableOpacity activeOpacity={1} onPress={() => setShowDeleteValidationModal(true)} style={[paddingStyle(20, 'top')]}>
                <QuestionText color={Colors.pink}>{localization('deleteAllData')}</QuestionText>
            </TouchableOpacity>
        </Row>

        {
            __DEV__ &&
            <TouchableOpacity onPress={() => navigation.navigate(ONBOARDING)}><QuestionText>onboarding</QuestionText></TouchableOpacity>
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
