import store from "../store";
import {MAIN, REGISTER} from "./Routes";

export default function RouteGuard(navigation) {
    console.log(store);
    if (!store.isAuthenticated) {
        navigation.navigate(REGISTER);
        return;
    }
    // TODO
    navigation.navigate(MAIN);
}
