import React, {Component} from "react";
import styled from 'styled-components';
import Text from "../components/Text";
import {marginStyle} from "../constants/Styles";
import Row from "../components/Row";
import Colors from "../constants/Colors";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import * as Sentry from 'sentry-expo';
import Modal from "../components/Modal";
import {Updates} from "expo";
import localization from "./localization";
import Button from "../components/Button";

const Container = styled(KeyboardAwareScrollView)`
  flex: 1;
`;

export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false, error: null}
    }

    componentDidCatch(error, info) {
        this.setState({hasError: true, error});
        console.error(error, info);
        if (!__DEV__) {
            Sentry.captureException(error, {extra: info});
        }
    }


    render() {

        const closeModal = async () => await Updates.reload();

        return this.state.hasError
            ?
            <Modal isVisible={true} onBackdropPress={closeModal} noContainer>
                <Text alignCenter color={Colors.pink} size={12} style={marginStyle(10, 'top')}>{localization('errorTitle')}</Text>
                <Text color={Colors.gray} size={6} style={[marginStyle(10, 'top'), marginStyle(10, 'left')]}>{localization('errorBody')}</Text>
                <Button onPress={closeModal} style={marginStyle(15, 'top')}>
                    {localization('close')}
                </Button>
            </Modal>
            : this.props.children
    }
}
