import React, {Component} from "react";
import Text from "../components/Text";
import {marginStyle} from "../constants/Styles";
import Colors from "../constants/Colors";
import Modal from "../components/Modal";
import * as Updates from 'expo-updates';
import localization from "./localization";
import Button from "../components/Button";

export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false, error: null}
    }

    componentDidCatch(error, info) {
        this.setState({hasError: true, error});
        console.error(error, info);
    }


    render() {

        const closeModal = async () => await Updates.reloadAsync();

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
