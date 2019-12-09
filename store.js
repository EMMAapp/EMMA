import * as firebase from "firebase";
import '@firebase/firestore';
import {logError, logInfo, logWarn} from "./utils/log";
import localization from "./utils/localization";
import * as Facebook from "expo-facebook";

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

export async function logInWithFacebook() {
    try {
        const appId = '807419566367785';
        const permissions = ['public_profile', 'email'];

        const {
            type,
            token,
        } = await Facebook.logInWithReadPermissionsAsync(
            appId,
            {permissions}
        );
        if (type !== 'success') {
            return false;
        }

        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        const userCredential = await firebase.auth().signInWithCredential(credential);
        store.patientId = userCredential.user.uid;
        await syncPatientData({...initialPatientData});
        return true;
    }
    catch (e) {
        logError(e.message);
        return false;
    }
}

export async function logoutPatient() {
    await firebase.auth().signOut();
    store.patientId = null;
    store.patientData = null;
}
