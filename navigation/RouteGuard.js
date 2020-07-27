import store from "../store";
import {MAIN, ONBOARDING, LOGIN} from "./Routes";
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

    navigation.navigate(MAIN);
}
