import React, {Component} from "react";
import styled from 'styled-components';
import Text from "../components/Text";
import {marginStyle} from "../constants/Styles";
import Row from "../components/Row";
import Colors from "../constants/Colors";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import * as Sentry from 'sentry-expo';

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
        return this.state.hasError
            ? <Container bounces={false}>
                <Row center>
                    <Text color={Colors.pink} size={14} style={marginStyle(50, 'top')}>An error occurred :(</Text>
                </Row>
                <Text color={Colors.gray} size={10} style={[marginStyle(10, 'top'), marginStyle(10, 'left')]}>{this.state.error.message}</Text>
                <Text color={Colors.gray} style={[marginStyle(2, 'top'), marginStyle(10, 'left')]}>{this.state.error.componentStack}</Text>
            </Container>
            : this.props.children
    }
}