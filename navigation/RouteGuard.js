import store from "../store";
import {MAIN, ONBOARDING, REGISTER} from "./Routes";

export default function RouteGuard(navigation) {
    if (!store.patientId) {
        navigation.navigate(REGISTER);
        return;
    }
    if (!store.patientData.age) {
        navigation.navigate(ONBOARDING);
        return;
    }
    navigation.navigate(MAIN);
}
