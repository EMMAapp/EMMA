import React from 'react';
import {FlatList, Image, Linking, TouchableOpacity, View} from 'react-native';
import styled from "styled-components";
import localization from "../utils/localization";
import licensesRaw from '../assets/licenses'
import Modal from "./Modal";
import Button from "./Button";
import {borderRadiusStyle, hwStyle, marginStyle, paddingStyle} from "../constants/Styles";
import Text from "./Text";
import _ from "lodash";
import Colors from "../constants/Colors";

const Container = styled(View)`
  overflow: hidden;
  flex-direction: row;
  background-color: white;
  align-items: center;
`;

const ListedItemText = (props) => <Text style={paddingStyle(3, 'top')} {...props}/>;

const extractNameFromGithubUrl = (url) => {
    if (!url) {
        return null;
    }

    const reg = /((https?:\/\/)?(www\.)?github\.com\/)?(@|#!\/)?([A-Za-z0-9_]{1,15})(\/([-a-z]{1,20}))?/i;
    const components = reg.exec(url);

    if (components && components.length > 5) {
        return components[5];
    }
    return null;
};

const formattedLicenses = _.map(licensesRaw, (licenseRaw, key) => {
    const {licenses: licenseText, ...packageDetails} = licenseRaw;
    if (key.startsWith('@')) {
        key = key.replace('@', '');
    }
    const [name, version] = key.split('@');

    const username =
        extractNameFromGithubUrl(packageDetails.repository) ||
        extractNameFromGithubUrl(packageDetails.licenseUrl);

    const image = username && `http://github.com/${username}.png`;

    return {
        key,
        name,
        image,
        username,
        licenseText,
        version,
        ...packageDetails,
    };
});

const LicenseListItem = ({image, licenseUrl, licenseText, version, username, name}) =>  (
    <Container style={[paddingStyle(5), marginStyle(5, 'bottom')]}>
        {
            image ?
            <Image source={{uri: image}} style={[hwStyle(35, 35), borderRadiusStyle(35)]}/>
            : <View style={hwStyle(35, 35)}/>
        }
        <View style={paddingStyle(10, 'left')}>
            <Text>{`${_.capitalize(name)}${username !== name ? ` by ${_.capitalize(username)}` : ''}`}</Text>
            <TouchableOpacity onPress={() => licenseUrl && Linking.openURL(licenseUrl)}>
                <ListedItemText color={Colors.purple} underline>{`License: ${licenseText}`}</ListedItemText>
            </TouchableOpacity>
            <ListedItemText>{`Version: ${version}`}</ListedItemText>
        </View>
    </Container>
);

const Licenses = ({}) => (
    <FlatList
        style={{flex: 1}}
        keyExtractor={({key}) => key}
        data={_.orderBy(formattedLicenses, item => item.key)}
        renderItem={({item}) => <LicenseListItem {...item}/>}
    />
);


export default ({isVisible, dismiss}) => {
    return <Modal isVisible={isVisible} onBackdropPress={dismiss}>
        <Licenses/>
        <Button onPress={dismiss} style={marginStyle(-15, 'top')}>
            {localization('close')}
        </Button>
    </Modal>
}
