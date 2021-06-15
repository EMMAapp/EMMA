import store from "../store";
import {LOGIN, MAIN, ONBOARDING} from "./Routes";
import _ from "lodash";
import {logInfo} from "../utils/log";

export default function RouteGuard(navigation, current) {

    const navigate = (targetRouteName) => targetRouteName !== current && navigation.navigate(targetRouteName);

    logInfo(`RouteGuard acting when now on '${current}'`)

    if (!store.patientId) {
        logInfo("Navigating to LOGIN");
        navigate(LOGIN);
        return;
    }

    if (_.isEmpty(store.patientData.periods)) {
        logInfo("Navigating to ONBOARDING")
        navigate(ONBOARDING);
        return;
    }

    logInfo("Navigating to MAIN")

    navigate(MAIN);
}
