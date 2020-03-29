import {AppLoading} from 'expo';
import styled from 'styled-components';
import {Asset} from 'expo-asset';
import * as Font from 'expo-font';
import React, {useState} from 'react';
import {Platform, StatusBar, View} from 'react-native';
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
import * as Sentry from 'sentry-expo';
import {ErrorBoundary} from "./utils/ErrorBoundary";

Sentry.init({
    dsn: 'https://86a7a4948882456d86293f5068bdc427@sentry.io/5179072',
    enableInExpoDevelopment: true,
    debug: true
});

EStyleSheet.build({
    $rem: Platform.OS === 'ios' ? 16 : 14
});

androidWarningFix();

try {
    firebase.initializeApp(firebaseConfig);
}
catch (e) {
}

const Container = styled(View)`
  flex: 1;
  background-color: #fff;
`;

export default function App(props) {
    const [isStartupLoadingComplete, setStartupLoadingComplete] = useState(false);
    const [mainCalendarRefresh, setMainCalendarRefresh] = useState(null);
    const [currentEditedEventId, setCurrentEditedEventId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const {Provider} = appContext;

    if (!isStartupLoadingComplete && !props.skipLoadingScreen) {
        return (
            <AppLoading
                startAsync={async () => loadResourcesAsync()}
                onError={handleLoadingError}
                onFinish={() => setStartupLoadingComplete(true)}
            />
        );
    }
    else {
        return (
            <ErrorBoundary>
                <Container>
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
                </Container>
            </ErrorBoundary>
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
