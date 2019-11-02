import * as firebase from "firebase";
import '@firebase/firestore';

export const store = {
    isAuthenticated: false,
    patientId: null,
    patientData: null,
    completedOnBoarding: false
};
export default store;

export async function retrievePatient() {
    await new Promise((resolve => {
        firebase.auth().onAuthStateChanged(patient => {
            store.isAuthenticated = !!patient;
            store.patientId = patient?.uid;
            resolve();
        })
    }));
    if (store.isAuthenticated) {
        await retrievePatientData();
    }
    return store.isAuthenticated;
}

export async function retrievePatientData() {
    try {
        if (!store.isAuthenticated || !store.patientId) {
            return;
        }
        const doc = await firebase.firestore().collection('patients').doc(store.patientId).get();
        if (doc.exists) {
            store.patientData = doc.data();
            store.completedOnBoarding = false; // TODO!
        }
        return store.patientData;
    }
    catch (e) {
        console.warn(e.message);
        return null;
    }
}

export async function registerPatient(email, password) {
    if (store.isAuthenticated || store.patientId) {
        store.isAuthenticated = false;
        store.patientId = null;
    }
    try {
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        store.isAuthenticated = true;
        store.patientId = userCredential.user.uid;
        return {success: true, error: null};
    } catch (e) {
        let errorMessage = "Something went wrong";
        // https://firebase.google.com/docs/reference/js/firebase.auth.Auth.html#createuserwithemailandpassword
        switch (e.code) {
            case "auth/email-already-in-use":
            case "auth/invalid-email":
                errorMessage = "Email is invalid or already in use";
                break;
            case "auth/weak-password":
                errorMessage = "Password is too weak";
                break;
            default:
                console.warn(e.message);
        }
        return {success: false, error: errorMessage};
    }
}

export async function loginPatient(email, password) {
    if (store.isAuthenticated || store.patientId) {
        store.isAuthenticated = false;
        store.patientId = null;
    }
    try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        store.isAuthenticated = true;
        store.patientId = userCredential.user.uid;
        await retrievePatientData();
        return {success: true, errorMessage: null};
    } catch (e) {
        let errorMessage = "Something went wrong";
        // https://firebase.google.com/docs/reference/js/firebase.auth.Auth.html#sign-inwith-email-and-password
        switch (e.code) {
            case "auth/invalid-email":
            case "auth/user-disabled":
            case "auth/user-not-found":
            case "auth/wrong-password":
                errorMessage = "Email or password are incorrect";
                break;
            default:
                console.warn(e.message);
        }
        return {success: false, errorMessage: errorMessage};
    }
}

export async function logoutPatient() {
    await firebase.auth().signOut();
    store.isAuthenticated = false;
    store.patientId = null;
    store.completedOnBoarding = false;
    store.patientData = null;
}
