import AppLoading from 'expo-app-loading';
import styled from 'styled-components';
import {Asset} from 'expo-asset';
import * as Font from 'expo-font';
import React, {useState} from 'react';
import {Platform, StatusBar, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import EStyleSheet from 'react-native-extended-stylesheet';

import AppNavigator from './navigation/AppNavigator';
import store, {retrievePatient} from './store';
import {logError, logInfo} from "./utils/log";
import LoadingModal from "./components/LoadingModal";
import androidWarningFix from './utils/androidWarningFix';
import appContext from "./utils/context";
import * as Sentry from 'sentry-expo';
import {ErrorBoundary} from "./utils/ErrorBoundary";
import {initializeLocalization} from "./utils/localization";

Sentry.init({
    dsn: 'https://86a7a4948882456d86293f5068bdc427@sentry.io/5179072',
    enableInExpoDevelopment: true,
    debug: true
});

EStyleSheet.build({
    $rem: Platform.OS === 'ios' ? 16 : 14
});

androidWarningFix();

const Container = styled(View)`
  flex: 1;
  background-color: #fff;
`;

const App = (props) => {
    const [isStartupLoadingComplete, setStartupLoadingComplete] = useState(false);
    const [mainCalendarRefresh, setMainCalendarRefresh] = useState(null);
    const [currentEditedEventId, setCurrentEditedEventId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const {Provider} = appContext;

    if (!isStartupLoadingComplete && !props.skipLoadingScreen) {
        logInfo("Loading...")
        return (
            <AppLoading
                startAsync={async () => await loadResourcesAsync()}
                onError={handleLoadingError}
                onFinish={() => setStartupLoadingComplete(true)}
            />
        );
    }
    else {
        logInfo(`Starting up: ${JSON.stringify(store.patientData)}`)
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
            require('./assets/images/motorcycle.png'),
            require('./assets/images/wonder.png'),
            require('./assets/images/confused.jpg'),
            require('./assets/images/welcome.gif'),
            require('./assets/images/followup.png'),
            require('./assets/images/plan.png'),
            require('./assets/images/yoga.png'),
            require('./assets/images/catbook.png'),
            require('./assets/images/confetti.png'),
            require('./assets/images/writing.png'),
            require('./assets/images/logo.png'),
            require('./assets/images/tips.png'),
            require('./assets/images/procedure.png'),
            require('./assets/images/weekswait.png'),
            require('./assets/images/onboarding1.png'),
            require('./assets/images/onboarding2.png'),
            require('./assets/images/onboarding3.png'),
        ]),
        Font.loadAsync({
            ...Ionicons.font,
            'sf-pro-regular': require('./assets/fonts/SF-Pro-Text-Regular.ttf'),
            'sf-pro-bold': require('./assets/fonts/SF-Pro-Text-Bold.ttf'),
        }),
        retrievePatient(),
        initializeLocalization()
    ]);
}

const handleLoadingError = (error) => logError("loading", error);

export default App
