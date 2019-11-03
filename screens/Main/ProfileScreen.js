import React from 'react';
import {logoutPatient} from "../../store";
import RouteGuard from "../../navigation/RouteGuard";
import {Text} from "react-native";
import localization from "../../utils/localization";

export default function ProfileScreen({navigation}) {

  const logout = async () => {
    await logoutPatient();
    RouteGuard(navigation);
  };

  return <Text onPress={logout}>{localization('auth.signout')}</Text>;
}
