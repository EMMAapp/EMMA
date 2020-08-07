import * as firebase from "firebase";
import '@firebase/firestore';
import {logError, logInfo} from "./utils/log";
import * as Facebook from "expo-facebook";
import * as GoogleSignIn from 'expo-google-sign-in';
import {setNewNotifications, unsetAllNotifications} from "./utils/notificationsSync";
import _ from "lodash";
import * as moment from "moment";
import * as Localization from 'expo-localization';
import {decode, encode} from 'base-64'
import firebaseConfig from "./firebaseConfig";
import {getItem, setItem} from './utils/storage';

if (!global.btoa) {
    global.btoa = encode
}
if (!global.atob) {
    global.atob = decode
}

try {
    firebase.initializeApp(firebaseConfig);
}
catch (e) {
    if (!_.includes(e.message, "already exists")) {
        logError("initialize store", e);
    }
}

const auth = firebase.auth();
const firestore = firebase.firestore();

const initialPatientData = {
    month: null,
    year: null,
    isPeriodRegular: false,
    periods: [],
    averagePeriodCycleDays: 28,
    events: {},
    weekStartDay: moment.localeData(Localization.locale).firstDayOfWeek() || 2,
    revision: 0
};

export const store = {
    patientId: null,
    patientData: null,
    noData: () => !store.patientId || !store.patientData || _.isEmpty(store.patientData.periods)
};
export default store;

export async function retrievePatient() {
    await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    try {
        await new Promise((resolve => {
            try {
                auth.onAuthStateChanged(patient => {
                    store.patientId = patient?.uid;
                    resolve();
                })
            }
            catch (e) {
                logError("onAuthStateChanged", e)
            }
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
    catch (e) {
        logError("retrievePatient", e)
    }
}

const patientDoc = () => firestore.collection('patients').doc(store.patientId);

export async function retrievePatientData() {
    let patientData = await getItem(store.patientId);
    let remotePatientData = null;
    try {
        if (!store.patientId) {
            return;
        }
        const doc = await patientDoc().get();
        remotePatientData = doc.exists ? doc.data() : null;
    }
    catch (e) {
        if (!_.includes(e.message, "the client is offline")) {
            logError("get patientDoc", e.message);
        }
        else {
            logInfo(e.message)
        }
    }

    if (!patientData) {
        patientData = remotePatientData;
    }
    else if (remotePatientData) {
        const localRevision = patientData.revision || 0;
        const remoteRevision = remotePatientData.revision || 0;
        if (localRevision || remoteRevision) {
            await patientDoc().set(patientData);
        }
        else if (localRevision < remoteRevision) {
            patientData = remotePatientData;
            await setItem(store.patientId, patientData);
        }
    }

    if (!patientData) {
        patientData = {...initialPatientData};
    }
    store.patientData = patientData;
    return patientData;
}

export async function syncPatientData(updatedPatientData) {
    try {
        store.patientData = {...updatedPatientData, revision: store.patientData.revision + 1};
        await setItem(store.patientId, store.patientData);
        await patientDoc().set(store.patientData);
    }
    catch (e) {
        if (!_.includes(e.message, "the client is offline")) {
            logError("syncPatientData", e.message);
        }
        else {
            logInfo(e.message)
        }
    }
}

async function logInWithCredential(credential) {
    const userCredential = await auth.signInWithCredential(credential);
    store.patientId = userCredential.user.uid;
    store.patientId = userCredential.user.uid;
    await retrievePatientData();
    _.forOwn(store.patientData.events, async (event, eventId) => {
        await setNewNotifications(event);
    });
}

export async function logInWithFacebook() {
    try {
        const appId = '807419566367785';
        const permissions = ['public_profile', 'email'];
        await Facebook.initializeAsync(appId);

        const {type, token} = await Facebook.logInWithReadPermissionsAsync({permissions});
        if (type !== 'success') {
            return false;
        }

        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        await logInWithCredential(credential);
        return true;
    }
    catch (e) {
        logError("logInWithFacebook", e.message);
        return false;
    }
}

export async function logInWithGoogle() {
    try {
        await GoogleSignIn.initAsync({
            clientId: '1091629470495-bojd6ud8nfu85ku7b0vkng1uam23isl1.apps.googleusercontent.com'
        });
        await GoogleSignIn.askForPlayServicesAsync();
        const {type, user} = await GoogleSignIn.signInAsync();
        if (type !== 'success') {
            return false;
        }

        const credential = firebase.auth.GoogleAuthProvider.credential(user.auth.idToken, user.auth.accessToken);
        await logInWithCredential(credential);
        return true;
    }
    catch (e) {
        logError("logInWithGoogle", e.message);
        return e.message;
    }
}

export async function loginWithEmail({email, password}) {
    try {
        const credential = firebase.auth.EmailAuthProvider.credential(email, password);
        await logInWithCredential(credential);
        return true;
    }
    catch (e) {
        logError("loginWithEmail", e.message);
        return e.message;
    }
}

export async function logoutPatient() {
    _.forOwn(store.patientData.events, async (event, eventId) => {
        await unsetAllNotifications(event);
    });
    await auth.signOut();
    store.patientId = null;
    store.patientData = null;
}

export async function purgePatient() {
    await patientDoc().delete();
    await logoutPatient();
}

export function calendarFirstDay() {
    return store.patientData ? store.patientData.weekStartDay - 1 : 1;
}
