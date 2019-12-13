import React, {useState} from 'react'
import {TouchableOpacity} from 'react-native'
import {logInWithFacebook, logInWithGoogle} from '../../store';
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
import {Platform} from "react-native-web";
import Icon from "../../components/Icon";

const QuestionText = (props) =>
    <Text
        style={[paddingStyle(15, 'top'), paddingStyle(5, 'bottom')]}
        {...props}>
        {props.children}
    </Text>;


export default function LoginScreen({navigation, screenProps}) {
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [termsIsVisible, setTermsIsVisible] = useState(false);
    const [hasError, setHasError] = useState(false);
    const {setIsLoading} = screenProps;

    const facebookLogin = async () => {
        setIsLoading(true);
        const success = await logInWithFacebook();
        setIsLoading(false);
        if (success) {
            RouteGuard(navigation);
        }
        else {
            setHasError(true);
        }
    };

    const googleLogin = async () => {
        setIsLoading(true);
        const success = await logInWithGoogle();
        setIsLoading(false);
        if (success) {
            RouteGuard(navigation);
        }
        else {
            setHasError(true);
        }
    };

    const canSubmit = agreeTerms;

    return (
        <Container widthPercentage={90}>
            <Image name='welcomeAnimation' height={Platform.OS === 'ios' ? 300 : 220} width='100%' style={marginStyle(15, 'top')}/>

            <TermsModal isVisible={termsIsVisible} dismiss={() => setTermsIsVisible(false)}/>
            <Row style={marginStyle(15, 'left')}>
                <Checkbox
                    value={agreeTerms}
                    setValue={(enabled) => setAgreeTerms(enabled)}
                />
                <Row style={[paddingStyle(10, 'bottom'), {width: '100%'}]}>
                    <TouchableOpacity activeOpacity={1} onPress={() => setAgreeTerms(!agreeTerms)}>
                        <QuestionText>{localization('acceptTermsPrefix')}</QuestionText>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} onPress={() => setTermsIsVisible(true)} style={paddingStyle(2, 'left')}>
                        <QuestionText color={Colors.purple} underline>{localization('acceptTermsLink')}</QuestionText>
                    </TouchableOpacity>
                </Row>
            </Row>

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
}
