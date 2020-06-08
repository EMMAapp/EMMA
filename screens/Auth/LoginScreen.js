import React, {useState} from 'react'
import {TouchableOpacity, Platform} from 'react-native'
import {logInWithFacebook, logInWithGoogle, loginWithEmail} from '../../store';
import RouteGuard from "../../navigation/RouteGuard";
import localization from "../../utils/localization";
import Image from "../../components/Image";
import Container from "../../components/Container";
import ButtonPrimary from "../../components/ButtonPrimary";
import {marginStyle, paddingStyle} from "../../constants/Styles";
import TermsModal from "../../components/TermsModal";
import Row from "../../components/Row";
import Checkbox from "../../components/Checkbox";
import Colors from "../../constants/Colors";
import Text from "../../components/Text";
import appContext from "../../utils/context";

const QuestionText = (props) =>
    <Text
        style={[paddingStyle(15, 'top'), paddingStyle(5, 'bottom')]}
        {...props}>
        {props.children}
    </Text>;


const LoginScreen = ({navigation, setIsLoading}) => {
    RouteGuard(navigation);

    const [agreeTerms, setAgreeTerms] = useState(false);
    const [termsIsVisible, setTermsIsVisible] = useState(false);
    const [hasError, setHasError] = useState(false);

    const login = async (loginLogic) => {
        setIsLoading(true);
        const success = await loginLogic();
        setIsLoading(false);
        if (success) {
            RouteGuard(navigation);
        }
        else {
            setHasError(true);
        }
    };

    const facebookLogin = async () => await login(logInWithFacebook);

    const googleLogin = async () => await login(logInWithGoogle);

    const devLogin = async () => await login(() => loginWithEmail({email: "dev@dev.com", password: "p@ssw0rd"}));

    const canSubmit = agreeTerms;

    return (
        <Container widthPercentage={90}>
            <Row center>
                <Image name='logo' height={50} width='80%' style={marginStyle(15, 'top')}/>
            </Row>
            <Image name='welcomeAnimation' height={Platform.OS === 'ios' ? 180 : 220} width='100%'/>

            <TermsModal isVisible={termsIsVisible} dismiss={() => setTermsIsVisible(false)}/>
            <Row center>
                <Checkbox
                    value={agreeTerms}
                    setValue={(enabled) => setAgreeTerms(enabled)}
                />
                <TouchableOpacity activeOpacity={1} onPress={() => setAgreeTerms(!agreeTerms)} style={paddingStyle(10, 'bottom')}>
                    <QuestionText>{localization('acceptTermsPrefix')}</QuestionText>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={() => setTermsIsVisible(true)} style={[paddingStyle(2, 'left'), paddingStyle(10, 'bottom')]}>
                    <QuestionText color={Colors.purple} underline>{localization('acceptTermsLink')}</QuestionText>
                </TouchableOpacity>
            </Row>

            {
                __DEV__ &&
                <Row center style={marginStyle(10, 'bottom')}>
                    <ButtonPrimary onPress={devLogin} disabled={!canSubmit} width='75%' icon='today'>
                        DEV LOGIN
                    </ButtonPrimary>
                </Row>
            }
            <Row center style={marginStyle(10, 'bottom')}>
                <ButtonPrimary onPress={facebookLogin} disabled={!canSubmit} width='75%' icon='facebook'>
                    {localization('connectFacebook')}
                </ButtonPrimary>
            </Row>
            <Row center style={marginStyle(10, 'bottom')}>
                <ButtonPrimary onPress={googleLogin} inverted disabled={!canSubmit} width='75%' icon='google'>
                    {localization('connectGoogle')}
                </ButtonPrimary>
            </Row>
            {
                hasError && <Text alignCenter color='red' style={marginStyle(5)}>Something went wrong</Text>
            }
        </Container>
    )
};

const {Consumer} = appContext;

export default (props) => <Consumer>
    {
        context => <LoginScreen {...props} {...context}/>
    }
</Consumer>
