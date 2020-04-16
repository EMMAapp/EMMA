import {Dimensions, Platform} from 'react-native';

const width = Dimensions.get("window").width;

const height = Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT");

export default {
    width,
    height,
    isSmallDevice: width < 375,
};
