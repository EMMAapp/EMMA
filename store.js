import * as firebase from "firebase";
import '@firebase/firestore';
import {logError, logInfo, logWarn} from "./utils/log";
import localization from "./utils/localization";

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

export async function registerPatient(email, password) {
    if (store.patientId) {
        store.patientId = null;
    }
    try {
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        store.patientId = userCredential.user.uid;
        await syncPatientData({...initialPatientData});
        return {success: true, error: null};
    }
    catch (e) {
        let errorMessage = localization('error.generic');
        // https://firebase.google.com/docs/reference/js/firebase.auth.Auth.html#createuserwithemailandpassword
        switch (e.code) {
            case "auth/email-already-in-use":
            case "auth/invalid-email":
                errorMessage = localization('error.mail-in-use');
                break;
            case "auth/weak-password":
                errorMessage = localization('error.weak-password');
                break;
            default:
                logWarn(e.message);
        }
        return {success: false, error: errorMessage};
    }
}

export async function loginPatient(email, password) {
    if (store.patientId) {
        store.patientId = null;
    }
    try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        store.patientId = userCredential.user.uid;
        await retrievePatientData();
        return {success: true, errorMessage: null};
    }
    catch (e) {
        let errorMessage = localization('error.generic');
        // https://firebase.google.com/docs/reference/js/firebase.auth.Auth.html#sign-inwith-email-and-password
        switch (e.code) {
            case "auth/invalid-email":
            case "auth/user-disabled":
            case "auth/user-not-found":
            case "auth/wrong-password":
                errorMessage = localization('error.login-generic');
                break;
            default:
                logWarn(e.message);
        }
        return {success: false, errorMessage: errorMessage};
    }
}

export async function logoutPatient() {
    await firebase.auth().signOut();
    store.patientId = null;
    store.patientData = null;
}
