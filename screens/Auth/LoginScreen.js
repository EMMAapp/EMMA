import React, {useState} from 'react'
import {Platform, TouchableOpacity} from 'react-native';
import {loginWithEmail, logInWithFacebook, logInWithGoogle} from '../../store';
import RouteGuard from "../../navigation/RouteGuard";
import localization from "../../utils/localization";
import Image from "../../components/Image";
import Container from "../../components/Container";
import ButtonPrimary from "../../components/ButtonPrimary";
import {marginStyle, paddingStyle} from "../../constants/Styles";
import LongTextModal from "../../components/LongTextModal";
import Row from "../../components/Row";
import Colors from "../../constants/Colors";
import Text from "../../components/Text";
import appContext from "../../utils/context";
import privacy from "../../assets/legal/privacy";
import terms from "../../assets/legal/terms";
import {LOGIN} from "../../navigation/Routes";

const LoginScreen = ({navigation, setIsLoading}) => {
    RouteGuard(navigation, LOGIN);

    const [termsIsVisible, setTermsIsVisible] = useState(false);
    const [privacyIsVisible, setPrivacyIsVisible] = useState(false);
    const [hasError, setHasError] = useState(false);

    const login = async (loginLogic) => {
        setIsLoading(true);
        const success = await loginLogic();
        setIsLoading(false);
        if (success) {
            RouteGuard(navigation, LOGIN);
        }
        else {
            setHasError(true);
        }
    };

    const facebookLogin = async () => await login(logInWithFacebook);

    const googleLogin = async () => await login(logInWithGoogle);

    const devLogin = async () => await login(() => loginWithEmail({email: "dev@dev.com", password: "p@ssw0rd"}));

    return (
        <Container widthPercentage={90}>
            <Row center>
                <Image name='logo' height={50} width='80%' style={marginStyle(15, 'top')}/>
            </Row>
            <Image name='welcomeAnimation' height={Platform.OS === 'ios' ? 180 : 220} width='100%'/>

            <LongTextModal text={terms} isVisible={termsIsVisible} dismiss={() => setTermsIsVisible(false)}/>
            <LongTextModal text={privacy} isVisible={privacyIsVisible} dismiss={() => setPrivacyIsVisible(false)}/>

            {
                __DEV__ &&
                <Row center style={marginStyle(20, 'bottom')}>
                    <ButtonPrimary onPress={devLogin} width='75%' height={30} icon='today'>
                        DEV LOGIN
                    </ButtonPrimary>
                </Row>
            }
            <Row center style={marginStyle(20, 'bottom')}>
                <ButtonPrimary onPress={facebookLogin} width='75%' height={30} icon='facebook'>
                    {localization('connectFacebook')}
                </ButtonPrimary>
            </Row>
            <Row center style={marginStyle(20, 'bottom')}>
                <ButtonPrimary onPress={googleLogin} inverted width='75%' height={30} icon='google'>
                    {localization('connectGoogle')}
                </ButtonPrimary>
            </Row>
            {
                hasError && <Text alignCenter color='red' style={marginStyle(5)}>Something went wrong</Text>
            }

            <Row center>
                <Text>{localization('acceptTermsPrefix')}</Text>
                <TouchableOpacity activeOpacity={1} onPress={() => setTermsIsVisible(true)} style={paddingStyle(2, 'left')}>
                    <Text color={Colors.purple} underline>{localization('terms')}</Text>
                </TouchableOpacity>
            </Row>
            <Row center>
                <Text>{localization('acceptTermsMiddle')}</Text>
                <TouchableOpacity activeOpacity={1} onPress={() => setPrivacyIsVisible(true)} style={paddingStyle(2, 'left')}>
                    <Text color={Colors.purple} underline>{localization('privacyPolicy')}</Text>
                </TouchableOpacity>
            </Row>

        </Container>
    )
};

const {Consumer} = appContext;

export default (props) => <Consumer>
    {
        context => <LoginScreen {...props} {...context}/>
    }
</Consumer>
