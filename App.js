import {AppLoading} from 'expo';
import {Asset} from 'expo-asset';
import * as Font from 'expo-font';
import React, {useState} from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import * as firebase from 'firebase';
import EStyleSheet from 'react-native-extended-stylesheet';

import AppNavigator from './navigation/AppNavigator';
import {retrievePatient} from './store';
import firebaseConfig from "./firebaseConfig";
import {logError} from "./utils/log";
import LoadingModal from "./components/LoadingModal";
import androidWarningFix from './utils/androidWarningFix';
import appContext from "./utils/context";

EStyleSheet.build({
    $rem: Platform.OS === 'ios' ? 16 : 14
});

androidWarningFix();

try {
    firebase.initializeApp(firebaseConfig);
}
catch (e) {
}

export default function App(props) {
    const [isStartupLoadingComplete, setStartupLoadingComplete] = useState(false);
    const [mainCalendarRefresh, setMainCalendarRefresh] = useState(null);
    const [currentEditedEventId, setCurrentEditedEventId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const {Provider} = appContext;

    if (!isStartupLoadingComplete && !props.skipLoadingScreen) {
        console.info("loading!")
        return (
            <AppLoading
                startAsync={async () => loadResourcesAsync()}
                onError={handleLoadingError}
                onFinish={() => handleFinishLoading(setStartupLoadingComplete)}
            />
        );
    }
    else {
        console.error("start!")
        return (
            <View style={styles.container}>
                {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
                <Provider
                    value={{
                        mainCalendarRefresh,
                        setMainCalendarRefresh,
                        currentEditedEventId,
                        setCurrentEditedEventId,
                        setIsLoading
                    }}
                >
                    <AppNavigator/>
                    <LoadingModal isVisible={isLoading}/>
                </Provider>
            </View>
        );
    }
}

async function loadResourcesAsync() {
    await Promise.all([
        Asset.loadAsync([
            require('./assets/images/beach.gif'),
            require('./assets/images/beach.png'),
            require('./assets/images/motorcycle.jpg'),
            require('./assets/images/wonder.png'),
        ]),
        Font.loadAsync({
            ...Ionicons.font,
            'sf-pro-regular': require('./assets/fonts/SF-Pro-Text-Regular.ttf'),
            'sf-pro-bold': require('./assets/fonts/SF-Pro-Text-Bold.ttf'),
        }),
        retrievePatient(),
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    ]);
}

const handleLoadingError = (error) => logError(error);

function handleFinishLoading(setLoadingComplete) {
    console.error("complete!")
    setLoadingComplete(true);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
