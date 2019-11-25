import {AppLoading} from 'expo';
import {Asset} from 'expo-asset';
import * as Font from 'expo-font';
import React, {useState} from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import * as firebase from 'firebase';

import {AppNavigator} from './navigation/AppNavigator';
import {retrievePatient} from './store';
import firebaseConfig from "./firebaseConfig";
import {logError} from "./utils/log";
import LoadingModal from "./components/LoadingModal";
import androidWarningFix from './utils/androidWarningFix';

androidWarningFix();

firebase.initializeApp(firebaseConfig);

export default function App(props) {
    const [isStartupLoadingComplete, setStartupLoadingComplete] = useState(false);
    const [mainCalendarRefresh, setMainCalendarRefresh] = useState(null);
    const [currentEditedEventId, setCurrentEditedEventId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    if (!isStartupLoadingComplete && !props.skipLoadingScreen) {
        return (
            <AppLoading
                startAsync={async () => loadResourcesAsync()}
                onError={handleLoadingError}
                onFinish={() => handleFinishLoading(setStartupLoadingComplete)}
            />
        );
    } else {
        return (
            <View style={styles.container}>
                {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
                <AppNavigator
                    screenProps={{
                        mainCalendarRefresh,
                        setMainCalendarRefresh,
                        currentEditedEventId,
                        setCurrentEditedEventId,
                        setIsLoading
                    }}
                />
                <LoadingModal isVisible={isLoading}/>
            </View>
        );
    }
}

async function loadResourcesAsync() {
    await Promise.all([
        Asset.loadAsync([
            //require('./assets/images/robot-dev.png'),
            //require('./assets/images/robot-prod.png'),
        ]),
        Font.loadAsync({
            ...Ionicons.font,
            'sf-pro-regular': require('./assets/fonts/SF-Pro-Text-Regular.ttf'),
            'sf-pro-bold': require('./assets/fonts/SF-Pro-Text-Bold.ttf'),
        }),
        retrievePatient()
    ]);
}

function handleLoadingError(error) {
    logError(error);
}

function handleFinishLoading(setLoadingComplete) {
    setLoadingComplete(true);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
