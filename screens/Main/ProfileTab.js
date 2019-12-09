import React from 'react';
import {logoutPatient} from "../../store";
import RouteGuard from "../../navigation/RouteGuard";
import {Text} from "react-native";
import localization from "../../utils/localization";
import {ONBOARDING} from "../../navigation/Routes";
import Container from "../../components/Container";
import {testNotification} from "../../utils/notifications";

export default function ProfileTab({navigation}) {

    const logout = async () => {
        await logoutPatient();
        RouteGuard(navigation);
    };

    return <Container>
        <Text onPress={logout}>{localization('auth.signout')}</Text>
        <Text onPress={() => navigation.navigate(ONBOARDING)}>onboarding</Text>
        <Text onPress={() => testNotification()}>notification</Text>
    </Container>;
}
