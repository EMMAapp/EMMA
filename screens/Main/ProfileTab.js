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

const QuestionText = (props) =>
    <Text
        style={[paddingStyle(15, 'top'), paddingStyle(5, 'bottom')]}
        {...props}>
        {props.children}
    </Text>;


const ProfileTab = ({navigation, setMainCalendarRefresh, setIsLoading}) => {
    RouteGuard(navigation);

    const [updateToken, setUpdateToken] = useState(null);
    const [termsIsVisible, setTermsIsVisible] = useState(false);
    const [licensesIsVisible, setLicensesIsVisible] = useState(false);
    const [showDeleteValidationModal, setShowDeleteValidationModal] = useState(false);

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

    const setStoredData = async (key, value) => {
        setIsLoading(true);
        patientData[key] = value;
        await syncPatientData(patientData);
        setUpdateToken(shortid.generate());
        setMainCalendarRefresh(shortid.generate());
        setIsLoading(false);
    };

    return <Container widthPercentage={90} key={updateToken}>
        <Text bold color={Colors.purple} size={13}>{localization('profileTitle')}</Text>

        <Row center>
            <Image name-={"catbook"} height={70} width={100}/>
        </Row>

        <Row>
            <QuestionText style={paddingStyle(2, 'bottom')}>{localization('periodCyclePrefix')}</QuestionText>
            <NumericInput
                value={averagePeriodCycleDays}
                setValue={value => setStoredData('averagePeriodCycleDays', value > 45 ? 28 : value)}
                style={marginStyle(5)}
            />
            <QuestionText style={paddingStyle(2, 'bottom')}>{localization('periodCycleSuffix')}</QuestionText>
        </Row>

        <Divider margin={5}/>

        <Row>
            <QuestionText style={paddingStyle(2, 'bottom')}>{localization('myWeekStartOn')}</QuestionText>
            <BinaryBoxes
                style={marginStyle(5)}
                option1={localization('sunday')}
                option2={localization('monday')}
                width={50}
                selected={weekStartDay}
                setSelected={index => setStoredData('weekStartDay', index)}
                middleSpan={7}
            />
        </Row>

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
