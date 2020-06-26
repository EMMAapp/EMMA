import React, {useEffect} from 'react';
import {View} from "react-native";
import appContext from "../../utils/context";
import RouteGuard from "../../navigation/RouteGuard";

const JourneyTab = ({navigation}) => {
    RouteGuard(navigation);

    useEffect(() => {
        return navigation.addListener('tabPress', e => {
            e.preventDefault()
        });
    }, [navigation]);

    return <View/>
};

const {Consumer} = appContext;

export default (props) => <Consumer>
    {
        context => <JourneyTab {...props} {...context}/>
    }
</Consumer>
