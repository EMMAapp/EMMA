import * as firebase from "firebase";
import '@firebase/firestore';
import {logError, logInfo, logWarn} from "./utils/log";
import * as Facebook from "expo-facebook";
import * as GoogleSignIn from 'expo-google-sign-in';
import {setNewNotifications, unsetAllNotifications} from "./utils/notificationsSync";

const initialPatientData = {
    age: null,
    isPeriodRegular: false,
    periods: [],
    averagePeriodCycleDays: 28,
    plan: null,
    events: {}
};

export const store = {
    patientId: null,
    patientData: null
};
export default store;

export async function retrievePatient() {
    await new Promise((resolve => {
        firebase.auth().onAuthStateChanged(patient => {
            store.patientId = patient?.uid;
            resolve();
        })
    }));
    const isAuthenticated = !!store.patientId;
    if (isAuthenticated) {
        await retrievePatientData();
    }
    else {
        store.patientData = {...initialPatientData};
    }
    return isAuthenticated;
}

export async function retrievePatientData() {
    try {
        if (!store.patientId) {
            return;
        }
        const doc = await firebase.firestore().collection('patients').doc(store.patientId).get();
        if (doc.exists) {
            store.patientData = doc.data();
        }
        else {
            store.patientData = {...initialPatientData};
        }
        logInfo("Patient data:");
        logInfo(store.patientData);
        return store.patientData;
    }
    catch (e) {
        logWarn(e.message);
        return null;
    }
}

export async function syncPatientData(updatedPatientData) {
    try {
        store.patientData = updatedPatientData;
        await firebase.firestore().collection('patients').doc(store.patientId).set(store.patientData);
    }
    catch (e) {
        logError(e.message);
    }
}

async function logInWithCredential(credential) {
    const userCredential = await firebase.auth().signInWithCredential(credential);
    store.patientId = userCredential.user.uid;
    store.patientId = userCredential.user.uid;
    await retrievePatientData();
    for (const event of store.patientData.events) {
        await setNewNotifications(event);
    }
}

export async function logInWithFacebook() {
    try {
        const appId = '807419566367785';
        const permissions = ['public_profile', 'email'];
        await Facebook.initializeAsync(appId);

        const {type, token} = await Facebook.logInWithReadPermissionsAsync(appId, {permissions});
        if (type !== 'success') {
            return false;
        }

        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        await logInWithCredential(credential);
        return true;
    }
    catch (e) {
        logError(e.message);
        return false;
    }
}

export async function logInWithGoogle() {
    try {
        await GoogleSignIn.initAsync({
           clientId: '1091629470495-bojd6ud8nfu85ku7b0vkng1uam23isl1.apps.googleusercontent.com'
        });
        await GoogleSignIn.askForPlayServicesAsync();
        const { type, user } = await GoogleSignIn.signInAsync();
        if (type !== 'success') {
            return false;
        }

        const credential = firebase.auth.GoogleAuthProvider.credential(user.auth.idToken, user.auth.accessToken);
        await logInWithCredential(credential);
        return true;
    }
    catch (e) {
        alert(e.message);
        logError(e.message);
        return e.message;
    }
}

export async function logoutPatient() {
    for (const event of store.patientData.events) {
        await unsetAllNotifications(event);
    }
    await firebase.auth().signOut();
    store.patientId = null;
    store.patientData = null;
}
