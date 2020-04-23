import store from "../store";
import {JOURNEY, ONBOARDING, LOGIN, CALENDAR} from "./Routes";
import _ from "lodash";

export default function RouteGuard(navigation) {
    if (!store.patientId) {
        navigation.navigate(LOGIN);
        return;
    }

    if (_.isEmpty(store.patientData.periods)) {
        navigation.navigate(ONBOARDING);
        return;
    }

    if (_.isEmpty(store.patientData.events)) {
        navigation.navigate(CALENDAR);
        return;
    }

    navigation.navigate(JOURNEY);
}
