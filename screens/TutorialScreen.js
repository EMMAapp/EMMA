import React, {useState} from 'react'
import Container from "../components/Container";
import Image from "../components/Image";
import Text from "../components/Text";
import localization from "../utils/localization";
import {Dot} from "../components/Dot";
import RouteGuard from "../navigation/RouteGuard";
import Swipe from "../components/Swipe";
import Row from "../components/Row";
import Colors from "../constants/Colors";
import {marginStyle, paddingStyle} from "../constants/Styles";


export default ({navigation}) => {
    const [screenId, setScreenId] = useState(1);

    const moveForward = () => {
        if (screenId === 3) {
            RouteGuard(navigation);
        }
        else {
            setScreenId(screenId + 1);
        }
    };

    const moveBack = () => {
        if (screenId > 1) {
            setScreenId(screenId - 1);
        }
    };

    return <Swipe onLeft={moveBack} onRight={moveForward} style={{height: '100%', width: '100%'}}>
        <Container>
            <Row center>
                <Image name={`onboarding${screenId}`} height={250} width={250}/>
            </Row>
            <Text alignCenter size={13} color={Colors.purple}>{localization(`onboarding.${screenId}.title`)}</Text>
            <Text size={9} style={[paddingStyle(20)]}>{localization(`onboarding.${screenId}.text`)}</Text>
            <Row center style={marginStyle(50, 'top')}>
                <Dot color={screenId === 1 ? Colors.purple : Colors.grayDark} style={marginStyle(10, 'right')}/>
                <Dot color={screenId === 2 ? Colors.purple : Colors.grayDark} style={marginStyle(10, 'right')}/>
                <Dot color={screenId === 3 ? Colors.purple : Colors.grayDark}/>
            </Row>
        </Container>
    </Swipe>

}
