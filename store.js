import {logError, logInfo} from "./utils/log";
import _ from "lodash";
import * as moment from "moment";
import * as Localization from 'expo-localization';
import {decode, encode} from 'base-64'
import {getItem, setItem} from './utils/storage';

if (!global.btoa) {
    global.btoa = encode
}
if (!global.atob) {
    global.atob = decode
}

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
    patientId: "local",
    patientData: null,
    noData: () => !store.patientId || !store.patientData || _.isEmpty(store.patientData.periods)
};
export default store;

export async function retrievePatient() {
    try {
        await retrievePatientData();
    }
    catch (e) {
        logError("retrievePatient", e)
    }
}

export async function retrievePatientData() {
    let patientData = await getItem(store.patientId);

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
    }
    catch (e) {
        logInfo(e.message)
    }
}

export function calendarFirstDay() {
    return store.patientData ? store.patientData.weekStartDay - 1 : 1;
}
