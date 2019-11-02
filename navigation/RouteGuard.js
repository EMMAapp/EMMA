import store from "../store";
import {MAIN, REGISTER} from "./Routes";

export default function RouteGuard(navigation) {
    if (!store.isAuthenticated) {
        navigation.navigate(REGISTER);
        return;
    }
    // TODO
    navigation.navigate(MAIN);
}
